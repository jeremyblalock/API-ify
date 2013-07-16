var express = require('express');
var request = require('request');

// Create the app
var app = express();

app.use(express.methodOverride());
 
// CORS middleware
// 
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

// Routes
app.get('/', function(req, res) {

    res.set('Content-Type', 'application/json');

    try {
        request.get(req.query.url).pipe(res);
    } catch (err) {
        res.send(
            'Error: please specify a URL (e.g. ?url=http://example.com/path)');
    }

    console.log('GET /', req.query);

});

// Start the server
app.listen(3000);

console.log('Started app. Listening on port 3000');
