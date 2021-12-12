const { check } = require('express-validator');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

exports.postClassesValidators = [
    check('schoolID').exists(),
    check('schoolID').custom(async (value, {req, loc, path}) => {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                PK:`school_${req.body.schoolID}`,
                SK: 'meta'
            }
        };  
        let school = await documentClient.get(params).promise()
        console.log(school)
        if(school.Item == null) {
            return Promise.reject("No school with that ID exists");
    }}),
    check('teacherUsername','name').custom(async (value, {req, loc, path}) => {
        const params = {
            TableName: TABLE_NAME,
            IndexName:'GSI1-SK-index',
            KeyConditionExpression: 'GSI1 = :gsi1 and begins_with(SK, :sk)',
            FilterExpression: '#data.#name = :name',
            ExpressionAttributeNames: {
            '#data': 'data',
            '#name': 'name'
            },
            ExpressionAttributeValues: {
            ':gsi1': `user_${req.body.teacherUsername}`, // user_id
            ':sk': 'teacher_',
            ':name': req.body.name //class name
        } 
        };   
        let classes = await documentClient.query(params).promise()
        if(classes.Items.length != 0) {
            return Promise.reject("That name for one of your classes already exists");
    }})
    
]
exports.postMembersValidators = [
    check('role').exists(),
    check('GSI1').exists(),
]
