var balloon, countClick, currentCue, mouseXPosition, subtitles, textTrack, textTrackList, video;

$(window).on("resize load", function() {
  $("#banner").css({
    "width": $('video').width(),
    "height": $('video').height() * 0.2,
    "bottom": $('video').height() * 0.30
  });
  $(".controls").css("visibility", "hidden");
});

currentCue = void 0;

video = $("video")[0];

subtitles = $("#subtitles h1");

balloon = $('#balloon');

mouseXPosition = {
  start: void 0,
  end: void 0
};

$("video").click(function() {
  return balloon.css({
    "display": "none"
  });
});

subtitles.mousedown(function(event) {
  return mouseXPosition.start = event.pageX;
});

subtitles.mouseup(function(event) {
  var averageMouseXPoint, ballonPosition, from, selectedText, to, videoPosition;
  mouseXPosition.end = event.pageX;
  averageMouseXPoint = (mouseXPosition.end + mouseXPosition.start) / 2;
  selectedText = window.getSelection().toString();
  if (selectedText) {
    from = "en-US";
    to = "pt-BR";
    insertBalloon(selectedText, from, to);
    balloon.css({
      "display": "flex",
      "left": averageMouseXPoint - $('video').offset().left,
      "top": $("#banner").position().top,
      "transform": "translate(-50%,-100%)"
    });
    videoPosition = $('video').position();
    ballonPosition = balloon.position();
    videoPosition.right = videoPosition.left + $('video').width();
    ballonPosition.right = ballonPosition.left + $('#balloon').width();
    if (videoPosition.left > ballonPosition.left) {
      balloon.css({
        "transform": 'translate(0,-100%)',
        "left": '5px'
      });
    }
    if (videoPosition.right < ballonPosition.right) {
      console.log("right");
      balloon.css({
        "transform": "translate(-75%,-100%)",
        "right": '5px'
      });
    }
  }
});

textTrack = video.textTracks[0];

textTrack.mode = "hidden";

textTrackList = textTrack.cues;

countClick = 0;

$('.controls').on("click", function(event) {
  var indexCurrentCue, nextCue, previous;
  previous = $("i.previous")[0];
  currentCue = textTrack.activeCues[0];
  indexCurrentCue = currentCue.id - 1;
  if (currentCue) {
    if (this === previous) {
      video.currentTime = currentCue.startTime;
      countClick++;
    } else {
      nextCue = textTrackList[indexCurrentCue + 1];
      if (!nextCue) {
        nextCue = textTrackList[indexCurrentCue + 2];
      }
      video.currentTime = nextCue.startTime;
    }
    return video.play();
  }
});

$(window).on("keydown", function(event) {
  var indexCurrentCue, key, next, nextCue, previous;
  key = event.keyCode;
  previous = 37;
  next = 39;
  currentCue = textTrack.activeCues[0];
  indexCurrentCue = currentCue.id - 1;
  if (currentCue) {
    switch (key) {
      case previous:
        video.currentTime = currentCue.startTime;
        return countClick++;
      case next:
        nextCue = textTrackList[indexCurrentCue + 1];
        if (!nextCue) {
          nextCue = textTrackList[indexCurrentCue + 2];
        }
        video.currentTime = nextCue.startTime;
    }
  }
});

$("#banner, #balloon").mouseover(function() {
  video.pause();
  return $('#banner,#subtitles,.controls').addClass('pausedVideo');
});

$("#banner").mouseout(function() {
  $('#banner,#subtitles,.controls').removeClass('pausedVideo');
  return video.play();
});

textTrack.oncuechange = function() {
  var currentSubtitle;
  currentCue = this.activeCues[0];
  $(".controls").css("visibility", "hidden");
  $('#subtitles h1').text("");
  if (currentCue) {
    currentSubtitle = currentCue.text;
    $(".controls").css("visibility", "visible");
    return $('#subtitles h1').text(currentSubtitle);
  }
};
