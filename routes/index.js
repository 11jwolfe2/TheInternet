var express = require('express');
var router = express.Router();

//Get home page
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('dashboard'); //login is camera page
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('homepage');//unless logged in redirect to homepage
	}
}
module.exports = router;
