var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var xmlparser = require('express-xml-bodyparser');
//var sql = Promise.promisifyAll(require('mssql'));
var sql = require('mssql');
var config = require('../config/config.js');


/* GET home page. */
router.get('/', function(req, res, next) { //testing purposes
	var xml = "<order><orderrows><orderrow>1</orderrow><orderrow>2</orderrow></orderrows></order>";
	parser.parseString(xml,function(err,result){
		if (err) {
			console.log(err);
		}
		res.type('application/json')
			.status(200)
			.send(JSON.stringify(result, null, '-'));
	});

});

router.post('/',xmlparser({trim: false, explicitArray: false}), function(req, res, next) {
	// req.body now holds xml data
	console.log(req.get('Content-Type'));
	var timestamp = new Date();
	if (req.get('Content-Type')!=='application/xml' || !req.body) {
		res.type('text/plain')
			.status(400)
			.send(timestamp.toLocaleString()+' : ouch! header \'Content-Type\' not \'application/xml\' but \''+req.get('Content-Type')+'\'');
	}
	else {
		console.log(timestamp.toLocaleString()+' : yeehaw! got a nice wee xml from '+req.body.order.customercode+' :-)');
		// process and insert xml next
		 
		// need a working mssql DB to connect to... 
		// => 	pull config out of code
		//		for maintainability
		/*
		var SpName = '';
		sql.connect(config)
		.then(pool => {	
			return pool.request()
			    .output('output_parameter', sql.String, SpName)
			    .query('select value from settings where id = <id>') // get SP to insert xmls, customer specific
			})
		.then(result => {
			    console.dir(result)
		})
		.then(pool => {

		    return pool.request()
		    .input('input_parameter', sql.Xml, req.body)
		    //.output('output_parameter', sql.VarChar(50))
		    .execute(SpName)
		})
		.then(result => {
			res.type('text/plain')
				.status(400)
				.send(timestamp.toLocaleString()+' : yeehaw! xml successfully inserted!\n'+result);
		    console.dir(result)
		})
		.catch(err => {
		    // ... error checks 
		    console.log(err);
		});
		 
		sql.on('error', err => {
		    // ... error handler 
		    res.type('text/plain')
				.status(400)
				.send(timestamp.toLocaleString()+' : ouch! we got an error while inserting the xml: '+err);
		});
		*/

		res.type('text/plain')
			.status(200)
			.send('yeehaw! all done:\n'+JSON.stringify(req.body,null, '-'));
		}
	
});

module.exports = router;
