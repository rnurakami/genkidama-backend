'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

module.exports.create = (event, context, callback) => {

    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            kadaiId: uuid.v1(),
            title: data.title,
            createdBy: data.add_user,
            like: data.iine_count,
            target_nagesen_point: data.target_nagesen_point,
            comments: [
                {
                    comment: data.comment,
                },
            ],
            longitude: data.longitude,
            latitude: data.latitude,
            picture_base64: data.picture_base64,
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
};