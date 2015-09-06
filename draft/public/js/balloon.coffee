tabs = $('#balloon').tabs()
tabs.find(".ui-tabs-nav").sortable
  axis:"x"
  stop: () ->
    tabs.tabs("refresh")

$(window).keypress (event) ->
  if event.keyCode == 13
    text = $("#text input").val()
    console.log text
    from = $("#from input").val()
    to  = $("#to input").val()
    if text and from and to
      $.get "/translation",{expression:text,from:from,to:to}, (response) ->
        googleVoiceUrl = response.googleVoiceUrl
        $('#audio a').click () ->
          voice(from,text)
        googleImages = response.googleImages
        googleTranslation = response.googleTranslation
    else
      alert('fill all fields!')
    return
