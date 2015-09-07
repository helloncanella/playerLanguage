var googleImages, googleTranslation, insertImages, insertTranslation, tabs;

tabs = $('#balloon').tabs();

tabs.find(".ui-tabs-nav").sortable({
  axis: "x",
  stop: function() {
    return tabs.tabs("refresh");
  }
});

googleImages = void 0;

googleTranslation = void 0;

$(window).keypress(function(event) {
  var from, text, to;
  if (event.keyCode === 13) {
    text = $("#text input").val();
    from = $("#from input").val();
    to = $("#to input").val();
    if (text && from && to) {
      $.get("/translation", {
        expression: text,
        from: from,
        to: to
      }, function(response) {
        $('#audio a').click(function() {
          console.log("aqui");
          return voice(from, text);
        });
        googleImages = response.googleImages;
        googleTranslation = response.googleTranslation;
        insertTranslation(googleTranslation);
        return insertImages(googleImages);
      });
    } else {
      alert('fill all fields!');
    }
  }
});

insertImages = function(pagesFromGoogleImages) {
  var listOfImgUrls, pages;
  $('img').remove();
  pages = pagesFromGoogleImages;
  listOfImgUrls = new Array();
  return pages.forEach(function(page) {
    return page.forEach(function(image) {
      var img;
      console.log(image);
      img = new Image();
      img.onload = function() {
        if (listOfImgUrls.indexOf(image.url) === -1) {
          listOfImgUrls.push(image.url);
          return $('#images-content').append("<div class='grid-item'><img src='" + image.url + "' height='100px'></div>");
        }
      };
      return img.src = image.url;
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
      return $("<li>" + element + "</li>").appendTo($("#list-translation ol"));
    });
  } else {
    translation = sentences[0].trans;
    return $("#list-translation").append("<p>" + translation + "</p>");
  }
};
