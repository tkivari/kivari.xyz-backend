var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  var db = mongojs('web:wef34982sdf@localhost:27017/resume');
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
  });
});

module.exports = router;
