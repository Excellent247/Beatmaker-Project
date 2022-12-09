document.title = "My Beatmaker Project";

class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = './sounds/kick-classic.wav';
    this.currentSnare = './sounds/snare-acoustic01.wav';
    this.currentHihat = './sounds/hihat-acoustic01.wav';
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider')
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if bars is active
      if (bar.classList.contains("active")) {
        //check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying){
        this.isPlaying = setInterval(() => {
            this.repeat();
          }, interval);
    } else{
        clearInterval(this.isPlaying);
        this.isPlaying =null;
    }
  }
  updateBtn(){
    if (!this.isPlaying){
        this.playBtn.innerText = "Stop";
        this.playBtn.classList.add('active');
    } else{
        this.playBtn.innerText = "Play";
        this.playBtn.classList.remove('active');
    }
  }
  changeSound(e){
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch(selectionName){
        case "kick-select":
            this.kickAudio.src = selectionValue;
            break;
        case "snare-select":
            this.snareAudio.src = selectionValue;
            break;
        case "hihat-select":
            this.hihatAudio.src = selectionValue;
            break;
    }
  }
  mute(e){
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")){
        switch(muteIndex){
            case "0" : this.kickAudio.volume = 0;
            break;
            case "1" : this.snareAudio.volume = 0;
            break;
            case "2" : this.hihatAudio.volume = 0;
            break;
        }
    } else{
        switch(muteIndex){
            case "0" : this.kickAudio.volume = 1;
            break;
            case "1" : this.snareAudio.volume = 1;
            break;
            case "2" : this.hihatAudio.volume = 1;
            break;
        }
    }
  }
  changeTempo(e){
    const tempoText = document.querySelector('.tempo-nr');
    this.bpm = e.target.value;
    tempoText.innerText = e.target.value;
  }
  updateTempo(){
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playBtn.classList.contains('active')){
        this.start();
    };
  }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
    drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});

drumKit.muteBtn.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
});
