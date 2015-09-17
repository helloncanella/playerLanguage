;
(function($, window, document,onFullscreen) {
  $(function() {

    //click video/pause button;
    var video = $('video')[0];

    //update clock
    video.onloadstart = function() {

      //change icon on pause or play
      this.onpause = function() {
        $('#playPause i').removeClass('fa-pause')
          .addClass('fa-play');
      }

      this.onplay = function() {
        $('#playPause i').removeClass('fa-play')
          .addClass('fa-pause');

      }

      this.ontimeupdate = function() {
        var currentTime = video.currentTime;

        if (!duration) {
          var duration = video.duration;
          var durationFormatted = getFormatedTime(duration);
          $("#time .duration").text(" / " + durationFormatted);
        }

        //update clock
        updateClock(currentTime);

        //update slider
        var percentage = 100 * currentTime / duration;
        $("#progress").slider("value", percentage);

      }

    }


    $("#progress").slider({
      range: "min",
      slide: function(event, ui) {
        //update movie
        var duration = video.duration;
        var sliderPercentage = ui.value / 100;
        video.currentTime = sliderPercentage * duration;
      }
    });

    $("#volume-control .slider").slider({
      range: "min",
      value: "60",
      orientation: "vertical",
      slide: function(event, ui) {
        volume = video.volume = ui.value / 100

        var selector = $('#volume i');

        if (volume == 0) {
          selector.removeClass('fa-volume-up')
            .addClass('fa-volume-off');
        } else {
          selector.removeClass('fa-volume-off')
            .addClass('fa-volume-up');
        }
      },
    });

    $('#playPause').click(function(e) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    //volume
    $("#volume").click(function(event) {
      event.preventDefault();
      event.stopPropagation();

      iconPosition = {
        left: $('#volume').position().left,
        right: $('#volume').position().left + $('#volume').width(),
        top: $('#volume').position().top,
        bottom: $('#volume').position().top + $('#volume').height()
      }

      averageX = (iconPosition.left + iconPosition.right) / 2;

      $("#volume-control").toggleClass('show-flex');
      $('#volume-control').css({
        "left": averageX,
        "transform": "translate(-50%,0)",
        "bottom": "5vh"
      })
    });

    $('#fullScreen').on({
      click: function(event) {
        if (onFullscreen) {
          $(window).trigger("disablefullscreen");
        } else {
          $(window).trigger("enablefullscreen");
        }
      },
    })
  })
})(jQuery, window, document, onFullscreen)
