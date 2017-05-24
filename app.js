var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xmlparser = require('express-xml-bodyparser');
var multiparty = require('multiparty');

//var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xmlparser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
app.post('/',function(req,res,next){
	var count = 0;
	var form = new multiparty.Form();
	 
	// Errors may be emitted 
	// Note that if you are listening to 'part' events, the same error may be 
	// emitted from the `form` and the `part`. 
	form.on('error', function(err) {
	  console.log('Error parsing form: ' + err.stack);
	});
	 
	// Parts are emitted when parsing the form 
	form.on('part', function(part) {
	  // You *must* act on the part by reading it 
	  // NOTE: if you want to ignore it, just call "part.resume()" 
	 
	  if (!part.filename) {
	    // filename is not defined when this is a field and not a file 
	    console.log('got field named ' + part.name);
	    // ignore field's content 
	    part.resume();
	  }
	 
	  if (part.filename) {
	    // filename is defined when this is a file 
	    count++;
	    console.log('got file named ' + part.name);
	    // ignore file's content here 
	    part.resume();
	  }
	 
	  part.on('error', function(err) {
	    // decide what to do 
	    res.send('got an error! ',err);
	  });

	});
 
// Close emitted after form parsed 
	form.on('close', function() {
	  console.log('Upload completed!');
	  res.setHeader('text/plain');
	  res.end('Received ' + count + ' files');
	});
	 
	// Parse req 
	form.parse(req);
	res.send('done!');
	});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
