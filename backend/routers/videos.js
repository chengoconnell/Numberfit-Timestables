const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

AWS.config.update({
    
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const bucketName = 'ucl-tt-videos'

router.get('/floormat', async (req, res) => {
    const s3 = new AWS.S3();
    try {
        response = await s3.listObjectsV2({
            Bucket: 'ucl-tt-videos',
            Prefix: 'Floor-Mat'

        }).promise();
        console.log(response)
        res.status(200).json({ 
            message: "You have retrieved your videos ", 
            success: true, 
            response
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: 'Videos could not be retrieved',
            success: false});
    }

    
})

router.get('/nofloormat', async (req, res) => {
    const s3 = new AWS.S3();
    try {
        const response = await s3.listObjectsV2({
            Bucket: 'ucl-tt-videos',
            Prefix: 'No-Floor-Mat'
        }).promise();
        console.log(response)
        res.status(200).json({
            message: "You have retrieved your videos ",
            success: true,
            response
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: 'Videos could not be retrieved',
                success: false});
        }

    
})
router.get('/:key', async (req, res) => {
    const s3 = new AWS.S3();

    const downloadParams = {
        Key: `No-Floor-Mat/${req.params.key}`,
        Bucket: bucketName
    }
    try {
        const readStream = await s3.getObject(downloadParams).createReadStream()
        console.log('readStream:')
        console.log(readStream)
        readStream.pipe(res)
        console.log('readStream.pipe(res):')
        console.log(readStream.pipe(res))
        res.status(200).json({
            message: "You have retrieved your videos ",
            success: true,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({
                message: 'Videos could not be retrieved',
                success: false});
        }

    
})

module.exports=router;
