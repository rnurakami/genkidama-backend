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

        // owner = result.Item.owner
        console.log(result.Item)
        console.log(result.Item.owner)
        // owner = result.Item.owner

        var params_usertable = {
            TableName : process.env.DYNAMODB_TABLE_USER,
            Key: {
                userId: result.Item.owner,
            }
        };
        console.log(params_usertable)
    
        dynamodb.get(params_usertable, (error, result_user) => {
            if (error) {
                console.error(error);
                callback(null, {
                    statusCode: error.statusCode || 501,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Couldn\'t fetch the todo item.',
                });
                return;
            }
                
            console.log("user");
            console.log(result_user);
            console.log("kadai");
            console.log(result);
    
            result.Item.owner = {
                userId: result_user.Item.userId,
                userName: result_user.Item.userName,
                picture: result_user.Item.picture,
            }
            console.log("new-kadai");
            console.log(result);

            const response = {
                statusCode: 200,
                body: JSON.stringify([result.Item]),
            };
            callback(null, response);
    
        });
    
    

        // const response = {
        //     statusCode: 200,
        //     body: JSON.stringify([result.Item]),
        // };
        // callback(null, response);
    });
};
