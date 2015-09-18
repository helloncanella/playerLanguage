;
(function($, window, document, video, textTrack, textTrackList) {

  var currentCue, lastClick, mouseXPosition;

  var subtitles = $("#subtitles h1"),
      balloon = $('#balloon');

  video.click(function() {
    balloon.css({
      "display": "none"
    });
  });


  subtitles.on({
    mousedown: function(event) {
      mouseXPosition.start = event.pageX;
    },
    mouseup: function(event) {
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
          balloon.css({
            "transform": "translate(-75%,-100%)",
            "right": '5px'
          });
        }
      }
    }
  });

  $('.controls').on("click", function(event) {
    var currentClick, nextCue, previousCue;

    var previous = $("i.previous")[0],
      currentCue = textTrack.activeCues[0],
      indexCurrentCue = currentCue.id - 1;

    if (currentCue) {
      if (this === previous) {
        currentClick = Date.now();
        if ((currentClick - lastClick) > 1000) {
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
      video.play();
    }
  });

  $("#banner, #balloon").mouseover(function() {
    video.pause();
    $('#banner,#subtitles,.controls').addClass('pausedVideo');
  });

  $("#banner").mouseout(function() {
    $('#banner,#subtitles,.controls').removeClass('pausedVideo');
    video.play();
  });

})(jQuery, window, document, video, textTrack)
