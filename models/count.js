//count.js
var mongo = require('mongodb'); //supports database
var mongoose = require('mongoose'); //package handler for mongo
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
var temp;
 
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
 
module.exports.getCount = function(count, callback){//count is test, callback isfunction
	console.log("count in count.js:  "+ count);

    count.update(
    	{ id: "hit counter"},
    	{ $inc: {count: 1} }
    )
}