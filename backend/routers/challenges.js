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

// User creates a challenge
router.post('/', async (req, res) => {
    const challengeId = uuid.v4()
    const date = new Date()
    const challengeParams = {

        TableName: TABLE_NAME,
        Item : {
            PK: req.body.PK, // user_id
            SK: `challenge_${challengeId}`,
            GSI1: req.body.GSI1, // user_id2
            data: {
                player1Score: 0,
                player2Score: 0,
                winner: "",
                state: "pending",
                datePosted: date.toISOString(),
                dateFinished: ""
            }
        }
    }

    try {
        await documentClient.put(challengeParams).promise()
        res.status(200).json({
            message: "Successful challenge",
            success: true,
            challengeID:  `challenge_${challengeId}`
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Challenge failed",
            success: false
        })
    }
})

// Get all pending challenges within the last month
router.get('/pending/:PK', async (req, res) => {
    const date = new Date()
    makeDate = new Date(date.setMonth(date.getMonth() - 1));
    console.log(makeDate.toISOString())
    const yourChallengeParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        FilterExpression: '#data.#state = :state AND #data.datePosted  > :lastmonth',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#state': 'state'
        },
        ExpressionAttributeValues: {
            ':pk': req.params.PK,
            ':sk': 'challenge',
            ':state': 'pending',
            ':lastmonth': makeDate.toISOString()
        }
        }
    const theirChallengeParams = {
        TableName: TABLE_NAME,
        IndexName: 'GSI1-SK-index',
        KeyConditionExpression: 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
        FilterExpression: '#data.#state = :state AND #data.datePosted  > :lastmonth',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#state': 'state'
        },
        ExpressionAttributeValues: {
            ':gsi1': req.params.PK,
            ':sk': 'challenge',
            ':state': 'pending',
            ':lastmonth': makeDate.toISOString()
        }
        }

    try {
        let allChallenges = []
        const yourChallenges = await documentClient.query(yourChallengeParams).promise()
        const theirChallenges = await documentClient.query(theirChallengeParams).promise()

        if ((yourChallenges.Items.length + theirChallenges.Items.length) == 0) {
            res.status(200).json({
                message: "You have no challenges",
                success: true,
                });
        } else {

        for (i = 0; i < yourChallenges.Items.length; i++) {
            allChallenges.push(yourChallenges.Items[i])
        }
        for (i = 0; i < theirChallenges.Items.length; i++) {
            allChallenges.push(theirChallenges.Items[i])
        }
        res.status(200).json({
            message: "Successful challenge query",
            success: true,
            allChallenges
            // yourChallenges,
            // theirChallenges
            });}
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Challenge query failed",
            success: false
        })
    }
})

// User rejects a challenge he received
router.delete('/', async (req, res) => {
    const deleteParams = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.PK,
            SK: req.body.SK
        },
    };

    try {
        await documentClient.delete(deleteParams).promise()
        res.status(200).json({
            message: "Successful rejection",
            success: true
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Rejection failed",
            success: false
        })
    }

})

