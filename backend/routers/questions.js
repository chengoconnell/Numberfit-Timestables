const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { validationResult } = require('express-validator');
const validators = require('./validators/questionsValidators');
const {validateAuth} = require('../auth');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-questions';


router.get(`/:timestable?`, async (req, res) => {
    
    const params = {
        TableName: TABLE_NAME,
    }
    
    // create an empty object to hold the response
    let responseData;

    // check if URI parameters exists
    if (req.params.timestable) {
        params.Key = {
            timestable: req.params.timestable,
        }
        params.KeyConditionExpression = 'timestable = :timestable',
        params.ExpressionAttributeValues = {
            ':timestable': parseInt(req.params.timestable, 10)
        }
        
    } else {
        // check if query parameter exists
        if(req.query.timestable) {
            params.Key = {
                timestable: req.query.timestable,
            }
            params.KeyConditionExpression = 'timestable = :timestable',
            params.ExpressionAttributeValues = {
                ':timestable': parseInt(req.query.timestable, 10)
            }
        }
    }
    // check if the query parameter has NOT been passed in
    try {
        if (!params.Key) {
            responseData = await documentClient.scan(params).promise()
        } else {
            responseData = await documentClient.query(params).promise()
        }
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    }   
})

router.post('/', [ ...validators.postQuestionsValidators], async (req, res) => {

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
            // HTTP status code: 'Created' maps to 201, 'OK' maps to 200 
            res.status(201).send();
        } else {
            res.status(500).send("Unable to save record: " + error)
        }
    })
})


// const TABLE_NAME = 'UCL-TT-questions';

// AWS.config.update({
//     region: process.env.AWS_DEFAULT_REGION,
// })

// router.get(`/`, async (req, res) => {
//   const documentClient = new AWS.DynamoDB.DocumentClient();


//   const params = {
//       TableName: TABLE_NAME
//   };

//   const questionsList = await documentClient.scan(params).promise()
//   if(!questionsList) {
//       res.status(500).json({sucess: false})
//   }
//   res.send(questionsList);
// })

// router.get(`/:questionID`, async (req, res) => {
//     const questionID = req.params.questionID;
//     const documentClient = new AWS.DynamoDB.DocumentClient();
  
//     const params = {
//         Key: {
//             "questionID": questionID,
//         },
//         TableName: TABLE_NAME
//     };
//     const question = await documentClient.get(params).promise()
//     if(!question) {
//         res.status(500).json({sucess: false})
//     }
//     res.send(question);
//   })

// router.post(`/`, (req, res) => {

//   const documentClient = new AWS.DynamoDB.DocumentClient();

//   const params = {
//       TableName: TABLE_NAME,
//       Item: {
//           questionID: req.body.questionID,
//           timestable: req.body.timestable,
//           difficulty: req.body.difficulty,
//           questionString: req.body.questionString,
//           questionAnswer: req.body.questionAnswer
//       }
//   }

//   documentClient.put(params, (err, data) => {
//       if(err) console.log(err);
//       console.log('[response]', data)
//   }).promise();
// })

//export a module
module.exports=router;