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
        request({
            url: req.query.url,
            headers: {
                accept: req.headers.accept,
                authorization: req.headers.authorization,
                'Content-Type': 'application/json'
            }
        }).pipe(res);
    } catch (err) {
        res.send(
            'Error: please specify a URL (e.g. ?url=http://example.com/path)');
    }

    console.log('GET /', req.query);

});

var args = process.argv.splice(2);

var port = parseInt(args[0]);

if (isNaN(port)) {
    port = 3000;
}

// Start the server
app.listen(port);

console.log('Started app. Listening on port', port);
