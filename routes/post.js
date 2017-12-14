var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var Blog = require('../models/blog');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

router.get('/', function(req, res, next){
	Blog.find(function(err, blogs){
		res.render('post', {
			//title: "this is the title - handlebars",
			posts: blogs,
      		blogpost: true
		});
		//console.log(blogs);//for debug only
	});
});


//post whatever blog post is clicked on
router.post('', function(req, res){
  //var objectid = req.body.postID;//"5a26c21fbe56c88d44a5e519";//req.body.postID;
  //var postId = mongo.ObjectID(objectid);
  //console.log(postId);
  db.collection('blogs').update(
    { "_id": mongo.ObjectID(req.body.postID)},
    { $inc: {views: 1} 
    });
  Blog.find({"_id": mongo.ObjectID(req.body.postID)}, function(err, post){
    res.render('post', {
      info: post,
      blogpost: true
    });
    console.log(post);
  });
});

router.post('catagories', function(req, res){
  Blog.find({"catagories": req.body.catagory}, function(err, post){
    res,render('', {

    });
  });
});

module.exports = router;