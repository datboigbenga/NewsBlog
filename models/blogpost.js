const mongoose = require("mongoose")

const Postschema = new mongoose.Schema({
    title: {
        type:String,
        required: [true, "must provide content title"],
        trim: true,
        // maxlength: [20, "maximum length must not be more than 20 characters "]
    }, 
    category:{
        type: String,
        enum: ['general', 'business', 'sports','entertainment'],
        default: 'general'
    },
    description:{
        type:String,
        required: [true, "must give discription of content"],
    },
    coverImage:{
        type:String,   
        required: true,
    },
    images:{
        type:Array,   
        required: true,
    },
    postedBy:{
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: [true, 'Please provide user'],
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("posts", Postschema)