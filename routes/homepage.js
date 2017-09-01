var express = require('express');
var router = express.Router();

/* GET users listing. */
//Homepage
router.get('/', function(req, res){
	res.render('homepage');
});

module.exports = router;

