var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();
var { body, validationResult } = require('express-validator');
router.get('/', function(req, res){
	res.render('login');
});

router.post('/', [

body('uname').not().isEmpty().withMessage('username empty'),
body('password').not().isEmpty().withMessage('password empty')

],function(req, res){
	var errors = validationResult(req);
	if(errors.errors[0] != null){
		console.log(errors.errors)
		res.send("error in <br>"
			+ "no empty field"
				)
	}else{
		var user = {
			uname: req.body.uname,
			password: req.body.password
		};

		userModel.validate(user, function(status){
	    console.log(status)
			if(status){
				req.session.username = user.uname;
	      console.log(user.id)
			//	res.redirect('/admin');
	    userModel.get(user.uname, function(result){
					if (result.type == 'employee'){
						res.redirect('/employee');
					}
					else if(result.type == 'admin'){
	          res.redirect('/admin');
					}
				});

				}else{
				res.send('invalid username/password');
			}
		});

	}


});

module.exports = router;
