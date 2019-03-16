'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.create = (event, context, callback) => {

	const timestamp = new Date().getTime();
	const data = JSON.parse(event.body);
	
	const params = {
		TableName: process.env.DYNAMODB_TABLE_USER,
		Item: {
			userId: uuid.v1(),
			userName: data.userName,
			picture: data.picture,
			userCategory: data.userCategory,
			budget: data.budget,
			createdAt: timestamp,
			updatedAt: timestamp,
		},
	};
	
	dynamodb.put(params, (error) => {
		if (error) {
			console.error(error);
			callback(null, {
				statusCode: error.statusCode || 501,
				headers: { 'Content-Type': 'text/plain' },
				body: 'Couldn\'t create the User.',
			});
			return;
		}
		
		const response = {
			statusCode: 200,
			body: JSON.stringify(params.Item),
		};
		callback(null, response);
	});
};
