const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/schoolValidators');
const {validateAuth} = require('../auth');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

router.post(`/`, [ ...validators.postSchoolsValidators], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    }  else {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            PK: `school_${req.body.schoolID}`,
            SK: 'meta',
            data: {
                "secret": req.body.secretKey
            }

        }
    }

    try {
    await documentClient.put(params).promise();  
    res.status(200).json({
        message: "Successful school creation",
        success: true,
        })
    } catch (err) {
        console.error(err);
        res.status(400).send('School could not be created:' + err);
    }}

})
module.exports=router;