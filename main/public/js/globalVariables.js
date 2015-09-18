var onFullscreen = false,
    video = document.createElement('video'),
    track =  document.createElement('track');
    

var textTrack, textTrackList;

var getFormatedTime = function(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - (hours * 3600)) / 60);
  var seconds = Math.round(seconds - (hours * 3600) - (minutes * 60));

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (hours > 0) {
    if (hours < 10) {
      hours = "0" + hours;
    }
    return hours + ':' + minutes + ':' + seconds
  }
  return minutes + ':' + seconds;
};

var updateClock = function(currentTime) {
  var formatedTime = getFormatedTime(currentTime);
  $("#time .current").text(formatedTime);
}

function voice(language, text) {
  speechSynthesis.cancel(); // destroying past queue
  var voices = window.speechSynthesis.getVoices();
  var msg = new SpeechSynthesisUtterance();

  msg.voiceURI = 'native';
  msg.volume = 1; // 0 to 1
  msg.rate = 1; // 0.1 to 10
  msg.pitch = 1; //0 to 2

  for(var i=0; i<voices.length; i++){
    if(language == voices[i].lang){
      msg.voice = voices[i];
    }
  }

  msg.text = String(text);
  msg.lang = String(language);
  speechSynthesis.speak(msg);

}
