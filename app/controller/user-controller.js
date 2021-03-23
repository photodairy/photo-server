const userModel = require('../model/user-model');

class UserCls {
    // Create User
    async createUser(ctx) {
        // console.log(ctx);
        // ctx.verifyParams({
        //   name: { type: 'string', required: true },
        //   password: { type: 'string', required: true },
        // });
        // const { name } = ctx.request.body;
        // const repeatedUser = await User.findOne({ name });
        // if (repeatedUser) { ctx.throw(409, '用户已经占用'); }
        const user = await new userModel(ctx.request.body).save();
        ctx.body = user;
      }
}


module.exports = new UserCls();