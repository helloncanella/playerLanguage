subtitles.mouseup () ->
  selectedText = window.getSelection().toString()
  if selectedText
    $.get "/translation",{expression:selectedText,from:"en",to:"es"}, (response) ->
      googleVoiceUrl = response.googleVoiceUrl
      googleImages = response.googleImages
      googleTranslation = response.googleTranslation
      return
