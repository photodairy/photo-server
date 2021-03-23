const Router = require('koa-router');
const userCls = require('../controller/user-controller')

const router = new Router();

// Create new user
router.post('/user', userCls.createUser);

// Update info
// Validate User
// Delete User
// Login use mobile number
// Reset PWD
// Login SSO


module.exports = router;