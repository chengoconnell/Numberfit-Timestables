const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
//express validator to validate data sent to an api ensuring that its properly validated
const { validationResult } = require('express-validator');
const validators = require('./validators/testsValidators');
const {validateAuth} = require('../auth');

AWS.config.update({
    
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-tests';


router.get(`/:testID?`, async (req, res) => {
    
    const params = {
        TableName: TABLE_NAME
    }
    
    // create an empty object to hold the response
    let responseData;

    // check if URI parameters exists
    if (req.params.testID) {
        params.Key = {
            testID: req.params.testID
        }
    } else {
        // check if query parameter exists
        if(req.query.testID) {
            params.Key = {
                testID: req.query.testID
            }
        }
    }
    // check if the query parameter has NOT been passed in
    if (!params.Key) {
        responseData = await documentClient.scan(params).promise()
    } else {
        responseData = await documentClient.get(params).promise()
    }
    res.json(responseData)
})

router.post('/', [ ...validators.postTestsValidators], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // 400 code equals bad request
        // send back a response with a json
        res.status(400).json({
            errors: errors.array()
        })
    }

    const params = {
        TableName: TABLE_NAME,
        Item: req.body
    }

    documentClient.put(params, (error) => {
        if(!error) {
            // HTTP status code of created is 201, whereas 200 is ok
            res.status(201).send();
        } else {
            res.status(500).send("Unable to save record: " + error)
        }
    })
})

router.put('/:testID', async (req, res) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const test = req.body;
    // not necessary
    const testID = req.params.testID;

    const params = {
        TableName: TABLE_NAME,
        Item: test,
    };
    try {
        updatedTest = await documentClient.put(params).promise(); 
        res.status(200).json({success: true, message: 'the test is updated'})  
      } catch (err) {
            console.error(err);
            res.status(400).json({success: false, error: err});
        } 
})

router.delete(`/:testID`, async (req, res) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();
  
    const testID = req.params.testID;

    const params = {
        TableName: TABLE_NAME,
        Key: {
            testID,
        },
    };
    try {
      test = await documentClient.delete(params).promise();  
      res.status(200).json({success: true, message: 'the test is deleted'})  
    } catch (err) {
          console.error(err);
          res.status(400).json({success: false, error: err});
      }
  })

//export a module
module.exports=router;