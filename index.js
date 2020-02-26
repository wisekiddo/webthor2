
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

var WebTorrent = require('webtorrent')

var client = new WebTorrent()

var torrentId = 'magnet:?xt=urn:btih:9EFF2A521DD4F44B057A0C0A550C90A8243D3F17&tr=udp://explodie.org:6969&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.empire-js.us:1337&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.opentrackr.org:1337&tr=wss://tracker.btorrent.xyz&tr=wss://tracker.fastcast.nz&tr=wss://tracker.openwebtorrent.com&ws=https://webtorrent.io/torrents/&xs=https://webtorrent.io/torrents&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://glotorrents.pw:6969/announce&tr=udp://tracker.opentrackr.org:1337/announce&tr=udp://torrent.gresille.org:80/announce&tr=udp://p4p.arenabg.com:1337&tr=udp://tracker.leechers-paradise.org:6969';

client.add(torrentId, function (torrent) {
    // Torrents can contain many files. Let's use the .mp4 file
    var file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4')
    });

    // Display the file by adding it to the DOM.
    // Supports video, audio, image files, and more!
   // file.appendTo('body')

    torrent.on('download', function (bytes) {
        console.log('just downloaded: ' + bytes)
        console.log('total downloaded: ' + torrent.downloaded)
        console.log('download speed: ' + torrent.downloadSpeed)
        console.log('progress: ' + torrent.progress)
        console.log('progress: ' + file.path);
        console.log('progress: ' + file.name)

       /* file.getBlobURL(function (err, url) {
            if (err) throw err
            console.log('url: ' + url)
        })*/
    });



});


app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

