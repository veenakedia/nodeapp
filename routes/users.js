var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
	console.log('respond with a resource');
  res.send('respond with a resource');
});

 

router.get('/userlist', function(req, res){
	var db=req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
        res.render(
		'userlist', {
      title: 'User List',
      userlist: docs
    })
    });
});

router.post('/adduser',function(req,res){	
	var db = req.db;
	console.log(req.body);
	console.log(req.body.first_name);
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var username = req.body.username;
		var email = req.body.email;
		var password = "abcd";
	
	db.collection('usercollection').insert(
		{
			"last_name" : last_name,
			"first_name" : first_name,
			"username" : username,
			"email" : email,
			"password" : password
		}, function(err,doc){
			if(err){
				res.send('there was a problem');
			}
			else{
				
				res.location('userlist');
				res.redirect('userlist');
			}
	});
	
})

router.delete('/deleteuser/:id', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	console.log(req.params.id);
	var usertodelete = req.params.id;
	collection.remove({'_id': usertodelete}, function(err){
		if(err){
				res.send('there was a problem');
				console.log(err);
			}
			else{
				console.log('success');
				
				res.send('success');
			}
			
	});
});

//important for node version 4.0+
module.exports = router;
/*
 * GET userlist.
 */
