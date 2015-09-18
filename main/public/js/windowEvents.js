;
(function($, window, document, onFullscreen, video, textTrack, textTrackList) {
  var lastMovement;

  //window's events
  $(window).on({
    load: function(event) {
      onFullscreen = false;
    },

    click: function(event) {
      $("#volume-control").removeClass('show-flex');
    },

    showcontrols: function(event) {
      lastMovement = Date.now();

      $('body').css({
        "cursor": "default"
      });
      $('#controls').css({
        "visibility": "visible"
      })

      setTimeout(function() {
        var currentMovement = Date.now()
        var duration = currentMovement - lastMovement

        if (duration > 2000) {
          $(this).trigger("removecontrols");
        }

      }, 2500)
    },

    removecontrols: function(event) {
      $('body').css({
        "cursor": "none"
      });
      $('#controls').css({
        "visibility": "hidden"
      })
    },

    mousemove: function(event) {
      $(this).trigger('showcontrols');
    },

    mousedown: function(event) {
      $(this).trigger('showcontrols');
    },

    mousestop: function(event) {
      $(this).trigger("removecontrols")
    },

    keydown: function(event) {
      var lastPress, currentPress, indexCurrentCue, nextCue, previousCue;

      var textTrack = video.textTracks[0];
          textTrack.mode = "hidden";
          textTrackList = textTrack.cues;
          currentCue = textTrack.activeCues[0];

      var pressedKey = event.keyCode,
          previous = 37,
          next = 39,
          pauseAndPlay = 32,
          backLittleBit = 74,
          aheadLittleBit = 76,
          f11 = 122,
          esc = 27;

      if (currentCue) {
        indexCurrentCue = currentCue.id - 1;
      };

      switch (pressedKey) {
        case f11:
          event.preventDefault();
          if (onFullscreen) {
            $(this).trigger("disablefullscreen");
          } else {
            $(this).trigger("enablefullscreen");
          }
          break;
        case esc:
          event.preventDefault();
          $(this).trigger("disablefullscreen")
          break;
        case previous:
          currentPress = Date.now();
          if ((currentPress - lastPress) > 1000) {
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
          video.currentTime -= 5;
          break;
        case aheadLittleBit:
          video.currentTime += 5;
      }
    },

    enablefullscreen: function(event) {
      onFullscreen = true;
      $('#fullScreen i').removeClass('fa-expand')
        .addClass('fa-compress');
      $('body')[0].webkitRequestFullscreen();
    },

    disablefullscreen: function(event) {
      onFullscreen = false;
      $('#fullScreen i').removeClass('fa-compress')
        .addClass('fa-expand');
      document.webkitExitFullscreen();
    }

  })
})(jQuery, window, document, onFullscreen, video, textTrack, textTrackList)
