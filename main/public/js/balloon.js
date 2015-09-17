;
(function($, window, document) {
  var insertBalloon, insertImages, insertTranslation, tabs;

  tabs = $('#balloon').tabs();

  tabs.find(".ui-tabs-nav").sortable({
    axis: "x",
    stop: function() {
      tabs.tabs("refresh");
    }
  });

  $('#header li').click(function() {
    $(this).siblings().css({
      "background": "gray"
    });
    $(this).css({
      "background": "white"
    });
  });

  insertBalloon = function(text, from, to) {
    $.get("/translation", {
      expression: text,
      from: from,
      to: to
    }, function(response) {
      var googleImages, googleTranslation;
      $('#audio a').click(function(event) {
        event.preventDefault();
        return voice(from, text);
      });
      googleImages = response.googleImages;
      googleTranslation = response.googleTranslation;
      insertTranslation(googleTranslation);
      insertImages(googleImages);
    });
  };

  insertImages = function(pagesFromGoogleImages) {
    var listOfImgUrls, pages;
    $('img').remove();
    pages = pagesFromGoogleImages;
    listOfImgUrls = new Array();
    return pages.forEach(function(page) {
      return page.forEach(function(image) {
        var img;
        img = new Image();
        img.onload = function() {
          if (listOfImgUrls.indexOf(image.url) === -1) {
            listOfImgUrls.push(image.url);
            $('#images-content').append("<img src='" + image.url + "' height='100px'>");
          }
        };
        img.src = image.url;
      });
    });
  };

  insertTranslation = function(googleTranslation) {
    var dictionary, sentences, terms, translation, word;
    $('#list-translation ol li , #list-translation *').remove();
    dictionary = googleTranslation.dict;
    sentences = googleTranslation.sentences;
    word = sentences[0].orig;
    $('#translation h3').text(word);
    if (dictionary) {
      terms = dictionary[0].terms;
      return terms.forEach(function(element, index) {
        if (index === 0) {
          $('#list-translation').append("<ol></ol>");
        }
        $("<li>" + element + "</li>").appendTo($("#list-translation ol"));
      });
    } else {
      translation = sentences[0].trans;
      $("#list-translation").append("<p>" + translation + "</p>");
    }
  };
})(jQuery, window, document)
