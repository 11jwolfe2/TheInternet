//count.js
var mongo = require('mongodb'); //supports database
var mongoose = require('mongoose'); //package handler for mongo
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
var Ip = require('../models/ip');
 
//Count Schema
var CountSchema = mongoose.Schema({
	id: {
		type: String,
	},
    count: {
    	type: Number,
    }
});
 
var Count = module.exports = mongoose.model('Count', CountSchema);
 
module.exports.getCount = function(count, ipc, ip, callback){//count is test, callback isfunction
	console.log("2" + ip);
    ipc.findOne({ip : ip}, function(err, iptest){
        if(!iptest)//add a new ip if not in the database, and update counter
        {
            var new_ip = new Ip({
                ip: ip,
                count: 1
            });
            db.collection('ip').save(new_ip);//add new ip to database
            count.update(//update hit counter
                { id: "hit counter"},
                { $inc: {count: 1} }
            )
        }
        else//update specific ip counter, to see who visits the most
        {
            ipc.update(
                { ip: ip },
                { $inc: {count: 1} }
            )
        }
    });
}

