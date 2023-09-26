const Blog = require("../models/blogpost")
const path = require("path")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError} = require("../errors")
const user = require("../models/user")
const fs = require("fs")
const {uploader} = require("../utils")


const postBlog = async(req, res)=>{
    const {title, category, description} = req.body
    if(!title || !category || !description){
        throw new BadRequestError("fill in the fields correctly")
    }
    if(!req.files.coverImage){
        throw new BadRequestError("No cover image uploaded")
    }
    if(!req.files.images || req.files.images>5){
        throw new BadRequestError("images field required and shouldn't be more than 5")
    }
    

    const coverImageFile = req.files.coverImage[0]
    const coverImageResult = await uploader(coverImageFile.path, "blog_post/coverImages")
    const coverImage = coverImageResult.secure_url
    fs.unlinkSync(coverImageFile.path);
    

    const images = [];
    const image_get = req.files.images
    for(const img of image_get){ 
        const imageResult = await uploader(img.path, "blog_post/images")
        images.push(imageResult.secure_url)
        fs.unlinkSync(img.path);
    }
    const blog = await Blog.create({title, category, description, coverImage: coverImage, images: images, postedBy:req.user.userId})
  
    res.status(StatusCodes.CREATED).json({blog})    
}

const getAllPosts = async(req, res)=>{
    const {search, category }  = req.query
    const queryObject = {};
    if(search){
        queryObject.title = {$regex:search, $options:'i'}
    } 
    if(category){
        queryObject.category = category
    } 
    let result =  Blog.find(queryObject)

    result = result.sort("-createdAt")
    const page = Number(req.query.page) || 1;
    const  limit = Number(req.query.limit) || 15;
    const skip = (page - 1)*limit;

    result = result.skip(skip).limit(limit)

    const blog = await result;
    res.status(StatusCodes.OK).json({blog, count:blog.length})
}

const get_aPost = async(req, res)=>{
    const {params:{id:blogId}} = req
    const blog = await Blog.findOne({_id:blogId})
    if(!blog){
        throw new notFound(`no post found with id: ${blogId}`)
    }
    res.status(StatusCodes.OK).json({blog, nbHit: blog.length})
}

const getPostbyUser = async(req, res)=>{
    const {params:{id:userId}} = req
    const blog = await Blog.findOne({postedBy: userId})
    if(!blog){
        throw new notFound(`no post found by user with id: ${userId}`)
    }
    res.status(StatusCodes.OK).json({blog, nbHit: blog.length})
}



const updatePost = async(req, res)=>{
    const {
        body: {title, category, description},
        params:{id: blogId},
    } = req

    if(!title || !category || !description){
        throw new BadRequestError("Pleae fill in the fields")
    }

    const blog = await  Blog.findByIdAndUpdate({_id: blogId}, req.body, {new:true,runValidators:true})

    if(!blog){
        throw new notFound(`no result  wit id:  ${blogId}`)
    }
    res.status(StatusCodes.OK).json({blog})

}

const deletePost = async(req, res)=>{
    const {
        user:{userId},
        params:{id:blogId}
    }= req
    
    const blog = await Blog.findByIdAndRemove({_id:blogId})
    // const blog = await Blog.deleteMany({})
    
    if(!blog){
        throw new notFound(`no records with id: ${blogId}`)
    }
    res.status(StatusCodes.OK).send()
}


module.exports = {
getAllPosts,
get_aPost,
getPostbyUser,
postBlog,
updatePost,
deletePost
}


// const postPost = async(req, res)=>{
//     // console.log(req.user.userID)
//     const coverImage = [];
//     const result = await cloudinary.uploader.upload(req.files.coverImage.tempFilePath,{
//         use_filename:true,
//         folder: "blog_post"
//     })
//     coverImage.push(result.secure_url)
//     fs.unlinkSync(req.files.coverImage.tempFilePath);
//     const coverImage1 = coverImage
    

//     const images = [];
//     const image_get = req.files.images
//    for(const img of image_get){
//         const result2 = await cloudinary.uploader.upload(img.tempFilePath,{
//         use_filename:true,
//         folder: "blog_post"
//     })

//     images.push(result2.secure_url)
//     fs.unlinkSync(img.tempFilePath);
//    }
   
//    console.log(images)
//     const images1 = images
//     console.log(images1)
//     // res.status(StatusCodes.OK).json({image:{src:`${result.secure_url}`}})
//     req.body.postedBy = req.user.userID
//     const blog = await Blog.create({...req.body, coverImage: coverImage1, images: images1})
    
    
//     // user.coverImage = coverImage1
//     // user.images = images1
//     res.status(StatusCodes.CREATED).json({blog})
// }
   