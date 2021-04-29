const Router = require('koa-router');
const verNumberCls = require('../controller/ver-number-controller');

const router = new Router({prefix: '/verNum'});

// Send verfication number
router.post('/sendVerNum', verNumberCls.sendVerNumber);

// Check verfication number
router.post('/checkVerNum', verNumberCls.checkVerNumber);


module.exports = router;