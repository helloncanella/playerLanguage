var balloon, countClick, currentCue, lastClick, lastPress, mouseXPosition, subtitles, textTrack, textTrackList, video;

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

lastClick = void 0;

$('.controls').on("click", function(event) {
  var currentClick, indexCurrentCue, nextCue, previous, previousCue;
  previous = $("i.previous")[0];
  currentCue = textTrack.activeCues[0];
  indexCurrentCue = currentCue.id - 1;
  if (currentCue) {
    if (this === previous) {
      currentClick = Date.now();
      if ((currentClick - lastClick) > 1000) {
        console.log("one click", currentClick, lastClick);
        video.currentTime = currentCue.startTime;
      } else {
        previousCue = textTrackList[indexCurrentCue - 1];
        if (!previousCue) {
          nextCue = textTrackList[previousCue - 2];
        }
        video.currentTime = previousCue.startTime;
      }
      lastClick = currentClick;
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

lastPress = void 0;

$(window).on("keydown", function(event) {
  var aheadLittleBit, backLittleBit, currentPress, indexCurrentCue, key, next, nextCue, pauseAndPlay, previous, previousCue;
  key = event.keyCode;
  previous = 37;
  next = 39;
  pauseAndPlay = 32;
  backLittleBit = 74;
  aheadLittleBit = 76;
  currentCue = textTrack.activeCues[0];
  if (currentCue) {
    indexCurrentCue = currentCue.id - 1;
  }
  switch (key) {
    case previous:
      currentPress = Date.now();
      if ((currentPress - lastPress) > 1000) {
        console.log("one click", currentPress, lastPress);
        video.currentTime = currentCue.startTime;
      } else {
        previousCue = textTrackList[indexCurrentCue - 1];
        if (!previousCue) {
          nextCue = textTrackList[previousCue - 2];
        }
        video.currentTime = previousCue.startTime;
      }
      lastPress = currentPress;
      break;
    case pauseAndPlay:
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      break;
    case next:
      nextCue = textTrackList[indexCurrentCue + 1];
      if (!nextCue) {
        nextCue = textTrackList[indexCurrentCue + 2];
      }
      video.currentTime = nextCue.startTime;
      break;
    case backLittleBit:
      console.log(video.currentTime);
      video.currentTime -= 5;
      break;
    case aheadLittleBit:
      console.log(video.currentTime);
      video.currentTime += 5;
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
