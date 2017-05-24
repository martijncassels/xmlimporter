var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var multer = require('multer'); // v1.3.0
var upload = multer(); // for parsing multipart/form-data

/* GET home page. */
router.get('/', function(req, res, next) {
	// XML.parseString("<p><b>test</b></p>")
	// .then(function(parsed) {
	// 	console.log(parsed)
	// })
	// .then(function(){
 //  		res.render('index', { title: 'Express' });
	// })
	// .catch(function(error){
	// 	console.log(error);
	// });
	var xml = "<order><orderrows><orderrow>1</orderrow><orderrow>2</orderrow></orderrows></order>";
	parseString(xml,function(err,result){
		if (err) {
			next();
		}
		console.log(result);
		var tmp = JSON.stringify(result, null, '-');
		//res.render('index', { data : tmp });
		res.type('application/json');
   		res.send(tmp);
	});

});

router.post('/',function(req, res, next) {
	//console.log(req.body);
	res.send(JSON.stringify(req.body));
	//res.type('application/json');

	// parser.parseString(req.body,function(err,result){
	// 	if (err) {
	// 		//next();
	// 		console.log(err);
	// 	}
	// 	console.log('result: '+JSON.stringify(result));
	// 	//var tmp = JSON.stringify(result, null, '-');
		
 //   		res.send('got response from: '+req.hostname+'<br>');
	// });
	//res.send('got response from: '+req.hostname+'\n');
	//res.json(req.body);
});

module.exports = router;
