const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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

const getFileUrls = async (fileKeys) => {
    const urls = await Promise.all(fileKeys.map(async (key) => {
        try {
            const params = {
                Bucket: BUCKET_NAME,
                Key: key
            };
            const command = new GetObjectCommand(params);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            return url;
        } catch (err) {
            console.error(`Error fetching file ${key}:`, err);
            return null;
        }
    }));
    return urls.filter(url => url !== null); // Filter out any null values
};

module.exports = {
    getFileUrls
};
