const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const uuid = require('uuid');
const config = require('../config/config.js');
const { addOrUpdateItem, deleteItem } = require('../dynamoFunctions.js');
const { validationResult } = require('express-validator');
const validators = require('./validators/usersValidators');
const {validateAuth} = require('../auth');

// return json web token 
const jwt = require('jsonwebtoken');


//hashing password
const bcrypt = require("bcryptjs")

AWS.config.update({
    
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

// create the document client interface for DynamoDB
const documentClient = new AWS.DynamoDB.DocumentClient();

//specify table name to connect to
const TABLE_NAME = 'UCL-TT-USERS-V2';


// async method + await so when you call the userlist from dynamodb, it will wait to be filled before sending the response to the frontend
// get all user profiles within a class
router.get(`/:GSI1`, async (req, res) => {

  const params = {
      TableName: TABLE_NAME,
      IndexName:'GSI1-SK-index',
      KeyConditionExpression: 'GSI1 = :gsi1 and SK =:sk',
      ExpressionAttributeValues: {
          ':gsi1': req.params.GSI1, // potentially change class_id => school_id_class_id
          ':sk': "profile"
      } 

  };
    // create an empty object to hold the response
    let responseData;

    try {
        responseData = await documentClient.query(params).promise()
        res.json(responseData)
    } catch (error) {
        res.status(500).send("Unable to collect record: " + error)
    } 
  // await dynamodb.scan(params).promise()
  // returns object that has items: [user1, user2]
//   const userList = await documentClient.scan(params).promise()
//   if(!userList) {
//       res.status(500).json({sucess: false})
//   }
//   res.send(userList);
})

// pass specific userID in URL and collect specific user profile
router.get(`/individual/:userID`, async (req, res) => {
    const userID = req.params.userID;
  
    const params = {
        Key: {
            "PK": userID,
            "SK": "profile"
        },
        TableName: TABLE_NAME
    };
    // await dynamodb.scan(params).promise()
    // returns object that has items: [user1, user2]
    const user = await documentClient.get(params).promise()
    if(!user) {
        res.status(500).json({sucess: false})
    }
    res.send(user);
  })

// Registering as a new student (and create student-class relationship)
router.post(`/register/student`, [ ...validators.postStudentValidators], async (req, res) => {
    const errors = await validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    } else {
    const schoolParams = {
        TableName: TABLE_NAME,
        Key: {
            "PK": `class_${req.body.GSI1}`,
            "SK": 'meta'
        }
    }
    try { 
        schoolId = await documentClient.get(schoolParams).promise()
    } catch (err) {
        console.error(err);
        res.status(400).send('School not found');
    }
    const params = {
        TableName: TABLE_NAME,
        Item: {
                    PK: `user_${req.body.PK}`, //user_id
                    SK: 'profile', //profile
                    GSI1: `class_${req.body.GSI1}`, //class_id
                    data: {
                        firstName: req.body.data.firstName,
                        lastName: req.body.data.lastName,
                        // hashing user password
                        hashPassword: bcrypt.hashSync(req.body.data.password, 10),
                        role: "student",
                        secret: "studentSecret",
                        avatar: 1,
                        pendingAssignments: 0,
                        experience: 0,
                        streak: 0,
                        maxStreak: 0,
                        score: 0,
                        lastLogin: "",
                        school: schoolId.Item.GSI1
                        },
                    overall: {
                        timestableMastered: 0,
                        testsTaken: 0,
                        timeTaken: 0,
                        questions: 0, 
                        correctQuestions: 0
                    },
                    twox: 0,
                    threex: 0,
                    fourx: 0,
                    fivex: 0,
                    sixx: 0,
                    sevenx: 0,
                    eightx: 0,
                    ninex: 0,
                    tenx: 0,
                    elevenx: 0,
                    twelvex: 0
                }}
    const params2 = {
        TableName: TABLE_NAME,
        Item: {
                    PK: `user_${req.body.PK}`, //user_id
                    SK: 'statistics', //profile
                    GSI1: `class_${req.body.GSI1}`, //class_id
                    data: {
                    twox: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    threex: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    fourx: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {                            
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    fivex: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {                            
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    sixx: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    sevenx: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    eightx: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    ninex: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    tenx: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    elevenx: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    },
                    twelvex: {
                        beginner: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        intermediate: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        },
                        advanced: {
                            pendingAssignments: 0,
                            testsTaken: 0,
                            timeTaken: 0,
                            questions: 0,
                            correctQuestions: 0
                        }
                    }
                    }
                }
                }

      console.log(params)
  try {
    await documentClient.put(params).promise();    
    await documentClient.put(params2).promise();    
    res.status(201).json({
        message: "You have successfully registered as a student. Please now login.",
        success: true
        });
    } catch (err) {
        console.error(err);
        res.status(400).send('User could not be created');
    }
}
})

// Registering as a new teacher
router.post(`/register/teacher`, [ ...validators.postTeacherValidators], async (req, res) => {
    const errors = await validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors.array()
        })
    } else {
    const params = {
        TableName: TABLE_NAME,
        Item: {
        PK: `user_${req.body.PK}`, //user_id
        SK: 'profile', //profile
        GSI1: `school_${req.body.GSI1}`, //school_id,
        data: {
            firstName: req.body.data.firstName,
            lastName: req.body.data.lastName,
            "email": req.body.data.email,
            // hashing user password
            hashPassword: bcrypt.hashSync(req.body.data.password, 10),
            role: "teacher"
        }
    }
    }
  try {
    const user = await documentClient.put(params).promise();    
    console.log(user)
    res.status(201).json({
        message: "You have successfully registered as a teacher. Please now login.",
        success: true
        });
    } catch (err) {
        console.error(err);
        res.status(400).send('User could not be created');
    }}
})

