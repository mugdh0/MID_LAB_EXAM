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



module.exports = router;
