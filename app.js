//module dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var monk = require('monk');
var mongodb = require('mongodb');
//var routes = require('./routes');
var index = require('./routes/index');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var db = monk('localhost:27017/nodeapp');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var cookieSession = require('cookie-session')
var session = require('express-session')
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

//set port
var portnumber = 3000;

var dbconnect;
var connection = MongoClient.connect('mongodb://localhost:27017/nodeapp', function(err, db){
	dbconnect = db;
});
//var schema = mongoose.Schema({last_name:'string',first_name:'string', username:'string',email:'string'});
//var User = mongoose.model('User', schema);

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

//stylus middleware
//app.use(express.logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(cookieSession({
	name:'session',
	keys:['mykey'],
	maxAge: 24 * 60 * 60 * 1000 }));
//app.use(session());
//app.use(app.router);
app.use(stylus.middleware(
 {
	src:__dirname + '/public',
	compile: compile
 }
));
	
app.use(express.static(__dirname + '/public'));

//render index
app.get('/', function(req,res){
	
	res.render('index',{title:'Hello world'});
	}
);

app.get('/userlist', function(req,res,next){
	dbconnect.collection('usercollection').find().toArray(function(err, userlist) {s
    res.render(
		'userlist', {
      title: 'User List',
      userlist: userlist
    })
  })
});
//app.get('/userlist', user);

// Make our db accessible to our router


//app.post('/adduser',route.adduser(db));


app.listen(portnumber);
console.log('server is now running on port:' + portnumber);