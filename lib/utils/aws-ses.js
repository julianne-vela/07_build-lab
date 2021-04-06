const path = require('path');
// const UserModel = require('../models/UserModel');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const AWS = require('aws-sdk');

const SESconfig = {
	apiVersion: '2010-12-01',
	accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
	region: process.env.AWS_SES_REGION,
};

const sendAWSEmail = async (newJoke) => {
	let params = {
		Source: process.env.AWS_SES_EMAIL,
		Destination: {
			ToAddresses: [`${process.env.AWS_SES_EMAIL2}`],
		},
		ReplyToAddresses: [`${process.env.AWS_SES_EMAIL}`],
		Message: {
			Body: {
				Html: {
					Data: `Hey there! Here's your daily dose of funny!
                    
                    ${newJoke.setup}
                    
                    ${newJoke.punchLine}
                    
                    Thanks for subscribing! See ya tomorrow with another funny!`,
					Charset: 'UTF-8',
				},
			},
			Subject: {
				Data: 'Your Daily Dose of Funny',
				Charset: 'UTF-8',
			},
		},
	};

	return await new AWS.SES(SESconfig)
		.sendEmail(params)
		.promise()
		.then((res) => {
			console.log(res);
			return res;
		});
};

module.exports = sendAWSEmail;
