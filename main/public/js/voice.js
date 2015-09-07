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
