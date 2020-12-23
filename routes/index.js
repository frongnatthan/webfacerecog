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
router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);
router.get('/leads', hasAuth, landing.show_leads);
router.get('/lead/:lead_id', hasAuth, landing.show_lead);
router.get('/lead/:lead_id/edit', hasAuth, landing.show_edit_lead);
router.post('/lead/:lead_id/edit', hasAuth, landing.edit_lead);
router.post('/lead/:lead_id/delete', hasAuth, landing.delete_lead);







//multer object creation
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    	  	  console.log(file.originalname)

        cb(null, 'picture')
    },
    filename: function (req, file, cb) {

        cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })


router.get('/upload',landing.show_upload);
 
router.post('/upload', upload.single('imageupload'),landing.do_upload);

module.exports = router;
