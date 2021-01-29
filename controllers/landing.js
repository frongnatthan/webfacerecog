const models = require('../models')


var http = require('http');

exports.submit_lead = function(req, res, next) {

  return models.Lead.create({
    email: req.body.lead_email
  }).then(lead => {
    res.redirect('/leads');
  })
}

exports.show_leads = function(req, res, next) {
  return models.Lead.findAll().then(leads => {
    res.render('lead/leads', { title: 'Express', leads: leads });   
  })
}

exports.show_lead = function(req, res, next) {
  return models.Lead.findOne({
    where : {
      id : req.params.lead_id
    }
  }).then(lead => {
    res.render('lead/lead', { lead : lead });
  });
}

exports.show_edit_lead = function(req, res, next) {
  return models.Lead.findOne({
    where : {
      id : req.params.lead_id
    }
  }).then(lead => {
    res.render('lead/edit_lead', { lead : lead });
  });
}

exports.edit_lead = function(req, res, next) {

  return models.Lead.update({
    email: req.body.lead_email
  }, { 
    where: {
      id: req.params.lead_id
    }
  }).then(result => {
    res.redirect('/lead/' + req.params.lead_id);
  })
}
exports.delete_lead = function(req, res, next) {
  return models.Lead.destroy({
    where: {
      id: req.params.lead_id
    }
  }).then(result => {
    res.redirect('/leads');
  })
}













///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



exports.get_home = function(req, res, next) {
  res.render('home_user/home', { title: 'Express', user: req.user });
}
exports.get_layout = function(req, res, next) {
  res.render('home_user/layout', { title: 'Express', user: req.user });
}





exports.do_upload = function(req, res, file) {
  var api_response = 'sucessfully';
  var options ={
    host: '127.0.0.1',
    port: 9997,
    path: '/upload',
    method:'POST',
    headers: {
      "Content-Type": "multipart/form-data",
    }
  }

  console.log(req.params.file)
  var req = http.request(options);
  req.end();

  res.redirect('/cctv');
  }






exports.show_cctv = function(req, res, next) {
  var request = require('request');
 request.get('http://127.0.0.1:9997/get_person', 
function(error, response, body){
    if(!error){
      var data = JSON.parse(body);
    }
    else{
      var data = []

    }

res.render('home_user/cctv', {user: req.user,result:data});
   });

}



exports.delete_name = function(req, res, next) {
 var name = req.params.name;
var request = require('request');
 request.post('http://127.0.0.1:9997/delete/'+name,function(error, response, body){
 return response
   });

}









exports.record_cctv1 = function(req, res, next) {

const Recorder = require('node-rtsp-recorder').Recorder
 
    var rec = new Recorder({
        url: 'rtsp://admin:kusrc12345@158.108.122.4:554/stream',
        timeLimit: 60, // time in seconds for each segmented video file
        folder: '/home/natthan/Downloads',
        name: "CCTV1"
    })
    // Starts Recording
    rec.startRecording();
 
    setTimeout(() => {
        console.log('Stopping Recording')
        rec.stopRecording()
        rec = null
        res.render('home_user/cctv');
    }, 30000)
    res.redirect('/cctv');





}



exports.record_cctv2 = function(req, res, next) {

const Recorder = require('node-rtsp-recorder').Recorder
 
    var rec = new Recorder({
        url: 'rtsp://admin:kusrc12345@158.108.122.5:554/stream',
        timeLimit: 60, // time in seconds for each segmented video file
        folder: '/home/natthan/Downloads',
        name: "CCTV2"
    })
    // Starts Recording
    rec.startRecording();
 
    setTimeout(() => {
        console.log('Stopping Recording')
        rec.stopRecording()
        rec = null
        res.render('home_user/cctv');
    }, 30000)
    res.redirect('/cctv');





}






exports.record_cctv3 = function(req, res, next) {

const Recorder = require('node-rtsp-recorder').Recorder
 
    var rec = new Recorder({
        url: 'rtsp://admin:kusrc12345@158.108.122.6:554/stream',
        timeLimit: 60, // time in seconds for each segmented video file
        folder: '/home/natthan/Downloads',
        name: "CCTV3"
    })
    // Starts Recording
    rec.startRecording();
 
    setTimeout(() => {
        console.log('Stopping Recording')
        rec.stopRecording()
        rec = null
        res.render('home_user/cctv');
    }, 30000)
    res.redirect('/cctv');





}

exports.record_cctv4 = function(req, res, next) {

const Recorder = require('node-rtsp-recorder').Recorder
 
    var rec = new Recorder({
        url: 'rtsp://admin:kusrc12345@158.108.122.7:554/stream',
        timeLimit: 60, // time in seconds for each segmented video file
        folder: '/home/natthan/Downloads',
        name: "CCTV4"
    })
    // Starts Recording
    rec.startRecording();
 
    setTimeout(() => {
        console.log('Stopping Recording')
        rec.stopRecording()
        rec = null
    }, 30000)
    res.redirect('/cctv');

}












