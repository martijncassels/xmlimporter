var express = require('express');
//var http = require('http');
var router = express.Router();
var Promise = require('bluebird');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var xmlparser = require('express-xml-bodyparser');


/* GET home page. */
router.get('/', function(req, res, next) { //testing purposes
	var xml = "<order><orderrows><orderrow>1</orderrow><orderrow>2</orderrow></orderrows></order>";
	parseString(xml,function(err,result){
		if (err) {
			next();
		}
		console.log(result);
		var tmp = JSON.stringify(result, null, '-');
		res.type('application/json');
   		res.send(tmp);
	});

});

router.post('/',xmlparser({trim: false, explicitArray: false}), function(req, res, next) {
	console.log(req.get('Content-Type'));
	var timestamp = new Date();
	if (req.get('Content-Type')!=='application/xml') {
		res.send(timestamp.toLocaleString()+' : not xml but ',req.get('Content-Type'));
	}
	else {
		console.log(timestamp.toLocaleString()+' : got a nice wee xml :-)');
		res.send('all done\n'+JSON.stringify(req.body,null, '-'));
		}
	
});

module.exports = router;
