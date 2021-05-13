const Router = require('koa-router');
const {
    sendVerNumber,
    checkVerNumber
} = require('../controller/ver-number-controller');
const {
    registeredOrLogin,
    createUser
} = require('../controller/user-controller');

const router = new Router({prefix: '/verNum'});

// Send verfication number
router.post('/sendVerNum', sendVerNumber);

// Check verfication number
router.post('/checkVerNum', checkVerNumber, registeredOrLogin, createUser);


module.exports = router;