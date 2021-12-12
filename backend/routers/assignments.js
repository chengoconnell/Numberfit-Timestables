const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const { validationResult } = require('express-validator');
const validators = require('./validators/assignmentsValidators');
const {validateAuth} = require('../auth');
const { restart } = require('nodemon');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

// Get all assignments assigned to a student
router.get(`/:PK`, async (req, res) => {

    const params = {
        TableName: TABLE_NAME
    };

    // create an empty object to hold the response
    let responseData;

    // check if URI parameters exists
    if (req.params.PK) {
        params.KeyConditionExpression = 'PK = :pk AND begins_with(SK, :sk)',
        params.ExpressionAttributeValues = {
            ':pk': req.params.PK,
            ':sk': "assignment"
        }
        
    } else {
        // check if query parameter exists
        if(req.query.PK) {
            params.Key = {
                PK: req.query.PK,
            }
            params.KeyConditionExpression = 'PK = :pk AND begins_with(SK, :sk)',
            params.ExpressionAttributeValues = {
                ':pk': req.params.PK,
                ':sk': req.params.SK
            }
        }
    }
    try {
        responseData = await documentClient.query(params).promise()
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
})

// Get all assignments of a class
router.get(`/classAssignments/:GSI1`, async (req, res) => {

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
            ':gsi1': req.params.GSI1, // class_id
            ':sk': "assignment"
        }
        
    } else {
        // check if query parameter exists
        if(req.query.GSI1) {
            params.IndexName = 'GSI1-SK-index'
            params.KeyConditionExpression = 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
            params.ExpressionAttributeValues = {
                ':gsi1': req.params.GSI1,
                ':sk': "assignment"
            }
        }
    }
    console.log(params)
    // check if the parameter has NOT been passed in
    try {
        responseData = await documentClient.query(params).promise()
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
})


// Post an assignment for an individual student
router.post(`/`, 
// [ ...validators.postAssignmentsValidators], 
async (req, res) => {


    const assignmentID = uuid.v4()
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    } else {
    const params = {
        TableName: TABLE_NAME,
        Item: {
        PK: `user_${req.body.PK}`, //user_id
        SK: `assignment_${assignmentID}`, //assignment_id
        GSI1: `class_${req.body.GSI1}`, //class_id
        data: req.body.data
    }
    }

  try {
    const assignment = await documentClient.put(params).promise();    
    res.status(201).send(assignment);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
}
})


router.post(`/postClass/`, 
// [ ...validators.postAssignmentsValidators], 
async (req, res) => {
    const assignmentID = uuid.v4()
    // Get all profiles within a certain class
    const params = {
        TableName: TABLE_NAME,
        IndexName:'GSI1-SK-index',
        KeyConditionExpression: 'GSI1 = :gsi1 and SK =:sk',
        ExpressionAttributeValues: {
            ':gsi1': req.body.GSI1, // class_id
            ':sk': "profile"
        } 
    
    }
    try {
        classProfiles = await documentClient.query(params).promise()
        
    } catch (error) {
        res.status(500).send("Unable to collect class profiles: " + error)
    } 
    
    console.log(classProfiles);

    
    for (i = 0; i < classProfiles.Items.length; i++) {
        try {
        const putParams = {
            TableName: TABLE_NAME,
            Item: {
                "PK": classProfiles.Items[i].PK,
                "SK": `assignment_${assignmentID}`,
                "GSI1": req.body.GSI1,
                "data": {
                "timestable": req.body.data.timestable, 
                "difficulty": req.body.data.difficulty, 
                "due": req.body.data.due,  //iso string
                "status": "uncompleted", 
                "repetitions": req.body.data.repetitions
                }
            }
        }
        await documentClient.put(putParams).promise()
        
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Assignment upload failed",
            success: false
        })
    };
        
    try {
        const updateProfileParams = {
            TableName: TABLE_NAME,
            Key: {
                'PK': classProfiles.Items[i].PK,
                'SK': 'profile',
            },
            UpdateExpression: `ADD #data.pendingAssignments :inc`,
            ExpressionAttributeNames: {'#data': 'data'},
            ExpressionAttributeValues: {
                ':inc': 1
            }
        }
        console.log(updateProfileParams)
        await documentClient.update(updateProfileParams).promise()
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Profile update failed",
            success: false
        })
    }
    
}
res.status(200).json({
    message: "Successful assignment upload",
    success: true
    });
});





//export a module
module.exports = router;