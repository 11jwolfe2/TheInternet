var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');

//added after express generator
var flash = require('connect-flash'); //had flash functionallity to show on screen messages
var session = require('express-session'); //hosts login session
var passport = require('passport'); //handles login
var LocalStrategy = require('passport-local').Strategy;


//Mongo DB set up connection made with mongoose
var mongo = require('mongodb'); //supports database
var mongoose = require('mongoose'); //package handler for mongo
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

//Used for sending mail via contact form
var nodemailer = require('nodemailer');

//Transporter used to get gmail account
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'theinternet.onthewifi@gmail.com',
        clientId: '139955258255-a3c6ilqu6rtocigde7cbrusicg7j00eh.apps.googleusercontent.com',
        clientSecret: 'Q775xefdHA_BGu3ZnY9-6sP-',
        refreshToken: '1/0HfdzyzW3FmnDPqeYkv19_py6zWgMCOqI9DSZ9kQWfc',
        accessToken: 'ya29.GlvDBGA2Z_coEKjQOnXAnBLbTB0wQmS-sARqNGC3V2UATiywNb34IhFq4d7UQvhTobE6pi83-FB2-OvMWjC-mk-EKPMYmwxFe9AOZ7mY6kurYyQ7e1Mu8m8INxg7'
    }
})

//Email structure to be sent
var mailOptions = {
    from: ' NAME <theinternet.onthewifi@gmail.com>',
    to: 'theinternet.onthewifi@gmail.com',
    subject: 'Nodemailer test',
    text: 'Hello World!!'
}


//Routes used to show different pages
var index = require('./routes/index');//main router
var users = require('./routes/users');//currently not used will remove when app completed
var login = require('./routes/login');//route for login page
var homepage = require('./routes/homepage');//route for homepage
var blog = require('./routes/blog');//route for blog 
var post = require('./routes/post');//route for blog post
var addblogpost = require('./routes/addblogpost');//route for adding a blog post through the user login dashboard

//Init App
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'})); //name of main layout file is layout found underviews
app.set('view engine', 'handlebars');//change to handlebars maybe and not use hbs??..

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Set static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
	secret: 'worldpipes',
	saveUninitialized: true,
	resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', index);
app.use('/users', users);
app.use('/login', login);//figure out why this doesnt work?
app.use('/homepage', homepage);
app.use('/blog', blog);
app.use('/post', post);
app.use('/addblogpost', addblogpost);
//app.use('/dashboard', dashboard);

//Post from contact submit button, need to create a homepage with success message for submitted forms
app.post('/contact_Form', function(req, res){
    //Get information out of the contact form, from homepage.hbs
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;

    var mailOptions = { //creates information used when sending a message
        from: 'Automatic Email',
        to: 'theinternet.onthewifi@gmail.com',
        subject: 'Website Contact Form: ' + name,
        text: 'You have received a new message from your website contact form.\n\n' + 'Here are the details:\n\nName: ' + name + '\n\nEmail: ' + email + '\n\nPhone: ' + phone + '\n\nMessage:\n' + message
    }
  transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log('Error');
        }else {
            console.log('Email Sent');
        }
    })
    res.render('index'); //render new homepage, look into how to do this with success message, like logout page
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Set Port, uncomment if you use node app.js to start your server, other wise use npm start, which will load your www file and start your app
// app.set('port', (process.env.PORT || 3000));

// app.listen(app.get('port'), function(){
//     console.log('Server started on port '+app.get('port'));
// });

module.exports = app;
