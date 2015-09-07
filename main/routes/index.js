var express = require('express');
var router = express.Router();
var google = require('../custom_modules/google');
var https = require('https');
var Async = require('async');

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index');
});

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
