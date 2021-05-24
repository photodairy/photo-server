const AWS = require('aws-sdk');
const photoModel = require('../model/photo-model');
const fs = require('fs');
const uuid = require('uuid');
const CONFIG = require('../config')

class PhotoCls {
  // Get upload Url
  async getSignedUploadURL(ctx, next) {
    AWS.config.update({ region: CONFIG.AWS_CONFIG_REGION });
    const s3 = new AWS.S3({ apiVersion: CONFIG.AWS_S3_CONFIG_AIPVERSION });
    const s3Uid = uuid.v4();
    const s3Key = ctx.state.user.id + '/' + s3Uid + '.' + ctx.request.body.fileType.split('/')[1];
    // Get signed URL from S3
    const s3Params = {
      Bucket: CONFIG.AWS_S3_PHOTO_BUCKETNAME,
      Key: s3Key,
      // Expires: URL_EXPIRATION_SECONDS,
      ContentType: ctx.request.body.fileType,
      // This ACL makes the uploaded object publicly readable. You must also uncomment
      // the extra permission for the Lambda function in the SAM template.
      ACL: 'public-read'
    }
    const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params);
    ctx.state.s3Infor = { s3Key, uploadURL };
    await next();
  }

  // Create Photo
  async createPhoto(ctx) {
    console.log(ctx.state.user.id);
    const photo = await photoModel.create({
      ...ctx.request.body,
      signedUpload_url: ctx.state.s3Infor.uploadURL,
      creator: ctx.state.user.id,
      uploadStatus: 'wait',
      s3Bucket: CONFIG.AWS_S3_PHOTO_BUCKETNAME,
      s3Key: ctx.state.s3Infor.s3Key
    })

    ctx.body = photo;
  }

  // Is the current user is this photo's creator
  async isCurrentUserIsCreator(ctx, next) {
    const photo = await photoModel.findById(ctx.request.body.id);
    if (!photo) {
      ctx.body = 'Photo not existing.';
    } else {
      if (ctx.state.user.id === ctx.request.body.id) {
        await next();
      } else {
        ctx.body = 'Current user is no permission to edit this photo';
      }
    }
  }

  // Change upload photo status
  async changeUploadPhotsStatus(ctx) {
    ctx.verifyParams({ uploadStatus: { type: 'String', required: true } })
    const photo = await photoModel.findByIdAndUpdate(ctx.request.body.id, ctx.request.body);
    if (!photo) {
      ctx.body = 'Photo not existing.';
    } else {
      ctx.body = photo;
    }
  }

  // Get photos by user id
  async getPhotosByUser(ctx, next) {
    AWS.config.update({ region: CONFIG.AWS_CONFIG_REGION });
    const s3 = new AWS.S3({ apiVersion: CONFIG.AWS_S3_CONFIG_AIPVERSION });

    const photos = await photoModel.find({ user: ctx.params.userId });
    if (!photos) {
      photos.forEach(photo => {
        ctx.state.constructionPhoto = photo;
        next();
        // const photoKey = photo.s3Key;
        // const params = {
        //   Bucket: CONFIG.AWS_S3_PHOTO_BUCKETNAME,
        //   Key: photoKey
        // };
        // const promise = s3.getSignedUrlPromise('getObject', params);
        // await promise.then(function (url) {
        //   photo.signedView_url = url;
        // }, function (err) {
        //   console.log(err);
        // });
      });
      ctx.body = photos;
    } else {
      ctx.body = 'This user not have some photos.';
    }
  }

  // Get signed view url
  getSignedViewUrl(ctx) {
    AWS.config.update({ region: CONFIG.AWS_CONFIG_REGION });
    const s3 = new AWS.S3({ apiVersion: CONFIG.AWS_S3_CONFIG_AIPVERSION });
    const photoKey = ctx.state.constructionPhoto.s3Key;
    const params = {
      Bucket: CONFIG.AWS_S3_PHOTO_BUCKETNAME,
      Key: photoKey
    };
    const url = s3.getSignedUrl('getObject', params);
    ctx.state.constructionPhoto.signedView_url = url;
    // const promise = s3.getSignedUrlPromise('getObject', params);
    // promise.then(function (url) {
    //   ctx.state.constructionPhoto.signedView_url = url;
    // }, function (err) {
    //   console.log(err);
    // });
  }

  // Get Album 
  async getAlbum(ctx) {

  }

  // Delete photo
  async deletePhoto(ctx) {

  }

  async addPhoto(ctx) {
    AWS.config.update({ region: 'us-east-1' });
    const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    const bucketName = 'normal-photo';
    const albumName = 'photos';
    const file = ctx.request.files.photo;

    if (!file) {
      ctx.body = "Please choose a file to upload first.";
      return;
    }
    let render = fs.createReadStream(file.path);
    // const file = new File();
    // const fileReader = new FileReader();
    // fileReader.readAsArrayBuffer(file);
    // const blobObj = new Blob([file],{type:file.type});
    // const type = typeof(file);
    // const jsonFile = JSON.stringify(file);
    const fileName = file.name;
    const albumPhotosKey = encodeURIComponent(albumName) + "/";
    const photoKey = albumPhotosKey + fileName;
    // Use S3 ManagedUpload class as it supports multipart uploads
    let uploadParams = {};
    uploadParams.Bucket = bucketName,
      uploadParams.Key = photoKey,
      uploadParams.Body = render,
      uploadParams.ContentType = "image/png"

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        console.log("Error", err);
      } if (data) {
        console.log("Upload Success", data.Location);
      }
    });
    // let upload = new AWS.S3.ManagedUpload({
    //   params: {
    //     Bucket: bucketName,
    //     Key: photoKey,
    //     Body: file,
    //     ContentType: "image/png"
    //   }
    // });

    // var promise = upload.promise();

    // promise.then(
    //   function (data) {
    //     ctx.body = "Successfully uploaded photo.";
    //     return;
    //   },
    //   function (err) {
    //     ctx.body = "There was an error uploading your photo: ", err.message;
    //     return;
    //   }
    // );
  }
  async viewAlbum(ctx) {
    AWS.config.update({ region: 'us-east-1' });
    const s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: 'normal-photo' }
    });
    const albumName = 'photos';
    const albumPhotosKey = encodeURIComponent(albumName) + "/";
    const photoKey = albumPhotosKey + encodeURIComponent('Screenshot4.png');
    const params = { Bucket: 'normal-photo', Key: photoKey };
    const promise = s3.getSignedUrlPromise('getObject', params);
    promise.then(function (url) {
      console.log('The URL is', url);
    }, function (err) {
      console.log(err);
    });
    // s3.listObjects({ Prefix: albumPhotosKey }, function(err, data) {
    //   if (err) {
    //     ctx.body = "There was an error viewing your album: " + err.message;
    //     return;
    //   }
    //   // 'this' references the AWS.Response instance that represents the response
    //   const href = this.request.httpRequest.endpoint.href;
    //   const bucketUrl = href + 'normal-photo' + "/";

    //   const photo = data.Contents[0];
    //   const photoKey = photo.Key;
    //   const photoUrl = bucketUrl + encodeURIComponent(photoKey);
    //   // const photos = data.Contents.map(function(photo) {
    //   //   var photoKey = photo.Key;
    //   //   var photoUrl = bucketUrl + encodeURIComponent(photoKey);
    //   // }
    // })
  }

  async upload(ctx) {

  }
}

module.exports = new PhotoCls();