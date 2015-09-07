var countClick, currentCue, subtitles, textTrack, textTrackList, video;

$(function() {
  return $('#balloon').tabs({
    event: "mouseover"
  });
});

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

subtitles.mouseup(function() {
  var selectedText;
  selectedText = window.getSelection().toString();
  if (selectedText) {
    insertBalloon(selectedText, from, to);
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

$("#banner").mouseover(function() {
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
