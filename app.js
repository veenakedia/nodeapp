//module dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var cookieSession = require('cookie-session')
var session = require('express-session')
var stylus = require('stylus');
var nib = require('nib');
var http = require('http');
var path = require('path');

//routes
var routes = require('./routes/index');
var users = require('./routes/users');


var mongodb = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodeapp');


//set port
var portnumber = 3000;


//Initialize express
var app = express();
console.log('express');

function compile(str,path){
	return stylus(str)
		.set('filename',path)
		.use(nib());
}

app.set('views',__dirname + '/views');

//initialize Jade
app.set('view engine','jade');
console.log('Jade has been initialized');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//this should be over routes
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);


app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cookieSession({
	name:'session',
	keys:['mykey'],
	maxAge: 24 * 60 * 60 * 1000 }));
app.use(stylus.middleware(
 {
	src:__dirname + '/public',
	compile: compile
 }
));
	
	

//render index
app.get('/', function(req,res){
	
	res.render('index',{title:'Hello world'});
	}
);

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.listen(portnumber);
console.log('server is now running on port:' + portnumber);

module.exports = app;




