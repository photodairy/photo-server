'use strict';

const serverlessHttp = require('serverless-http');
const Koa = require('koa');
const mongoose = require('mongoose');
const router = require('./app/routes/user-route');
const bodyparser = require('koa-bodyparser');

const app = new Koa();


mongoose.connect('mongodb+srv://fajing:wangfajing@zhihu.57z0a.azure.mongodb.net/zhihu?retryWrites=true&w=majority');

app.use(bodyparser());
app.use(router.routes());
const apphandler = serverlessHttp(app);
const api = async (event, context) => {
  // you can do other things here
  const result = await apphandler(event, context);
  // and here
  return result;
};


const test = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports= {
  // app,
  test: test,
  api : api
};
