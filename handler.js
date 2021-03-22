'use strict';

const serverlessHttp = require('serverless-http');
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// app.use(ctx => {
//   ctx. = 'Hello World';
// });

router.get('/get',(ctx) => {
  ctx.body = 'body';
})

app.use(router.routes());

module.exports= {
  // app,
  hello : serverlessHttp(app),
};
// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Go Serverless v1.0! Your function executed successfully!',
//         input: event,
//       },
//       null,
//       2
//     ),
//   };

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };
