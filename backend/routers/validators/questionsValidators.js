const { check } = require('express-validator');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-questions';

exports.postQuestionsValidators = [
    
        // express-validator
        check('timestable').isNumeric(),
    
]
