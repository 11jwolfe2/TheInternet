var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

//Get addblogpage page
router.get('/', ensureAuthenticated, function(req, res) {
  res.render('addblogpost'); 
});

function ensureAuthenticated(req,res,next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('blog');//unless logged in redirect to homepage
	}
}

router.post('', function(req, res) {
  if (!req.body.title || !req.body.subtitle || !req.body.catagory || !req.body.author || !req.body.body || !req.body.backgroundimage) {
    req.flash('error_msg', 'Error adding your post!'); 
    console.log('Error adding new post');   
    return res.redirect('/addblogpost');

  }
  var post = new Blog({
    title: req.body.title,
    subtitle: req.body.subtitle,
    catagory: req.body.catagory,
    author: req.body.author,
    body: req.body.body,
    backgroundimage: req.body.backgroundimage,
    date: (new Date())
  });
  post.save(function(err) {
  	req.flash('success_msg', 'You have added a post!');
    res.redirect('/addblogpost'); 
  });
});


module.exports = router;