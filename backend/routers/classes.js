const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/classesValidators');
const {validateAuth} = require('../auth');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

// Get all meta information about the classes a user (teacher) owns
router.get(`/getClasses/:GSI1`, async (req, res) => {

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
            ':gsi1': req.params.GSI1, //user_id
            ':sk': "teacher_" 
        }
        
    } else {
        // check if query parameter exists
        if(req.query.PK) {
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
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
})

// get all student profiles from a class
router.get(`/getClassProfiles/:GSI1`, async (req, res) => {

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
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
})



router.get(`/`, async (req, res) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();


  const params = {
      TableName: TABLE_NAME
  };

  const classesList = await documentClient.scan(params).promise()
  if(!classesList) {
      res.status(500).json({sucess: false})
  }
  res.send(classesList);
})

router.get(`/:PK`, async (req, res) => {  
    const params = {
        Key: {
            PK: req.params.PK,
            SK: 'meta'
        },
        TableName: TABLE_NAME
    };
    const classItem = await documentClient.get(params).promise()
    if(!classItem) {
        res.status(500).json({sucess: false})
    }
    res.send(classItem);
  })


// Create a class as a teacher (and add teacher-class relationship)
router.post(`/`, [ ...validators.postClassesValidators], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    }  else {
    // possibly needs a query to retrieve school and teacher data?? Otherwise this data will be stored in constant
    const classID = uuid.v4()
    const params = {
        RequestItems: {
          'UCL-TT-USERS-V2': [
            {
              PutRequest: {
                Item: {
                    PK: `class_${classID}`, 
                    SK: 'meta', 
                    GSI1: `school_${req.body.schoolID}`, 
                    data: {
                        name: req.body.name,
                        year: req.body.year,
                        secret: req.body.secretKey
                    }
                }
            },
        }, {
                PutRequest: {
                    Item: {
                        PK: `class_${classID}`, 
                        SK: `teacher_${req.body.teacherUsername}`,
                        GSI1: `user_${req.body.teacherUsername}`, 
                        data: {
                            name: req.body.name,
                            year: req.body.year,
                            secret: req.body.secretKey
                        }  
                    }
                }
              }

        ]
        }
      };

    try {
    await documentClient.batchWrite(params).promise();  
    res.status(200).json({
        message: "Successful class creation",
        success: true,
        })
    } catch (err) {
        console.error(err);
        res.status(400).send('Class could not be created:' + err);
    }}

})

router.post(`/newMember/`, [validateAuth, ...validators.postMembersValidators], async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    }  

    const params = {
        TableName: TABLE_NAME,
        Item: {
        PK: req.body.PK,
        SK: req.body.SK,  
        GSI1: req.body.GSI1,
        role: req.body.role  
    }
    }

  try {
    const schoolClass = await documentClient.put(params).promise();    
    res.status(201).send(schoolClass);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
})

// router.put(`/:classID`, async (req, res) => {
//     const classItem = req.body;
//     const { classID } = req.params;
//     classItem.classID = classID;
//     try {
//         const updatedClass = await addOrUpdateItem(classItem, TABLE_NAME);
//         res.json(updatedClass);
//     } catch (error) {
//         console.error(err);
//         res.status(500).json({err:'something went wrong'});
//     }
//   })

// router.delete('/:classID', async (req, res) => {
//     const { classID } = req.params;
//     try {
//         res.json(await deleteItem(classID, TABLE_NAME));
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({err: 'something went wrong'})
//     }
// });

module.exports=router;