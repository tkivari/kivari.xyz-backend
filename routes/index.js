var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var env = require('../config/env.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  
	var host = env.production.database.read.host;
	var user = env.production.database.read.user;
	var password = env.production.database.read.password;
	var con_str = user+':'+password+'@'+host+'/resume';
	
  var db = mongojs(con_str);
  var contacts = db.collection('contacts');
  
  contacts.aggregate([
  	{
      $lookup:
        {
          from: "experience",
          localField: "email",
          foreignField: "email",
          as: "work_history"
        }
   }
  ], function(err, resume) {
  	if (!err) {
  	  res.json(resume);
  	}
  	else { 
  		console.log(err);
  		res.json({status: "error - check log"}); 
    }
  });
});

module.exports = router;
