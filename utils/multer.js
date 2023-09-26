const multer = require("multer")
const path = require('path');
const customApiError =require("../errors")
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});


const fileFilter = (req, file, cb)=>{
    if(file.fieldname === "coverImage"){
      file.mimetype === "image/jpeg" || file.mimetype === "image/png"?cb(null, true):cb(null, false)
    }
    else if(file.fieldname === "images"){
      file.mimetype === "image/jpeg" || file.mimetype === "image/png"?cb(null, true):cb(null, false)
    }
    else{
      file.mimetype === "image/jpeg" || file.mimetype === "image/png"?cb(null, true):cb(null, false)
    }
}

const upload = multer({
    storage:storage,
    limits:{fileSize: 1024*1024*3, },
    fileFilter:fileFilter
})

module.exports = upload