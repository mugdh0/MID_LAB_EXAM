var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

var { body, validationResult } = require('express-validator');

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

router.post('/updateemp/:id',[

body('uname').not().isEmpty().withMessage('username empty'),
body('uname').isLength({min : 8}).withMessage('min 8 char').withMessage('username empty'),
body('password').isLength({min : 8}).withMessage('min 8 char').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-z\d@s$.!%*#?&]/).withMessage('mix char'),
body('type').not().isEmpty().withMessage('username empty'),
body('gender').not().isEmpty().withMessage('password empty'),
body('phone').not().isEmpty().withMessage('username empty')

], function(req, res){
	var errors = validationResult(req);
	if(errors.errors[0] != null){

		res.send("error in <br>"
			+ "no empty field"+ "user name should 8 char"+
			"should contain(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z\d@s$.!%*#?&]/)"
				)
	}else{
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
}
});


module.exports = router;
