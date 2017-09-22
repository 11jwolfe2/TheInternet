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
var ipc = db.collection('ip');
var publicIp = require('public-ip');
var Public_ip;

//Homepage
router.get('/', function(req, res){
	publicIp.v4().then(ip => {
		Public_ip = ip;
    	console.log("ipv4: "+ Public_ip);
    	
    	//=> '46.5.21.123' 
	});
	publicIp.v6().then(ip => {
    	console.log("ipv6" + ip);
    	Public_ip=ip;
    	//=> 'fe80::200:f8ff:fe21:67cf' 
	});	

	Count.getCount(collection, ipc, Public_ip, function(count){
    	
    });
    count = db.collection('count').findOne({id: "hit counter"}, function(err, count){
    	userCount = count.count;
    	res.render('homepage', {count: userCount});
    }); 
});

module.exports = router;
