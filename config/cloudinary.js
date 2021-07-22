const cloudinary = require("cloudinary").v2;

// Requests for type from-data allow us to send files on my request
const multer = require("multer");

// Connect multer-storage with cloudinary
const {CloudinaryStorage} = require("multer-storage-cloudinary");

// Connect cloudinary library to our subscription
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

//Storage Configuration on cloudinary

const storageProfilePic = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"bug-tracker-profilePic",
        allowed_formats: ["png", "jpg", "jpeg"],
    },
    filename: function (req, file, cb) {
        cb (null, file.originalname);
    },
});

const storageBugs = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"bug-tracker-issues",
        allowed_formats: ["png", "jpg", "jpeg"],
    },
    filename: function (req, file, cb) {
        cb (null, file.originalname);
    },
});

const uploadCloud = multer({storage: storageProfilePic, storageBugs});

module.exports = uploadCloud;