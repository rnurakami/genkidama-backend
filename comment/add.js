'use strict';

const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
    
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            kadaiId: event.pathParameters.kadaiId,
        },
        ExpressionAttributeNames: {
            '#comments': 'comments',
        },
        ExpressionAttributeValues: {
            ':newComment': data,
        },
        UpdateExpression: 'SET #comments = list_append(#comments, :newComment)',
    };
    
    dynamodb.update(params, (error, result) => {
        
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the kadai.',
            });
            return;
        }
        
        const response = {
            statusCode: 200,
            body: "add comment successfly.",
        };
        callback(null, response);
    });
};