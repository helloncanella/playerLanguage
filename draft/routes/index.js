var express = require('express');
var router = express.Router();
var google = require('../custom_modules/google');
var https = require('https');
var Async = require('async');
var srt2vtt = require('srt-to-vtt');
var fs = require('fs');
var uploadManager = require('./uploadManager')(router);
var ffmpeg = require('fluent-ffmpeg');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Balloon'
  });
});

router.get('/srt2vtt', function(req, res){
  console.log("aqui");
  fs.createReadStream("E:/OneDrive/immersion/draft/public/videos/The.Good.the.Bad.and.the.Ugly.1966.1080p.BrRip.x264.YIFY.srt")
    .pipe(srt2vtt())
    .pipe(fs.createWriteStream('teste.vtt'))
})

router.get('/ffmpeg', function(req, res){
  console.log("aqui")
  ffmpeg('E:/OneDrive/immersion/draft/public/videos/The.Big.Bang.Theory.S05E08.HDTV.XviD-ASAP.avi')
  .videoCodec('libx264')
  .audioCodec('libmp3lame')
  .on('progress', function(progress) {
    console.log('Processing: ' + progress.percent + '% done');
  })
  .on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  })
  .on('end', function() {
    console.log('Processing finished !');
  })
  .save('E:/OneDrive/immersion/draft/public/videos/aqui.mp4');
})

router.get('/translation', function(req, res) {
  requestedExpressionData = req.query;
  Async.parallel({
    googleImages: function(callback) {
      google.Images(requestedExpressionData).then(function(photos) {
        callback(null, photos);
      });
    },
    googleTranslation: function(callback) {
      google.Translator(requestedExpressionData).then(function(translation) {
        callback(null, translation);
      });
    }
  }, function(err, results) {
    if (err) console.error(err);
    res.send(results);
  });
});

module.exports = router;
