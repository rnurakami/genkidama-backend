'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.get = (event, context, callback) => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            kadaiId: event.pathParameters.id,
        },
    };
    
    dynamodb.get(params, (error, result) => {
        
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the todo item.',
            });
            return;
        }
        
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
        callback(null, response);
    });
};
