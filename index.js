'use strict';

const Koa = require('koa');
const mongoose = require('mongoose');
const koaJosnError = require('koa-json-error');
const koaBody = require('koa-body');
const parameter = require('koa-parameter');
const routing = require('./app/routes');

const app = new Koa();


mongoose.connect('mongodb+srv://fajing:wangfajing@zhihu.57z0a.azure.mongodb.net/zhihu?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true}, () => console.log('MongoDB connented!'));
mongoose.connection.on('error', console.error);

app.use(koaJosnError({
    // postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  }));

// Get request body
app.use(koaBody({
  multipart:true
}));
app.use(parameter(app));
routing(app);


app.listen(3000, () => {
    console.info('Listening on port 3000.');
});

module.exports = { app };