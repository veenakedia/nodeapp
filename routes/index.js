//homepage

exports.index = function(req, res){
	response.render('index',{title:'Welcome'});
};

//userlist

exports.userlist = function(db){
	return function(req, resp){
		var collection = db.get('usercollection');
		collection.find({},{}, function(e,docs){
			res.sender('userlist',{
				"userlist": docs,
					title: "user list"
			});
		});
	};
};