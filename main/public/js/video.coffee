$(window).on "resize load", ()->
  $("#banner").css
    "width": $('video').width()
    "height": $('video').height()*0.2
    "bottom": $('video').height()*0.30
  $(".controls").css("visibility","hidden")
  return

currentCue = undefined
video = $("video")[0]
subtitles =$("#subtitles h1")

balloon = $('#balloon')
mouseXPosition =
  start: undefined
  end: undefined

$("video").click () ->
  balloon.css
    "display":"none"

subtitles.mousedown (event) ->
  mouseXPosition.start = event.pageX

subtitles.mouseup (event) ->
  mouseXPosition.end = event.pageX
  averageMouseXPoint = (mouseXPosition.end + mouseXPosition.start)/2
  selectedText = window.getSelection().toString()
  if selectedText
    from="en-US"
    to = "pt-BR"
    insertBalloon(selectedText,from,to)
    balloon.css
      "display":"flex"
      "left": averageMouseXPoint - $('video').offset().left
      "top": $("#banner").position().top
      "transform": "translate(-50%,-100%)"

    videoPosition = $('video').position()
    ballonPosition = balloon.position()


    videoPosition.right = videoPosition.left+ $('video').width()
    ballonPosition.right = ballonPosition.left+ $('#balloon').width()

    if(videoPosition.left>ballonPosition.left)
      balloon.css
        "transform": 'translate(0,-100%)'
        "left": '5px'
    if(videoPosition.right<ballonPosition.right)
      console.log "right"
      balloon.css
        "transform": "translate(-75%,-100%)"
        "right": '5px'

  return

textTrack = video.textTracks[0];
textTrack.mode = "hidden"
textTrackList = textTrack.cues
countClick = 0

lastClick = undefined
$('.controls').on "click", (event)->
  previous = $("i.previous")[0]
  currentCue = textTrack.activeCues[0]
  indexCurrentCue = currentCue.id - 1
  if currentCue
    if this is previous
      currentClick = Date.now()
      if((currentClick-lastClick)>1000)
        console.log "one click", currentClick, lastClick
        video.currentTime = currentCue.startTime
      else
        previousCue = textTrackList[indexCurrentCue-1]
        if !previousCue
          nextCue = textTrackList[previousCue-2]
        video.currentTime = previousCue.startTime
      lastClick = currentClick
    else
      nextCue = textTrackList[indexCurrentCue+1]
      if !nextCue
        nextCue = textTrackList[indexCurrentCue+2]
      video.currentTime = nextCue.startTime
    video.play()


lastPress = undefined
$(window).on "keydown", (event)->
  key = event.keyCode
  previous = 37 #left-arrow
  next = 39 #right-arrow
  pauseAndPlay = 32 #space
  backLittleBit = 74 # j
  aheadLittleBit = 76 # l
  currentCue = textTrack.activeCues[0]
  if currentCue
    indexCurrentCue = currentCue.id - 1

  switch key
    when previous
      currentPress = Date.now()
      if((currentPress-lastPress)>1000)
        console.log "one click", currentPress, lastPress
        video.currentTime = currentCue.startTime
      else
        previousCue = textTrackList[indexCurrentCue-1]
        if !previousCue
          nextCue = textTrackList[previousCue-2]
        video.currentTime = previousCue.startTime
      lastPress = currentPress
    when pauseAndPlay
      if(video.paused)
        video.play()
      else
        video.pause()
    when next
      nextCue = textTrackList[indexCurrentCue+1]
      if !nextCue
        nextCue = textTrackList[indexCurrentCue+2]
      video.currentTime = nextCue.startTime
    when backLittleBit
      console.log video.currentTime
      video.currentTime-=5
    when aheadLittleBit
      console.log video.currentTime
      video.currentTime+=5
  return

$("#banner, #balloon").mouseover () ->
  video.pause()
  $('#banner,#subtitles,.controls').addClass('pausedVideo')
$("#banner").mouseout () ->
  $('#banner,#subtitles,.controls').removeClass('pausedVideo')
  video.play()

textTrack.oncuechange = () ->
  currentCue = this.activeCues[0]
  $(".controls").css("visibility","hidden")
  $('#subtitles h1').text("")
  if currentCue
    currentSubtitle = currentCue.text
    $(".controls").css("visibility","visible")
    $('#subtitles h1').text(currentSubtitle)