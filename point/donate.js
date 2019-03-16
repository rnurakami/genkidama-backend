'use strict';

const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.donate = (event, context, callback) => {

    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            kadaiId: data.kadaiId,
        },
        ExpressionAttributeValues: {
            ':donatePoint': data.donatePoint,
        },
        UpdateExpression: 'ADD currentPoint :donatePoint',
        ReturnValues:"UPDATED_NEW",
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
            body: JSON.stringify(result.Attributes)
        };
        callback(null, response);
    });

};
