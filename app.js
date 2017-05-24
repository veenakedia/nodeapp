//module dependencies
var express = require('express');
stylus = require('stylus');
nib = require('nib');

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

//stylus middleware
//app.use(express.logger('dev'));
app.use(stylus.middleware(
 {
	src:__dirname + '/public',
	compile: compile
 }
));
	
app.use(express.static(__dirname + '/public'));

//render index
app.get('/', function(req,res)
{
	res.render('index',
	{
		title:'Welcome'
	});
});

app.listen(portnumber);
console.log('server is now running on port:' + portnumber);