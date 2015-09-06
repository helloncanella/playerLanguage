tabs = $('#balloon').tabs()
tabs.find(".ui-tabs-nav").sortable
  axis:"x"
  stop: () ->
    tabs.tabs("refresh")

googleImages = undefined
googleTranslation = undefined

$(window).keypress (event) ->
  if event.keyCode == 13
    text = $("#text input").val()
    console.log text
    from = $("#from input").val()
    to = $("#to input").val()
    if text and from and to
      $.get "/translation",{expression:text,from:from,to:to}, (response) ->
        $('#audio a').click () ->
          voice(from,text) # Speaking
        googleImages = response.googleImages
        googleTranslation = response.googleTranslation
        fillDOM(googleImages,googleTranslation)
        console.log JSON.stringify(googleTranslation)
    else
      alert('fill all fields!')
    return

fillDOM = (googleImages,googleTranslation) ->
  dictionary = googleTranslation.dict
  sentences = googleTranslation.sentences
  $('#list-translation ol li , #list-translation *').remove()
  if(dictionary)
    terms = dictionary[0].terms
    terms.forEach (element,index) ->
      if(index==0)
        $('#list-translation').append("<ol></ol>");
      $("<li>"+element+"</li>").appendTo($("#list-translation ol"))
    console.log "dictionary",terms
  else
    translation = sentences[0].trans
    $("#list-translation").append("<h3>"+translation+"</h3>")
    console.log "translation", translation


  console.log {googleImages, googleTranslation}
