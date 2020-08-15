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
	res.render('admin',{uname: req.session.username});
});

router.get('/search', function(req, res){
	userModel.getAllemployee(function(results){
		res.render('search', { employeeList : results, uname: req.session.username});
	});
});

router.get('/allemployee', function(req, res){
  userModel.getAllemployee(function(results){
		res.render('allemployee', { employeeList : results, uname: req.session.username});
	});
});
router.get('/addemployee', function(req, res){
    res.render('addemployee');
});
router.post('/addemployee',[

body('uname').not().isEmpty().withMessage('username empty'),
body('uname').isLength({min : 8}).withMessage('min 8 char').withMessage('username empty'),
body('password').isLength({min : 8}).withMessage('min 8 char').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-z\d@s$.!%*#?&]/).withMessage('mix char'),
body('type').not().isEmpty().withMessage('username empty'),
body('gender').not().isEmpty().withMessage('password empty'),
body('phone').not().isEmpty().withMessage('username empty')

] ,function(req, res){

	var errors = validationResult(req);
	if(errors.errors[0] != null){

		res.send("error in <br>"
			+ "no empty field"+ "user name should 8 char"+
			"should contain(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-z\d@s$.!%*#?&]/)"
				)
	}else{
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
}

});

router.get('/delete/:id', function(req, res){

	userModel.gets(req.params.id, function(result){
		res.render('delete', {user: result});
	});

});

router.post('/delete/:id', function(req, res){

  if(req.body.submit == 'confirm'){

    userModel.delete(req.body.id, function(status){
  		if(status){
  			res.redirect('/admin/allemployee');
  		}else{
  			res.redirect('/admin');
  		}
  	});

  }else if(req.body.submit == 'no'){
      res.redirect('/admin/allemployee');
  }
  else{
  }

});

router.get('/update/:id', function(req, res){

	userModel.gets(req.params.id, function(result){
		res.render('update', {user: result});
	});

});
router.post('/update/:id', function(req, res){
  console.log(req.params.id)
  var user = {
    id: req.params.id,
		uname 		: req.body.uname,
		password	: req.body.password,
		type		  : req.body.type,
    gender    : req.body.gender,
    phone     : req.body.phone
	}

  userModel.update(user, function(status){
		if(status){
			res.redirect('/admin/allemployee');
		}else{
			res.redirect('/admin');
		}
	});

});

module.exports = router;
