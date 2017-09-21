var express = require('express');
var router = express.Router();
var mongo = require('mongodb'); //supports database
var mongoose = require('mongoose'); //package handler for mongo
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
 
//counter
var http = require('http');
var userCount = 0;
var Count = require('../models/count');
var collection = db.collection('count');

/* GET users listing. */
//Homepage
router.get('/', function(req, res){
	Count.getCount(collection, function(count){
    	
    });
    count = db.collection('count').findOne({id: "hit counter"}, function(err, count){
    	userCount = count.count;
    	res.render('homepage', {count: userCount});
    }); 
});

module.exports = router;

