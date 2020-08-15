var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();


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
module.exports = router;
