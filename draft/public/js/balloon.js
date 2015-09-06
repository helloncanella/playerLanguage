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
    console.log(text);
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
        fillDOM(googleImages, googleTranslation);
        return console.log(JSON.stringify(googleTranslation));
      });
    } else {
      alert('fill all fields!');
    }
  }
});

fillDOM = function(googleImages, googleTranslation) {
  var dictionary, sentences, terms, translation;
  dictionary = googleTranslation.dict;
  sentences = googleTranslation.sentences;
  $('#list-translation ol li , #list-translation *').remove();
  if (dictionary) {
    terms = dictionary[0].terms;
    terms.forEach(function(element, index) {
      if (index === 0) {
        $('#list-translation').append("<ol></ol>");
      }
      return $("<li>" + element + "</li>").appendTo($("#list-translation ol"));
    });
    console.log("dictionary", terms);
  } else {
    translation = sentences[0].trans;
    $("#list-translation").append("<h3>" + translation + "</h3>");
    console.log("translation", translation);
  }
  return console.log({
    googleImages: googleImages,
    googleTranslation: googleTranslation
  });
};
