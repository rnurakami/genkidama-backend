'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.get = async (event, context, callback) => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            kadaiId: event.pathParameters.id,
        },
    };

    try {
        const kadai = await dynamodb.get(params, (error, result) => {}).promise();
        console.log("kadai")
        console.log(kadai)

        var params_usertable = {
            TableName : process.env.DYNAMODB_TABLE_USER,
            Key: {
                userId: kadai.Item.owner,
            }
        };

        const result_user = await dynamodb.get(params_usertable, (error, result) => {}).promise();
        console.log("user")
        console.log(result_user)

        kadai.Item.owner = {
            userId: result_user.Item.userId,
            userName: result_user.Item.userName,
            picture: result_user.Item.picture,
        }
        console.log("new-kadai");
        console.log(kadai);

        const response = {
            statusCode: 200,
            body: JSON.stringify([kadai.Item]),
        };

        return response

    } catch(error) {
        console.error(error);
        response = {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the todo item.',
        };
        return response;
    }
};
