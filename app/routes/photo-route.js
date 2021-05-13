const jwt = require('koa-jwt');
const Router = require('koa-router');
const {
    createPhoto,
    getSignedUploadURL,
} = require('../controller/photo-controller');
const { JWT_SECRET } = require('../config');

const router = new Router({prefix: '/photo'});
const auth = jwt({ secret: JWT_SECRET });


router.post('/', createPhoto);

router.post('/createPhoto',auth, createPhoto)

router.get('/getSignedUploadURL', getSignedUploadURL);
// router.post('/addPhoto', photoCls.addPhoto);
// router.get('/viewAlbum', photoCls.viewAlbum);
// router.post('/uploadPhoto', photoCls.upload);

module.exports = router;