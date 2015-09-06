var Async = require('async');
var google = require('./custom_modules/googleRefactored.js');

var requestedExpressionData = {
  expression: "hi john, do you know my cat?",
  from: "en",
  to: "es"
}

Async.parallel({
  googleVoiceUrl: function(callback) {
    callback(null, google.VoiceUrlComposer(requestedExpressionData));
  },
  googleImages: function(callback) {
    google.Images(requestedExpressionData).then(function(photos) {
      callback(null, photos);
    })
  },
  googleTranslation: function(callback) {
    google.Translator(requestedExpressionData).then(function(translation) {
      callback(null, translation);
    })
  }
}, function(err, results) {
  if (err) console.error(err);
  console.log("results", results);
});
