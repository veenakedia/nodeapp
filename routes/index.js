var express = require('express');
var router = express.Router();
module.exports = router;

exports.index = function(req, res){
	response.render('index',{title:'Welcome'});
};

