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
	res.render('employee',{uname: req.session.username});
});

router.get('/myprofile/:uname', function(req, res){

	userModel.get(req.params.uname, function(result){
		res.render('myprofile', {user: result});
	});

});
router.get('/updateemp/:uname', function(req, res){

	userModel.get(req.params.uname, function(result){
		res.render('updateemp', {user: result});
	});

});

router.post('/updateemp/:id', function(req, res){
  console.log(req.params.id)
  var user = {
    id: req.params.id,
		uname 		: req.body.uname,
		password	: req.body.password,
		type		  : req.body.type,
    gender    : req.body.gender,
    phone     : req.body.phone
	}

  userModel.updateemp(user, function(status){
		if(status){
			res.redirect('/employee');
		}else{
			res.redirect('/login');
		}
	});

});


module.exports = router;
