var fillDOM, googleImages, googleTranslation, tabs;

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
          return voice(from, text);
        });
        googleImages = response.googleImages;
        googleTranslation = response.googleTranslation;
        return fillDOM(googleImages, googleTranslation);
      });
    } else {
      alert('fill all fields!');
    }
  }
});

fillDOM = function(googleImages, googleTranslation) {
  var dictionary, sentences, terms, translation, word;
  $('#list-translation ol li , #list-translation *').remove();
  dictionary = googleTranslation.dict[0];
  sentences = googleTranslation.sentences[0];
  word = sentences.orig;
  $('#translation h2').text(word);
  if (dictionary) {
    terms = dictionary.terms;
    return terms.forEach(function(element, index) {
      if (index === 0) {
        $('#list-translation').append("<ol></ol>");
      }
      return $("<li>" + element + "</li>").appendTo($("#list-translation ol"));
    });
  } else {
    translation = sentences.trans;
    return $("#list-translation").append("<h4>" + translation + "</h4>");
  }
};
