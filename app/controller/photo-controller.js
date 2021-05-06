const AWS = require('aws-sdk');
const photoModel = require('../model/photo-model');
const fs = require('fs');

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

  async addPhoto(ctx) {
    AWS.config.update({ region: 'us-east-1' });
    // const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const bucketName = 'normal-photo';
    const albumName = 'photos';
    const file = ctx.request.files['photo'];
    if (!file) {
      ctx.body = "Please choose a file to upload first.";
      return;
    }
    const jsonFile = JSON.stringify(file);
    const fileName = file.name;
    const albumPhotosKey = encodeURIComponent(albumName) + "/";
    const photoKey = albumPhotosKey + fileName;

    // const fileStream = file.toBuffer();
    // Use S3 ManagedUpload class as it supports multipart uploads
    let upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucketName,
        Key: photoKey,
        Body: jsonFile
      }
    });

    var promise = upload.promise();

    promise.then(
      function (data) {
        ctx.body = "Successfully uploaded photo.";
        return;
      },
      function (err) {
        ctx.body = "There was an error uploading your photo: ", err.message;
        return;
      }
    );
  }

  async upload(ctx) {

  }
}

module.exports = new PhotoCls();