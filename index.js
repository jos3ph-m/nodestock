// Stock Market Portfolio App

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

// iex API key pk_9b2a32369f974ebbaf24f6fdccbabc93
// create call api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_9b2a32369f974ebbaf24f6fdccbabc93', { json: true }, (err, res, body) => {
        if (err) {return console.log(err);}
        if (res.statusCode === 200){
            finishedAPI(body);
        };
    });
};


// Set Handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there this is other stuff."

// Set handlebar index GET route
app.get('/', function (req, res) {
    // use a callback function
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    }, "tsla");
});

// Set handlebar index POST route
app.post('/', function (req, res) {
    // use a callback function
    call_api(function(doneAPI) {
        // posted = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);
});

// create ab9out page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));