;
(function($, window, document, video, textTrack, track) {
  var acceptedSubtitles = ["text/vtt", "application/x-subrip"];
  var supportedVideos = ["video/mp4", "video/ogg", "video/webm"];

  var videoFile, subtitleFile, subtitleURL, videoURL;

  //verify if video and subtitle is loaded
  function verifier() {

    if (subtitleURL && videoURL) {
      track.src = subtitleURL;

      $('#cinema').prepend(video);
      $('video').append(track);
      $('.uploader').remove();
      $('#cinema').addClass("show-block");

      video = $('video')[0]

      video.play();

      textTrack = video.textTracks[0];
      textTrack.mode = "hidden";
      textTrackList = textTrack.cues;

      textTrack.oncuechange = function() {
        var currentSubtitle;
        currentCue = this.activeCues[0];
        $(".controls").css("visibility", "hidden");
        $('#subtitles h1').text("");
        if (currentCue) {
          currentSubtitle = currentCue.text;
          $(".controls").css("visibility", "visible");
          $('#subtitles h1').text(currentSubtitle);
        }
      };
    }

  }

  $("#dropRegion").on({
    dragenter: function(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    dragover: function(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    drop: function(event) {
      event.stopPropagation();
      event.preventDefault();

      var file = event.originalEvent.dataTransfer.files[0];
      var format = file.type;

      var isSupportedVideo = !!~supportedVideos.indexOf(format);
      var isSubtitle = !!~acceptedSubtitles.indexOf(format);

      if (isSupportedVideo) {

        if (!videoFile) {
          videoFile = file;
          if (!subtitleFile) {
            $("#dropRegion h1").text("Add the subtitle now")
          }
        } else {
          var r = confirm("Replace the added movie?");
          if (r == true) {
            videoFile = file;
          }
        }

        video.src = videoURL = window.URL.createObjectURL(videoFile);

        verifier();

      } else if (isSubtitle) {

        if (!subtitleFile) {

          if (!videoFile) {
            $("#dropRegion h1").text("Add the video now")
          }

          subtitleFile = file;
          if (format == "text/vtt") {
            subtitleURL = window.URL.createObjectURL(subtitleFile);
          } else {
            var reader = new FileReader();
            reader.onload = function(e) {
              $.get("/srt2vtt", {
                subtitle: reader.result,
                fileName: file.name
              }, function(vttURL) {
                subtitleURL = vttURL;
                verifier();
              }).fail(function(error) {
                alert(error);
              })
            }
            reader.readAsBinaryString(file);
          }

        } else {
          var r = confirm("Replace the added subtitle?");
          if (r == true) {
            subtitleFile = file;
          }
        }
      } else {
        alert(format + " isn't supported")
      }

    }

  });

})(jQuery, window, document, video, textTrack, track)
