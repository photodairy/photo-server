const jwt = require('koa-jwt');
const Router = require('koa-router');
const {
    createPhoto,
    getSignedUploadURL, isCurrentUserIsCreator, changeUploadPhotsStatus, getPhotosByUser, getSignedViewUrl
} = require('../controller/photo-controller');
const { auth } = require('../controller/user-controller')
const { JWT_SECRET } = require('../config');

const router = new Router({ prefix: '/photo' });
// const auth = jwt({ secret: JWT_SECRET });


router.post('/', createPhoto);

router.post('/createPhoto', auth, getSignedUploadURL, createPhoto)
// router.get('/getSignedUploadURL', auth, getSignedUploadURL);
router.get('/getPhotosByUser/:userId', auth, getPhotosByUser, getSignedViewUrl)
router.patch('/changeUploadPhotsStatus', auth, isCurrentUserIsCreator, changeUploadPhotsStatus)
// router.post('/addPhoto', photoCls.addPhoto);
// router.get('/viewAlbum', photoCls.viewAlbum);
// router.post('/uploadPhoto', photoCls.upload);

module.exports = router;