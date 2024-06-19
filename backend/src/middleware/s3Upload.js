// src/middlewares/uploadToAws.js
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");
require('dotenv').config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY
    },
    region: REGION
});

const uploadWithMulter = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldname: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + path.extname(file.originalname)); // Ensure unique filenames
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/plain') {
            cb(null, true);
        } else {
            cb(new Error('Only .txt files are allowed!'), false);
        }
    }
}).single("file");

const uploadToAws = (req, res, next) => {
    uploadWithMulter(req, res, err => {
        if (err) {
            console.log(err.message);
            return res.status(400).json({ err: err.message, msg: 'Error occurred while uploading' });
        }
        next();
    });
};

module.exports = { uploadToAws };