// User finishes a challenge he initiated
router.put('/challengerUpdate', async (req, res) => {
    const challengeId = uuid.v4()
    date = new Date().toISOString()

    const getChallengeParams = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.PK,
            SK: req.body.SK
        }
    }

    try {
        challengeObject = await documentClient.get(getChallengeParams).promise()
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Get request failed",
            success: false
        })
    }

    challenge = challengeObject.Item


    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            PK: req.body.PK,
            SK: req.body.SK
        },
        UpdateExpression: 'SET #data.player1Score = :score',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':score': req.body.score
        }

    }
    // if opponent has not completed a test, ignore state updates (stays pending)
    if (challenge.data.player2Score == 0) {
        
    }
    // if challenger gets a better score, challenger is winner
    else if (req.body.score > challenge.data.player2Score) {
        updateParams.UpdateExpression = 'SET #data.player1Score = :score, #data.#state = :state, #data.winner = :winner, #data.dateFinished = :date',
        updateParams.ExpressionAttributeNames = {
            '#data': 'data',
            '#state': 'state'
        },
        updateParams.ExpressionAttributeValues = {
            ':score': req.body.score,
            ':state': "completed",
            ':winner': req.body.PK,
            ':date': date
        }
    // if scores are even, results in a draw 
    } else if (req.body.score == challenge.data.player2Score) {
        updateParams.UpdateExpression = 'SET #data.player1Score = :score, #data.#state = :state, #data.winner = :winner, #data.dateFinished = :date',
        updateParams.ExpressionAttributeNames = {
            '#data': 'data',
            '#state': 'state'
        },
        updateParams.ExpressionAttributeValues = {
            ':score': req.body.score,
            ':state': "completed",
            ':winner': "draw",
            ':date': date
        }
    // if challenger gets lower score, opponent is the winner
    } else {
        updateParams.UpdateExpression = 'SET #data.player1Score = :score, #data.#state = :state, #data.winner = :winner, #data.dateFinished = :date',
        updateParams.ExpressionAttributeNames = {
            '#data': 'data',
            '#state': 'state'
        },
        updateParams.ExpressionAttributeValues = {
            ':score': req.body.score,
            ':state': "completed",
            ':winner': challenge.GSI1,
            ':date': date
        }
    }

 
    try {
        await documentClient.update(updateParams).promise()
        res.status(200).json({
            message: "Successful update",
            success: true
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Update failed",
            success: false
        })
    }
})
// User finishes a challenge he received
router.put('/challengeReceiverUpdate', async (req, res) => {
    const date = new Date().toISOString()

    const getChallengeParams = {
        TableName: TABLE_NAME,
        IndexName: 'GSI1-SK-index',
        KeyConditionExpression: 'GSI1 = :gsi1 AND SK = :sk',
        ExpressionAttributeValues: {
            ':gsi1': req.body.PK,
            ':sk': req.body.SK
        }
    }

    try {
        challengeObject = await documentClient.query(getChallengeParams).promise()
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Get request failed",
            success: false
        })
    }

    challenge = challengeObject.Items[0]

    const updateParams = {
        TableName: TABLE_NAME,
        Key: {
            PK: challenge.PK,
            SK: req.body.SK
        },
        UpdateExpression: 'SET #data.player2Score = :score',
        ExpressionAttributeNames: {
            '#data': 'data'
        },
        ExpressionAttributeValues: {
            ':score': req.body.score
        }

    }
    console.log(updateParams)
    // if challenger has not completed a test, ignore state updates (stays pending)
    if (challenge.data.player1Score == 0) {
    }
    // if challenge receiver gets a better score, challenger receiver is winner
    else if (req.body.score > challenge.data.player1Score) {
        updateParams.UpdateExpression = 'SET #data.player2Score = :score, #data.#state = :state, #data.winner = :winner, #data.dateFinished = :date',
        updateParams.ExpressionAttributeNames = {
            '#data': 'data',
            '#state': 'state'
        },
        updateParams.ExpressionAttributeValues = {
            ':score': req.body.score,
            ':state': "completed",
            ':winner': challenge.GSI1,
            ':date': date
        }
    // if scores are even, results in a draw 
    } else if (req.body.score == challenge.data.player1Score) {
        updateParams.UpdateExpression = 'SET #data.player2Score = :score, #data.#state = :state, #data.winner = :winner, #data.dateFinished = :date' ,
        updateParams.ExpressionAttributeNames = {
            '#data': 'data',
            '#state': 'state'
        },
        updateParams.ExpressionAttributeValues = {
            ':score': req.body.score,
            ':state': "completed",
            ':winner': "draw",
            ':date': date

        }
    // if challenger receiver gets lower score, challenger is the winner
    } else {
        updateParams.UpdateExpression = 'SET #data.player2Score = :score, #data.#state = :state, #data.winner = :winner, #data.dateFinished = :date',
        updateParams.ExpressionAttributeNames = {
            '#data': 'data',
            '#state': 'state'
        },
        updateParams.ExpressionAttributeValues = {
            ':score': req.body.score,
            ':state': "completed",
            ':winner': challenge.PK,
            ':date': date
        }
    }

 
    try {
        await documentClient.update(updateParams).promise()
        res.status(200).json({
            message: "Successful update",
            success: true
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Update failed",
            success: false
        })
    }
})

// Get all completed challenges within the last month
router.get('/completed/:PK', async (req, res) => {
    const date = new Date()
    makeDate = new Date(date.setMonth(date.getMonth() - 1));
    console.log(makeDate.toISOString())
    const yourChallengeParams = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        FilterExpression: '#data.#state = :state AND #data.datePosted  > :lastmonth',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#state': 'state'
        },
        ExpressionAttributeValues: {
            ':pk': req.params.PK,
            ':sk': 'challenge',
            ':state': 'completed',
            ':lastmonth': makeDate.toISOString()
        }
        }
    const theirChallengeParams = {
        TableName: TABLE_NAME,
        IndexName: 'GSI1-SK-index',
        KeyConditionExpression: 'GSI1 = :gsi1 AND begins_with(SK, :sk)',
        FilterExpression: '#data.#state = :state AND #data.datePosted  > :lastmonth',
        ExpressionAttributeNames: {
            '#data': 'data',
            '#state': 'state'
        },
        ExpressionAttributeValues: {
            ':gsi1': req.params.PK,
            ':sk': 'challenge',
            ':state': 'completed',
            ':lastmonth': makeDate.toISOString()
        }
        }

    try {
        let allChallenges = []
        const yourChallenges = await documentClient.query(yourChallengeParams).promise()
        const theirChallenges = await documentClient.query(theirChallengeParams).promise()
        if ((yourChallenges.Items.length + theirChallenges.Items.length) == 0) {
            res.status(200).json({
                message: "You have no challenges",
                success: true,
                });
        } else {

        for (i = 0; i < yourChallenges.Items.length; i++) {
            allChallenges.push(yourChallenges.Items[i])
        }
        for (i = 0; i < theirChallenges.Items.length; i++) {
            allChallenges.push(theirChallenges.Items[i])
        }
        res.status(200).json({
            message: "Successful challenge query",
            success: true,
            allChallenges
            // yourChallenges,
            // theirChallenges
            });}
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Challenge query failed",
            success: false
        })
    }
})

module.exports = router;