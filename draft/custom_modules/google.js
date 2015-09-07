var googleImages = require('google-images');
var querystring = require('querystring');
var https = require('https');
var concat = require('concat-stream');

module.exports = {


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

    var translation = new Promise(function(resolve, reject) {
      https.get(url, function(res) {
        res.pipe(concat(function(data) {
          translationData = data.toString();
          resolve(JSON.parse(translationData));
        }));
      });
    });

    return translation;
  },

  Images: function(data) {
    // request Images's URL from images.google.com
    var pageImages = new Array();
    var imagesOfpage;
    pages = new Array();

    numberOfPages = 3

    for(var i=1; i<=numberOfPages; i++){
      console.log(i);
      pages[i] = i;
    }

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
