const Router = require('koa-router');
const photoCls = require('../controller/photo-controller');

const router = new Router();

router.post('/uploadPhoto', photoCls.upload);