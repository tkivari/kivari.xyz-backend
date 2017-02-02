var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({nom: req.query.fname+" "+req.query.lname});
});

module.exports = router;
