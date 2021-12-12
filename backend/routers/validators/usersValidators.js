const { check } = require('express-validator');
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

exports.postStudentValidators = [
    check('PK').notEmpty(),
    check('PK').custom(async value => {
        const params = {
            Key: {
                "PK": `user_${value}`,
                "SK": "profile"
            },
            TableName: TABLE_NAME
        };

        let user = await documentClient.get(params).promise()
        console.log("user:")
        console.log(user)
        if(user.Item != null) {
            return Promise.reject("That username already exists");
    }}),
    check('GSI1').notEmpty(),
    check('classKey').notEmpty(),
    check('GSI1','classKey').custom(async (value, {req, loc, path}) => {
        console.log("VALUUEE:")
        console.log(value)
        console.log("REQQQQQQ:")
        console.log(req.body)
        const params = {
            Key: {
                "PK": `class_${value}`,
                "SK": "meta"
            },
            TableName: TABLE_NAME
        };
        let schoolClass = await documentClient.get(params).promise()
        if(schoolClass.Item == null) {
            return Promise.reject("No class with this id")
        } else if (req.body.classKey != schoolClass.Item.data.secret) {
            return Promise.reject("Incorrect secret key")
        }
        })
]
exports.postTeacherValidators = [
    check('PK').notEmpty(),
    check('PK').custom(async value => {
        const params = {
            Key: {
                "PK": `user_${value}`,
                "SK": "profile"
            },
            TableName: TABLE_NAME
        };

        let user = await documentClient.get(params).promise()
        if(user.Item != null) {
            return Promise.reject("That username already exists");
    }}),
    check('GSI1').notEmpty(),
    check('schoolKey').notEmpty(),
    check('GSI1','schoolKey').custom(async (value, {req, loc, path}) => {
        console.log("VALUUEE:")
        console.log(value)
        console.log("REQQQQQQ:")
        console.log(req.body)
        const params = {
            Key: {
                "PK": `school_${value}`,
                "SK": "meta"
            },
            TableName: TABLE_NAME
        };
        let school = await documentClient.get(params).promise()
        if(school.Item == null) {
            return Promise.reject("No school with this id")
        } else if (req.body.schoolKey != school.Item.data.secret) {
            return Promise.reject("Incorrect secret key")
        }
        })
]
exports.postParentValidators = [
    check('PK').notEmpty(),
    check('PK').custom(async value => {
        const params = {
            Key: {
                "PK": `user_${value}`,
                "SK": "profile"
            },
            TableName: TABLE_NAME
        };

        let user = await documentClient.get(params).promise()
        console.log("user:")
        console.log(user)
        if(user.Item != null) {
            return Promise.reject("That username already exists");
    }}),
    check('GSI1').notEmpty(),
    check('childKey').notEmpty(),
    check('GSI1','childKey').custom(async (value, {req, loc, path}) => {
        console.log("VALUUEE:")
        console.log(value)
        console.log("REQQQQQQ:")
        console.log(req.body)
        const params = {
            Key: {
                "PK": `user_${value}`,
                "SK": "profile"
            },
            TableName: TABLE_NAME
        };
        let child = await documentClient.get(params).promise()
        if(child.Item == null) {
            return Promise.reject("No child with this id")
        } else if (req.body.childKey != child.Item.data.secret) {
            return Promise.reject("Incorrect child key")
        }
        })
]