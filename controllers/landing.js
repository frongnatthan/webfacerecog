const models = require('../models')



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



exports.get_home = function(req, res, next) {
  res.render('home_user/home', { title: 'Express', user: req.user });
}
exports.get_layout = function(req, res, next) {
  res.render('home_user/layout', { title: 'Express', user: req.user });
}



//upload to webserver
exports.show_upload = function(req, res, next) {
  res.render('home_user/upload', { title: 'Express' });
}

exports.do_upload = function(req, res, file) {

  res.send("File upload sucessfully.");
  }