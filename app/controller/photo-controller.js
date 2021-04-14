const photoModel = require('../model/photo-model');

class PhotoCls {
   // Create Photo
  async createPhoto(ctx) {
   // ctx.verifyParams({
   //   name: { type: 'string', required: true },
   //   password: { type: 'string', required: true },
   // });
   // const { name } = ctx.request.body;
   // const repeatedUser = await User.findOne({ name });
   // if (repeatedUser) { ctx.throw(409, '用户已经占用'); }
   const user = await new photoModel(ctx.request.body).save();
   ctx.body = user;
 }

   async upload(ctx) {
       
   }
}

module.exports = new PhotoCls();