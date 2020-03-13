
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;


let app = express();


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Origin', "https://webtorrent.io/torrents");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Using Node.js



//your-app-name.herokuapp.com

//period-time : it's time you want to wakeup your heroku app

//Start auto wakeup



/*app.get('/with-cors', cors(), (req, res, next) => {
    res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
})*/

/*app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
});*/

/*app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
});*/

/*app.use(function (req, res, next) {

    //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Origin', "https://webthor2.herokuapp.com");
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);


    next();
});*/

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

