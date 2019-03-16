'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.create = (event, context, callback) => {

	const timestamp = new Date().getTime();
	const data = JSON.parse(event.body);
	const kadaiId = uuid.v1();
	const imageName = 'kadai/' +kadaiId + '.jpg';
	const pictureUrl = 'http://' + process.env.S3_BUCKET + '.s3.amazonaws.com/' + imageName;

	const s3Params = {
		Bucket: process.env.S3_BUCKET,
		Key: imageName,
		Body: Buffer.from(data.picture, 'base64'),
		ContentType: "image/jpeg",
	};

	var putObjectPromise = s3.putObject(s3Params).promise();
	putObjectPromise.then(function(putData) {

		const params = {
			TableName: process.env.DYNAMODB_TABLE,
			Item: {
				kadaiId: kadaiId,
				title: data.title,
				owner: data.owner,
				description: data.description,
				picture: pictureUrl,
				targetPoint: data.targetPoint,
				currentPoint: 0,
				longitud: data.longitude,
				latitude: data.latitude,
				status: 0,
				like: 0,
				comments: [],
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
					body: 'Couldn\'t create the kadai.',
				});
				return;
			}

			const response = {
				statusCode: 200,
				body: JSON.stringify(params.Item),
			};
			callback(null, response);
		});

	}).catch(function(err) {
		console.log(err);
		callback(null, {
			statusCode: 500,
			body: JSON.stringify({
				"message": "Unable to load image to S3"
			}),
			
		});
	});
};
