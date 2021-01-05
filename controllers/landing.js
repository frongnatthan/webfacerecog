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
      console.log("api response is: "+ api_response);
    });
  }
  var req = http.request(options, callback);
  req.end();

  res.send("File upload and Train sucessfully.");
  }






exports.show_cctv = function(req, res, next) {
res.render('home_user/cctv');

}




exports.record_cctv1 = function(req, res, next) {

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


exports.record_cctv2 = function(req, res, next) {

const Recorder = require('node-rtsp-recorder').Recorder
 
    var rec = new Recorder({
        url: 'rtsp://admin:kusrc12345@158.108.122.6:554/stream',
        timeLimit: 60, // time in seconds for each segmented video file
        folder: '/home/natthan/Desktop/myapp/VideoForPic',
        name: false,
        directoryPathFormat: false,
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











/////////open cv test////////
const cv = require('opencv4nodejs');
const path = require('path');
const express = require('express');
const app = express();
const server =require('http').Server(app);
const io= require('socket.io')(server);

//'rtsp://admin:kusrc12345@158.108.122.5:554/stream'//
const wCap = new cv.VideoCapture(0);
///////////////


exports.show_opencv = function(req, res, next) {
  setInterval(() => {
    const frame = wCap.read();
    const image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('image',image);
  },1000)
//res.sendFile(path.join(__dirname,'home/opencv'));
res.render('home_user/opencv');
 

}





