'use strict';

const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.add = (event, context, callback) => {

    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    const getUserParams = {
        TableName: process.env.DYNAMODB_TABLE_USER,
        Key: {
            userId: data.userId,
        },
    };

    dynamodb.get(getUserParams, (error, result) => {

        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the user.',
            });
            return;
        }
        
        console.log(result);
        
        var newComment = {
                commnet: data.comment,
                userId: result.Item.userId,
                userName: result.Item.userName,
                picture: result.Item.picture,
                createdAt: new Date().getTime(),
        };

        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                kadaiId: event.pathParameters.kadaiId,
            },
            ExpressionAttributeNames: {
                '#comments': 'comments',
            },
            ExpressionAttributeValues: {
                ':newComment': [ newComment ],
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
                body: JSON.stringify(newComment)
            };
            callback(null, response);
        });
    });
};
