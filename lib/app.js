const express = require('express');
require('dotenv').config();
const AWS = require('aws-sdk');
const app = express();
app.use(express.json());

const SESconfig = {
  apiVersion: '2010-12-01',
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
};

const params = {
  Source: 'hello@juliannevela.dev',
  Destination: {
    ToAddresses: ['julianne@nessimaskye.com'],
  },
  ReplyToAddresses: ['hello@juliannevela.dev'],
  Message: {
    Body: {
      Html: {
        Charset: 'UTF-8',
        Data: 'IT IS WORKING!',
      },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'SES Test',
    },
  },
};

new AWS.SES(SESconfig)
  .sendEmail(params)
  .promise()
  .then((res) => {
    console.log(res);
  });

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
