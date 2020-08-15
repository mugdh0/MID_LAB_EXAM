var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

const { body, validationResult } = require('express-validator');

router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	res.render('admin',{uname: req.session.username});
});

router.get('/allemployee', function(req, res){
  userModel.getAllemployee(function(results){
		res.render('allemployee', { employeeList : results, uname: req.session.username});
	});
});
router.get('/addemployee', function(req, res){
    res.render('addemployee');
});
router.post('/addemployee', function(req, res){
  var user = {
		uname 		: req.body.uname,
		password	: req.body.password,
		type		  : req.body.type,
    gender    : req.body.gender,
    phone     : req.body.phone
	}

  userModel.insert(user, function(status){
		if(status){
			res.redirect('/admin/allemployee');
		}else{
			res.redirect('/admin/addemployee');
		}
	});

});
module.exports = router;
