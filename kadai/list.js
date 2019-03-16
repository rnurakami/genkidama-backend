'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.list = async (event, context, callback) => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
	};
    console.log(params)
    
    try {
        const resultKadais = await dynamodb.scan(params, (error, result) => {}).promise();
        console.log("resultKadais")
        console.log(resultKadais)

        for (let index = 0; index < resultKadais.Items.length; index++) {
            var params_usertable = {
                TableName : process.env.DYNAMODB_TABLE_USER,
                Key: {
                    userId: resultKadais.Items[index].owner,
                }
            };

            const result_user = await dynamodb.get(params_usertable, (error, result) => {}).promise();
            console.log("user")
            console.log(result_user)

            resultKadais.Items[index].owner = {
                userId: result_user.Item.userId,
                userName: result_user.Item.userName,
                picture: result_user.Item.picture,
            }
            console.log("new-kadai");
            console.log(resultKadais.Items[index]);
        };

        const response = {
            statusCode: 200,
            body: JSON.stringify(resultKadais.Items),
        };

        return response

    } catch(error) {
        console.error(error);
        response = {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the todos item.',
        };
        return response;
    }

};
