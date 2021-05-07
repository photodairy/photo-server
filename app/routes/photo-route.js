const Router = require('koa-router');
const photoCls = require('../controller/photo-controller');

const router = new Router({prefix: '/photo'});


router.post('/', photoCls.createPhoto);
router.post('/addPhoto', photoCls.addPhoto);
router.get('/viewAlbum', photoCls.viewAlbum);
router.post('/uploadPhoto', photoCls.upload);

module.exports = router;