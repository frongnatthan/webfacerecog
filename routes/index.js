var express = require('express');
var router = express.Router();
let landing=require('../controllers/landing');
let user = require('../controllers/user');

let {isLoggedIn, hasAuth} = require('../middleware/hasAuth.js')

router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);



/* GET home page. */
router.get('/leads', landing.show_leads);
router.get('/lead/:lead_id', landing.show_lead);
router.get('/lead/:lead_id/edit', landing.show_edit_lead);
router.post('/lead/:lead_id/edit', landing.edit_lead);
router.post('/lead/:lead_id/delete', landing.delete_lead);



//////////////////////////////////////////////////////////////////////////////////////////////////////
//home_user
router.get('/',landing.get_home);
router.post('/',landing.submit_lead);
router.get('/cctv',landing.show_cctv);
router.post('/record_cctv1',landing.record_cctv1);
router.post('/record_cctv2',landing.record_cctv2);
router.post('/record_cctv3',landing.record_cctv3);

router.get('/opencv',landing.show_opencv);


//multer object creation
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    	  	  console.log(file.originalname)

        cb(null, 'VideoForPic')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })
router.get('/upload',landing.show_upload);
 
router.post('/upload', hasAuth,upload.single('imageupload'),landing.do_upload);




module.exports = router;
