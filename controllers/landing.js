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



//upload to webserver
exports.show_upload = function(req, res, next) {
res.render('home_user/upload'); 

}

exports.do_upload = function(req, res, file) {
  var api_response = 'sucessfully';
  var options ={
    host: '127.0.0.1',
    port: 9999,
    path: '/action',
    method:'GET'
  }

  callback = function(response){
    response.on("data",function(chunk){
      api_response+=chunk;

    });
    response.on("end",function(){
      console.log("api response is success ");
    });
  }
  var req = http.request(options, callback);
  req.end();

  res.redirect('/cctv');
  }






exports.show_cctv = function(req, res, next) {
res.render('home_user/cctv', { title: 'Express', user: req.user });

}

exports.record_cctv1 = function(req, res, next) {

const Recorder = require('node-rtsp-recorder').Recorder
 
    var rec = new Recorder({
        url: 'rtsp://admin:kusrc12345@158.108.122.4:554/stream',
        timeLimit: 60, // time in seconds for each segmented video file
        folder: '/home/natthan/Desktop/myapp/VideoForPic',
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
        folder: '/home/natthan/Desktop/myapp/VideoForPic',
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
        folder: '/home/natthan/Desktop/myapp/VideoForPic',
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
        folder: '/home/natthan/Desktop/myapp/VideoForPic',
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












