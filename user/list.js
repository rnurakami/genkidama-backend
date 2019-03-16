'use strict';

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.list = (event, context, callback) => {

    const params = {
        TableName: process.env.DYNAMODB_TABLE_USER,
	};
	console.log(params)
	
	dynamodb.scan(params, (error, result) => {
		if(error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the Users.',
            });
            return;
		}

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
	});
};
