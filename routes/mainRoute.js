const express = require("express")
const router = express.Router()
const {auth, authorizePermissions} = require("../middleware/auth")
const{postBlog, getAllPosts, get_aPost, updatePost, deletePost} = require("../controller/mainController")
const upload = require("../utils/multer")



router.route("/")
.get(getAllPosts)
.post(auth, authorizePermissions("admin") ,upload.fields([
    {name:"coverImage", maxCount: 1},
    {name:"images", maxCount: 5}
])
, postBlog)


router.route("/:id")
.get(get_aPost)
.patch(auth, authorizePermissions("admin"), updatePost)
.delete(auth, authorizePermissions("admin"), deletePost)



module.exports = router