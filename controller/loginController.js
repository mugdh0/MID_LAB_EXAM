var express 	= require('express');
var userModel 	= require.main.require('./models/user');
var router 		= express.Router();

router.get('/', function(req, res){
	res.render('login');
});

router.post('/', function(req, res){

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
				if (result.type == 'admin'){
					res.redirect('/admin');
				}
				else if (result.type == 'employee'){
          res.redirect('/employee');
				}
			});

			}else{
			res.send('invalid username/password');
		}
	});

});

module.exports = router;
