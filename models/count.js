

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
 
module.exports.getCount = function(count, ipc, Public_ip, callback){//count is test, callback isfunction
    ipc.findOne({ip : Public_ip}, function(err, iptest){
        if(!iptest)//add a new ip if not in the database, and update counter
        {
            var new_ip = new Ip({
                ip: Public_ip,
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
                { ip: Public_ip },
                { $inc: {count: 1} 
            });
        }
    });
}

