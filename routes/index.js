var express = require('express');
var router = express.Router();

let landing=require('../controllers/landing');



//multer object creation
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'picture')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })



/* GET home page. */
router.get('/',landing.get_landing);
router.post('/',landing.submit_lead);
router.get('/leads',landing.show_leads);
router.get('/lead/:lead_id',landing.show_lead);
router.get('/lead/:lead_id/edit',landing.show_edit_lead);
router.post('/lead/:lead_id/edit',landing.edit_lead);
router.post('/lead/:lead_id/delete',landing.delete_lead);

router.get('/upload',landing.show_upload);
 
router.post('/upload', upload.single('imageupload'),landing.do_upload);

module.exports = router;
