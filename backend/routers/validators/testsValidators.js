const { check } = require('express-validator');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-tests';

exports.postTestsValidators = [
    
        // express-validator
        check('timestable').isNumeric(),
        // custom validator accepts an asynchoronous callback function 
        // passes it into an arrow function
        check('testID').custom(async value => {
            const params = {
                TableName: TABLE_NAME
            }
            let tests = await documentClient.scan(params).promise()
            let existingTest = tests.Items.find(test => test.testID === value)
            if(existingTest) {
                return Promise.reject("That test already exists...")
            }
        })
    
]
