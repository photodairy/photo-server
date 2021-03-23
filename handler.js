'use strict';

const serverlessHttp = require('serverless-http');
const Koa = require('koa');
// const Router = require('koa-router');
const mongoose = require('mongoose');
const router = require('./app/routes/user-route');

const app = new Koa();
// const router = new Router();
const { Schema, model } = mongoose;


// mongoose.connect('mongodb+srv://fajing:wangfajing@zhihu.57z0a.azure.mongodb.net/zhihu?retryWrites=true&w=majority');





// router.get('/get', async (ctx) => {
//   // const user = new userModel({username:'fajing',password:'66666666'}).save();
//   ctx.body = (await userModel.find()).toString();
//   // ctx.body = ctx.header;
// })

// router.get('/insert', (ctx) => {
//   const user = new userModel({username:'fajing',pwd:'66666666'}).save();
//   ctx.body = ctx.header;
// })

router.get('/test',(ctx) => {
  ctx.body = 'body';
})

app.use(router.routes());

// or as a promise
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
  app,
  test: test,
  api : api
};
