var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

//Gets the main blog page
router.get('/', function(req, res, next){
	Blog.find({}, null, {sort: {date: -1}, limit:10}, function(err, blogs){//-1 for decending 1 for ascending
		res.render('blog', {
			//title: "this is the title - handlebars",
			posts: blogs,
   			blogset: true
		});
		//console.log(blogs);
	});
});

router.get('/catagories', function(req, res, next){
	Blog.distinct("catagory", function(err, catagory){
		res.render('catagories', {
			catagories: catagory.sort(),
			blogset: true
		});
	});
});

router.post('', function(req, res){
	console.log(req.body.catagory);
	Blog.find({"catagory": req.body.catagory}, null, {sort: {date: -1}}, function(err, post){
    	res.render('blog', {
      		posts: post,
      		blogset: true
    	});
  	});
});


module.exports = router;