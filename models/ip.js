//var mongo = require('mongodb'); //supports database
var mongoose = require('mongoose'); //package handler for mongo
//mongoose.connect('mongodb://localhost/loginapp');
//var db = mongoose.connection;

//Count Schema
var IpSchema = mongoose.Schema({
ip: {
type: String,
},
count: {
type: Number,
}
});

var Ip = module.exports = mongoose.model('Ip', IpSchema);
