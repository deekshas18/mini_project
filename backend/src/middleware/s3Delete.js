const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
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

const deleteFileFromS3 = async (req, res, next) => {
    const { idey, filename } = req.params;
    const Key = `${idey}/${filename}`; // Assuming the file is stored under a directory named as idey

    const deleteParams = {
        Bucket: BUCKET_NAME,
        Key: Key
    };

    try {
        await s3.send(new DeleteObjectCommand(deleteParams));
        next(); // Continue to the next middleware or controller
    } catch (err) {
        console.error("Error deleting file from S3:", err);
        res.status(500).json({ message: "Error deleting file from S3" });
    }
};

module.exports = deleteFileFromS3;
