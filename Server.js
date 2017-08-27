var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

//var mongo = require("mongodb");
//var monk = require("monk");

//var db = monk('localhost:27017/TheInternet);



router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/main_login",function(req,res){
  res.sendFile(path + "main_login.html");
});

// router.get("/about",function(req,res){
//   res.sendFile(path + "about.html");
// });

// router.get("/contact",function(req,res){
//   res.sendFile(path + "contact.html");
// });

//app.use(function(req,res,next){
  //  req.db = db;
    //next();
//});

app.use("/",router);

app.use(express.static(__dirname + '/public')); // allows for css to be loaded with html text

app.use("*",function(req,res){
   res.sendFile(path + "404.html");
});

app.listen(5000,function(){
  console.log("Live at Port 5000");
});