var googleImages = require('google-images');
var querystring = require('querystring');
var https = require('https');

module.exports = {

  VoiceUrlComposer: function(data) {
    //composition audio of word's url
    host = "https://translate.google.com/translate_tts?";
    queryObject = {
      ie: "UTF-8",
      client: "tw-ob",
      q: data.expression,
      tl: data.from,
      total: 1,
      idx: 0,
      textlen: 2
    }
    query = querystring.stringify(queryObject);
    url = host + query

    return url
  },

  Translator: function(data) {
    //raw translation from translate.google.com
    var translationData;
    queryObject = {
      client: "gtx",
      sl: "auto",
      tl: data.to,
      hl: data.from,
      dt: ["t", "bd"],
      dj: 1,
      source: "bubble",
      tk: 522649 | 383517,
      q: data.expression
    }

    query = querystring.stringify(queryObject);
    options = {
      hostname: 'https://translate.googleapis.com/translate_a',
      path: '/single?' + query
    }

    url = 'https://translate.googleapis.com/translate_a/single?' + query

    var translation = new Promise(function(resolve,reject){
      https.get(url, function(res) {
        res.on('data', function(data) {
          translationData = data.toString()
          resolve(translationData);
        })
      });
    });

    return translation;
  },

  Images: function(data) {
    // request Images's URL from images.google.com
    var pageImages = new Array();
    var imagesOfpage;
    pages = [1, 2, 3];

    var searchOfPhotos = new Promise(function(resolve, reject) {
      for (var i = 0; i < pages.length; i++) {
        googleImages.search({
          'for': data.expression,
          'page': i,
          callback: function(err, images) {
            pageImages.push(images);
            if (pageImages.length === pages.length) {
              resolve(pageImages);
            }
          }
        })
      }
    });

    return searchOfPhotos;

  }
}
