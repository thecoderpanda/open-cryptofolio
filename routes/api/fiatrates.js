var express = require('express');
var router = express.Router();

// setup node-rest-client
var Client = require('node-rest-client').Client;
var client = new Client();

/* This route receives HTTP GET request from client to return historical data on coin performance,
 * then makes HTTP GET request to CoinCap API and responds to client with received response
 * (JSON Object in the following format: {"market_cap":[*Array of Arrays (chart data)*],
 *                                        "price":[*Array of Arrays (chart data)*]} )            */

// listen for request
router.get('/', function(req, res) {
    console.log('received user request');
    // make HTTP GET request to external API
    client.get("https://api.fixer.io/latest?base=USD", function (data) {
        // parsed response body as js object
        console.log('sending data:  ' + data);

        // send received object to client
        res.send(data);
        console.log('success!');
    }).on('error', function (err) {
        console.log('something went wrong on the request', err.request.options);
    });

// handling client error events
    client.on('error', function (err) {
        console.error('Something went wrong on the client', err);
    });
});

module.exports = router;
