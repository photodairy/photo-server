const Router = require('koa-router');
const userCls = require('../controller/user-controller')

const router = new Router();

// Create new user
router.post('/user', userCls.createUser);

// Update info
router.patch('/user', userCls.updateUser);

// Validate User
router.post('/validateUser', userCls.valdiate);

// Delete User
router.delete('/:id', userCls.delete);
// Login use mobile number
// Reset PWD
// Login SSO

router.get('/test',(ctx) => {
  ctx.body = 'body';
})

module.exports = router;