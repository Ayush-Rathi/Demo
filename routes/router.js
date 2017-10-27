var express = require('express');
var flash = require('connect-flash');
var router = express.Router();
var User = require('../models/user');


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
	console.log(req.body);
  // confirm that user typed same password twice
  // if (req.body.password !== req.body.passwordConf) {
	  // console.log(req.body.passwordConf);
	  // console.log(req.body.password);
    // var err = new Error('Passwords do not match.');
    // err.status = 400;
    // //res.send("passwords dont match");
    // return res.redirect("http://localhost:2200/#/dashboard/analytics");
  // }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
		  console.log(error);
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect("http://localhost:2200/#/dashboard/analytics");
		
      }
    });

  } else if (req.body.email && req.body.password) {

    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return res.redirect('http://localhost:2200/#/login')
      } else {
        req.session.userId = user._id;
		console.log('Response'+res);
		//req.flash('info', 'Flashed message');
		 var string = encodeURIComponent('something that would break');
		 return res.redirect('http://localhost:2200/#?valid=' + string);
        //return res.redirect('http://localhost:2200/#/dashboard/analytics');
		//res.render('http://localhost:2200/#/dashboard/analytics', { message: req.flash('info') });
		//return res.send(JSON.stringify(user));
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;