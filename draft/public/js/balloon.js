var tabs;

tabs = $('#balloon').tabs();

tabs.find(".ui-tabs-nav").sortable({
  axis: "x",
  stop: function() {
    return tabs.tabs("refresh");
  }
});

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
        var googleImages, googleTranslation, googleVoiceUrl;
        googleVoiceUrl = response.googleVoiceUrl;
        $('#audio a').click(function() {
          return voice(from, text);
        });
        googleImages = response.googleImages;
        return googleTranslation = response.googleTranslation;
      });
    } else {
      alert('fill all fields!');
    }
  }
});
