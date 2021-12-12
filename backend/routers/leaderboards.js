const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/testStatisticsValidators');
const {validateAuth} = require('../auth');
const { restart } = require('nodemon');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';


// Get profiles of class for leaderboards
router.get(`/class/:GSI1`, async (req, res) => {

    const params = {
        TableName: TABLE_NAME
    };

    // create an empty object to hold the response
    let responseData;

    // check if URI parameters exists
    if (req.params.GSI1) {
        params.IndexName = 'GSI1-SK-index'
        params.KeyConditionExpression = 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
        params.ExpressionAttributeValues = {
            ':gsi1': req.params.GSI1, //class_id
            ':sk': "profile" 
        }
        
    } else {
        // check if query parameter exists
        if(req.query.GSI1) {
            params.Key = {
                PK: req.query.PK,
            }
            params.KeyConditionExpression = 'PK = :pk',
            params.ExpressionAttributeValues = {
                ':pk': req.params.PK,
            }
        }
    }
    console.log(params)
    // check if the parameter has NOT been passed in
    try {
        responseData = await documentClient.query(params).promise()
        res.status(200).json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 

})
// Get profiles of school for leaderboards
router.get(`/school/:PK`, async (req, res) => {

    const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'SK = :sk AND #data.school = :schoolId',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues : {
            ':sk' : 'profile',
            ':schoolId': req.params.PK
        }
    }

    try {
        profiles = await documentClient.scan(params).promise()
        res.status(200).json(profiles)
    } catch (error) {
        res.status(500).send("Unable to collect profiles: " + error)
    } 

})



//export a module
module.exports=router;