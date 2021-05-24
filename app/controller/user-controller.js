const jsonwebtoken = require('jsonwebtoken');
const UserModel = require('../model/user-model');
const { JWT_SECRET } = require('../config')

class UserCls {
  // Get all users
  async findUsers(ctx) {
    ctx.body = await UserModel.find();
  }

  // Registered or Login by phone number
  async registeredOrLogin(ctx, next) {
    // ctx.verifyParams({
    //   phoneNumber: { type: 'number', required: true },
    //   verCode: { type: 'number', required: true },
    // });
    // const { phoneNumber } = ctx.request.body;
    const user = { id: '608a8be7e3d9670008cdca18', phoneNumber: 15140503203 };
    // const user = await UserModel.findOne({ phoneNumber });
    if (user) {
      const jwtStr = jsonwebtoken.sign({ id: user.id, phoneNumber: user.phoneNumber }, JWT_SECRET);
      ctx.body = { user, jwtStr };
    } else {
      await next();
    }
  }

  // Create User
  async createUser(ctx) {
    // ctx.verifyParams({
    //   name: { type: 'string', required: true },
    //   password: { type: 'string', required: true },
    // });
    // const { name } = ctx.request.body;
    // const repeatedUser = await User.findOne({ name });
    // if (repeatedUser) { ctx.throw(409, '用户已经占用'); }
    const { phoneNumber } = ctx.request.body;
    const user = await UserModel.create({ phoneNumber });

    const jwtStr = jsonwebtoken.sign({ id: user.id, phoneNumber: user.phoneNumber }, JWT_SECRET);
    ctx.body = { user, jwtStr };
  }

  // Create User
  async createUserByPhoneNumber(ctx) {
    // ctx.verifyParams({
    //   name: { type: 'string', required: true },
    //   password: { type: 'string', required: true },
    // });
    const { phoneNumber } = ctx.request.body;
    const repeatedUser = await UserModel.findOne({ phoneNumber });
    if (repeatedUser) { ctx.throw(409, '该手机号以注册'); }
    const user = await new UserModel(ctx.request.body).save();
    ctx.body = user;
  }

  async auth(ctx, next) {
    console.log('auth');
    const { authorization = ''} = ctx.request.header;
    const token = authorization.replace('Bearer ', '');

    try {
      const user = jsonwebtoken.verify(token, JWT_SECRET);
      ctx.state.user = user;
      await next();
    } catch (err) {
      console.log('JWT error');
    }
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
    const user = await UserModel.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.body = user;
  }

  // Delete user
  async delete(ctx) {
    const user = await UserModel.findByIdAndRemove(ctx.params.id);
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.status = 204;
  }

  // Valdiate user
  async valdiate(ctx) {
    // // ctx.verifyParams({
    // //   name: { type: 'string', required: true },
    // //   password: { type: 'string', required: true },
    // // });
    const user = await UserModel.findOne(ctx.request.body);
    if (!user) { ctx.throw(401, '用户名或密码不正确'); }
    // // const { _id, name } = user;
    // // const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' });
    ctx.body = user.username;
  }

  // Valdiate phone number
  async valdiatePhoneNumber(ctx) {
    // ctx.verifyParams({
    //   phoneNumber: { type: Number, required: true },
    //   verificationCode: { type: Number, required: true },
    // });
    // // TODO: Add verificationCode in memory, verify it.
    // if (ctx.body.verificationCode === 000000) {
    //   ctx.body = uctx.body.phoneNumber;
    // } else {
    //   ctx.throw(401, '验证码错误！')
    // }
  }
}


module.exports = new UserCls();