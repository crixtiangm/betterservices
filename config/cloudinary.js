const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//Setup de cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//Configuracion de Storage

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: 'betterservice',
        allowedFormats:['jpg','png','jpeg']
    }
})

module.exports = multer({storage});