const express = require('express');
const path = require('path');
const cors = require('cors');
const request = require('request');

const PORT = process.env.PORT || 5000;


let app = express();


app.use(cors());

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
});

/*app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
});*/

app.use(function (req, res, next) {

    //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Origin', "https://webthor2.herokuapp.com");
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);



    next();
});

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));



request.get('/torrents')
    .expect('Access-Control-Allow-Origin', '*')
    .expect('x-request-url', 'https://webtorrent.io/torrents')
    .expect(200, 'RESPONSE FROM EXAMPLE.COM', done);


app.get('/torrents', (req, res) => {
    request(
        { url: 'https://webtorrent.io/torrents' },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }

            res.json(JSON.parse(body));
        }
    )
});