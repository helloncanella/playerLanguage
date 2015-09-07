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
          console.log "aqui"
          voice(from,text) # Speaking
        googleImages = response.googleImages
        googleTranslation = response.googleTranslation
        insertTranslation(googleTranslation)
        insertImages(googleImages)
    else
      alert('fill all fields!')
    return

insertImages = (pagesFromGoogleImages) ->
  $('img').remove()
  pages = pagesFromGoogleImages
  listOfImgUrls = new Array()
  pages.forEach (page) ->
    page.forEach (image) ->
      console.log image
      img = new Image()
      img.onload = () ->
        if listOfImgUrls.indexOf(image.url)==-1 #just print new urls
          listOfImgUrls.push(image.url)
          $('#images-content').append("<div class='grid-item'><img src='"+image.url+"' height='100px'></div>")
      img.src = image.url


insertTranslation = (googleTranslation) ->
  $('#list-translation ol li , #list-translation *').remove()

  dictionary = googleTranslation.dict
  sentences = googleTranslation.sentences
  word = sentences[0].orig

  $('#translation h3').text(word)

  if(dictionary)
    terms = dictionary[0].terms
    terms.forEach (element,index) ->
      if(index==0)
        $('#list-translation').append("<ol></ol>");
      $("<li>"+element+"</li>").appendTo($("#list-translation ol"))
  else
    translation = sentences[0].trans
    $("#list-translation").append("<p>"+translation+"</p>")
