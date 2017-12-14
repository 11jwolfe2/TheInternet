var mongoose = require('mongoose'); //package handler for mongo


//blog Schema
var BlogSchema = mongoose.Schema({
	title: {
		type: String,
	},
	subtitle: {
		type: String,
	},
	catagory: {
		type: String,
	},
	date: {
		type: Date,
	},
	author: {
		type: String,
	},
	body: {
		type: String,
	},
	views: {
		type: Number,
	},
	backgroundimage: {
		type: String,
	}
});

var Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;