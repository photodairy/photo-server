const UserModel = require('../model/user-model');

class UserCls {
  // Get all users
  async findUsers(ctx) {
    ctx.body = await UserModel.find();
  }

  // Registered or Login by phone number
  async registeredOrLogin(ctx) {
    console.log('registeredOrLogin start');
    console.log(UserModel);
    // ctx.verifyParams({
    //   phoneNumber: { type: 'number', required: true },
    //   verCode: { type: 'number', required: true },
    // });

    const { phoneNumber } = ctx.request.body;
    console.log(phoneNumber);
    const haveUser = await UserModel.findOne({ phoneNumber });
    if (haveUser) { 
      console.log(haveUser);
      ctx.body = "Exist User";
      console.log("Exist User");
    } else {
      this.createUser(ctx);
    }
  }

  // Create User
  async createUser(ctx) {
    console.log('createUser');
    // ctx.verifyParams({
    //   name: { type: 'string', required: true },
    //   password: { type: 'string', required: true },
    // });
    // const { name } = ctx.request.body;
    // const repeatedUser = await User.findOne({ name });
    // if (repeatedUser) { ctx.throw(409, '用户已经占用'); }
    const { phoneNumber } = ctx.request.body;
    console.log(phoneNumber);
    const user = await UserModel.create({ phoneNumber });
    ctx.body = "Creat User";
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
    ctx.body = user.username ;
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