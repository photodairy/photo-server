const userModel = require('../model/user-model');

class UserCls {
  // Get all users
  // async findUsers(ctx) {
  //   ctx.body = await User.find();
  // }

  // Create User
  async createUser(ctx) {
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
  
  // Update user
  async updateUser(ctx) {
    // ctx.verifyParams({
    //   name: { type: 'string', required: false },
    //   password: { type: 'string', required: false },
    //   avatar_url: { type: 'string', required: false },
    //   gender: { type: 'string', required: false },
    //   headline: { type: 'string', required: false },
    //   locations: { type: 'array', itemType: 'string', required: false },
    //   business: { type: 'string', required: false },
    //   employments: { type: 'array', itemType: 'object', required: false },
    //   educations: { type: 'array', itemType: 'object', required: false },
    // });
    const user = await userModel.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.body = user;
  }

  // Delete user
  async delete(ctx) {
    const user = await userModel.findByIdAndRemove(ctx.params.id);
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.status = 204;
  }

  // Valdiate user
  async valdiate(ctx) {
    // // ctx.verifyParams({
    // //   name: { type: 'string', required: true },
    // //   password: { type: 'string', required: true },
    // // });
    const user = await userModel.findOne(ctx.request.body);
    if (!user) { ctx.throw(401, '用户名或密码不正确'); }
    // // const { _id, name } = user;
    // // const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' });
    ctx.body = user.username ;
  }
}


module.exports = new UserCls();