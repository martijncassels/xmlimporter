var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var XML = Promise.promisifyAll(require('xml-simple'));

/* GET home page. */
router.get('/', function(req, res, next) {
	XML.parse("<p><b>test</b></p>")
	.then(function(parsed) {
		console.log(parsed)
	})
	.then(function(parsed){
  		res.render('index', { title: 'Express' });
	})
	.catch(function(error)){
		console.log(error);
	});
});

module.exports = router;
