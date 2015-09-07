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
    from = $("#from input").val()
    to = $("#to input").val()
    if text and from and to
      $.get "/translation",{expression:text,from:from,to:to}, (response) ->
        $('#audio a').click () ->
          voice(from,text) # Speaking
        googleImages = response.googleImages
        googleTranslation = response.googleTranslation
        fillDOM(googleImages,googleTranslation)
    else
      alert('fill all fields!')
    return

fillDOM = (googleImages,googleTranslation) ->
  $('#list-translation ol li , #list-translation *').remove()

  dictionary = googleTranslation.dict[0]
  sentences = googleTranslation.sentences[0]
  word = sentences.orig

  $('#translation h2').text(word)

  if(dictionary)
    terms = dictionary.terms
    terms.forEach (element,index) ->
      if(index==0)
        $('#list-translation').append("<ol></ol>");
      $("<li>"+element+"</li>").appendTo($("#list-translation ol"))
  else
    translation = sentences.trans
    $("#list-translation").append("<h4>"+translation+"</h4>")