// Registering as a new parent
router.post(`/register/parent`,[ ...validators.postParentValidators], async (req, res) => {
    const errors = await validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        })
    } else {
    const params = {
        TableName: TABLE_NAME,
        Item: {
                    PK: `user_${req.body.PK}`, //user_id
                    SK: 'profile', //profile
                    GSI1: `user_${req.body.GSI1}`, //user_id
                    data: {
                        firstName: req.body.data.firstName,
                        lastName: req.body.data.lastName,
                        // hashing user password
                        hashPassword: bcrypt.hashSync(req.body.data.password, 10),
                        role: "parent",
                        email: req.body.data.email
                        }
                    }
                }
  try {
    const user = await documentClient.put(params).promise();   
    console.log(user) 
    res.status(201).json({
        message: "You have successfully registered as a parent. Please now login.",
        success: true
        });
    } catch (err) {
        console.error(err);
        res.status(400).send('User could not be created');
    }
}}
)

// Update avatar
router.put(`/avatar`, async (req, res) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.PK,
            SK: 'profile',
        },
        // use hash to tell dynamodb that this is a replaceable value, avoid dynamo's reserved keywords
        UpdateExpression: 'set #data.avatar = :avatar',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':avatar': req.body.avatar
        }
    }

    try {
        const avatar = await documentClient.update(params).promise();   
        console.log(avatar) 
        res.status(200).json({
            message: "You have successfully updated your avatar",
            success: true
            });
        } catch (err) {
            console.error(err);
            res.status(400).send('Avatar could not be updated');
        }
  })

// delete user

router.delete('/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
        res.json(await deleteItem(userID, TABLE_NAME));
    } catch (err) {
        console.error(err);
        res.status(500).json({err: 'something went wrong'})
    }
});


// Logging in
router.post('/login', async (req, res) => {
    const params = {
        TableName: TABLE_NAME,
        Key : {
            "PK": `user_${req.body.PK}`,
            "SK": "profile"
        }
        } 
    const secret = process.env.SECRET;
    const password = req.body.password
    const user = await documentClient.get(params).promise()
    if(!user.Item) {
        return res.status(400).json({
            message: 'Username is not found.',
            success: false})
    } else {
        if(user.Item && bcrypt.compareSync(password, user.Item.data.hashPassword)){
            let token = jwt.sign({
                PK: user.Item.PK,
                role: user.Item.data.role,
                GSI1: user.Item.GSI1
            },
            // user authentication token
            secret,
            // token expires in 1 day
            {expiresIn: '7 days'}
            )

            let result = {
                token,
                PK: user.Item.PK,
                role: user.Item.data.role,
                GSI1: user.Item.GSI1,
                expiresIn: 168,
                data: user.Item.data,
                overall: user.Item.overall,
                twox: user.Item.twox,
                threex: user.Item.threex,
                fourx: user.Item.fourx,
                fivex: user.Item.fivex,
                sixx: user.Item.sixx,
                sevenx: user.Item.sevenx,
                eightx: user.Item.eightx,
                ninex: user.Item.ninex,
                tenx: user.Item.tenx,
                elevenx: user.Item.elevenx,
                twelvex: user.Item.twelvex,                
            };
            res.status(200).json({
                ...result,
                message: "You have successfully logged in.",
                success: true})
        }   else {
            return res.status(400).json({
                message: 'Password is incorrect.',
                success: false})
        }
    }
})


// Updating last login
router.put('/lastLogin', async (req, res) => {
    const paramsLastLogin = {
        TableName: TABLE_NAME,
        Key: {
            "PK": req.body.PK,
            "SK": "profile"
        },
        UpdateExpression: 'set #data.lastLogin = :lastLogin',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':lastLogin': req.body.lastLogin
        }
    }
    try {
        lastLogin = await documentClient.update(paramsLastLogin).promise();   
        console.log(lastLogin);
        res.status(200).json({
            message: "You have successfully updated your login",
            success: true
            });
        } catch (err) {
            console.error(err);
            res.status(400).send('Last login could not be updated');
        }
})

// Updating streak
router.put('/streak', async (req, res) => {
    const paramsStreak = {
        TableName: TABLE_NAME,
        Key: {
            "PK": req.body.PK,
            "SK": "profile"
        },
        UpdateExpression: 'set #data.streak = :streak',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':streak': req.body.streak
        }
    }
    try {
        streak = await documentClient.update(paramsStreak).promise();   
        console.log(streak);
        res.status(200).json({
            message: "You have successfully updated your streak",
            success: true
            });
        } catch (err) {
            console.error(err);
            res.status(400).send('streak could not be updated');
        }
})

// get teacher profiles 
router.get(`/parents/:GSI1`, async (req, res) => {
    
    try {

        // get student profile
        params = {
            TableName:TABLE_NAME,
            Key: {
                PK: req.params.GSI1,
                SK: 'profile'
            }
        }
        student = await documentClient.get(params).promise();
        console.log(student)
        
        // get class 
        params2 = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
            ExpressionAttributeValues: {
                ':pk': student.Item.GSI1,
                ':sk': 'teacher_'
            }
        }
        
        classProfile = await documentClient.query(params2).promise();
        console.log(classProfile)
        
        // get teacher profiles
        
        params3 = {
            TableName: TABLE_NAME,
            Key: {
                PK: classProfile.Items[0].GSI1,
                SK: 'profile'
            }
        }
        
        teacherProfile = await documentClient.get(params3).promise();
        
        res.status(200).json({
            message: "You have successfully retrieved teacher profile",
            success: true,
            teacherProfile
            });
        } catch (err) {
            console.error(err);
            res.status(400).send('Error');
        }
  })

//export a module
module.exports=router;

