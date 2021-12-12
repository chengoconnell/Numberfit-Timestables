// getting all the code from AWS
const AWS = require('aws-sdk');
const uuid = require('uuid');
// mongoose equivalent (optional)
const dynamoose = require('dynamoose');
require('dotenv').config;


AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})

const documentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'UCL-TT-USERS-V2';

const getUsers = function (req, res) {

    // telling us the configuration. When your app is hosted, you add your secret keys
    // dynamoose.aws.sdk.config.update(
    //     config.aws_remote_config
    // );

    AWS.config.update({region: 'us-east-2'});
    // AWS.config.update(config.aws_remote_config);

    // getting an object from AWS 
    // create the document client interface for DynamoDB
    const documentClient = new AWS.DynamoDB.DocumentClient();

    // creating an object - connected to our managment console - looking for tablename to connect to
    const params = {
        TableName: 'TT_Users'
    }

    documentClient.scan(params, function (err, data) {
                if(err) console.log(err);
               console.log('[response]', data)
             })
    }

const addUser = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const documentClient = new AWS.DynamoDB.DocumentClient();
    // Item.id = uuidv1();
    // var params = {
    //     TableName: config.aws_table_name,
    //     Item: Item

    // };
    const params = {
        TableName: 'TT_Users',
        Item: {
            userID: `USER#${uuid.v4()}`,
            username: 'testuser',
            accountType: 'teacher',
            dateOfBith: '01/01/91',
            firstName: 'Shaun',
            lastName: 'Bentum',
            password: 'test123'
        }
    }

    // call dynamodb to add the item to the table put = insert item
    documentClient.put(params, (err, data) => {
    if(err) console.log(err);
    console.log('[response]', data)
})
}


// getUsers();
// addUser();


const getProfiles = async function (req, res) {
    AWS.config.update({region: 'eu-west-1'});
    
    const documentClient = new AWS.DynamoDB.DocumentClient();
    const TABLE_NAME = 'UCL-TT-USERS-V2';

    const params = {
        TableName: TABLE_NAME
    };

    // create an empty object to hold the response
    let responseData;

    // check if URI parameters exists
    if ('class_2ec278cf-1a35-4746-911b-1a360c83dbb5') {
        params.KeyConditionExpression = 'PK = :PK AND begins_with(SK, :sk)',
        params.ExpressionAttributeValues = {
            ':PK': 'class_2ec278cf-1a35-4746-911b-1a360c83dbb5', //class_id
            ':sk': "meta" 
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


    try {
        // get school_id
        responseData = await documentClient.query(params).promise()
    } catch (error) {
        console.log(error)
    } 

    const params2 = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
        IndexName: 'GSI1-SK-index',
        ExpressionAttributeValues: {
             ':gsi1': '${req.params.PK}', //school_id
             ':sk': "meta" 
    }
    }

    try {
        // get class_id
        classIds = await documentClient.query(params2).promise()
        console.log(classIds)
    } catch (error) {
        console.log(error)
    } 

    let schoolProfiles;
    for (item in classIds.Items) {
        try {
            const params3 = {
                TableName: TABLE_NAME,
                KeyConditionExpression: 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
                IndexName: 'GSI1-SK-index',
                ExpressionAttributeValues: {
                     ':gsi1': item.PK, // class_id
                     ':sk': "profile" 
            }
            }
            classProfiles = await documentClient.query(params3).promise()
            for (profile in classProfiles.Items){
                schoolProfiles += profile
            }
        } catch (error) {
            console.log(error)
        }
        

    };
    console.log(schoolProfiles)


    }

getProfiles();