const { check } = require('express-validator');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

exports.postSchoolsValidators = [
    check('schoolID').exists(),
    check('secretKey').exists(),
    check('schoolID').custom(async (value, {req, loc, path}) => {
        console.log(value)
        console.log(req)
        const params = {
            TableName: TABLE_NAME,
            Key: {
                PK:`school_${req.body.schoolID}`,
                SK: 'meta'
            }
        };  
        let school = await documentClient.get(params).promise()
        console.log(school)
        if(school.Item != null) {
            return Promise.reject("That school ID already exists");
    }})
    
]

