// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-1'})

// Create the DynamoDB service object

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    AttributeDefinitions: [
        {
            AttributeName: 'classID',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'classID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'UCL-TT-classes',
    StreamSpecification: {
        StreamEnabled: false
    }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
    if (err) {
        console.log("Error: \n", err);
    } else {
        console.log("Table Created", data);
    }
}); 