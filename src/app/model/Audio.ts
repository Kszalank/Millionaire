import correctAnswer from "../../assets/audio/correctAnswer.mp3";
import finalAnswer from "../../assets/audio/finalAnswer.mp3";
import letsPlay from "../../assets/audio/letsPlay.mp3";
import mainTheme from "../../assets/audio/MainTheme.mp3";
import phoneFriend from "../../assets/audio/phoneFriend.mp3";
import wrongAnswer from "../../assets/audio/wrongAnswer.mp3";
import unmuteIcon from "../../assets/img/unmute.svg";
import muteIcon from "../../assets/img/mute.svg";

type Music = Audio;
export class Audio {
  muteButton: HTMLElement | null = null;
  muteImage: HTMLImageElement | null = null;
  audio: HTMLAudioElement | null = null;
  source: HTMLSourceElement | null = null;
  muted: boolean | null = null;
  constructor() {
    this.muteButton = document.getElementById("muteButton");
  }

  start() {
    const left = document.getElementsByClassName("left");
    this.audio = document.createElement("audio");
    this.source = document.createElement("source");
    this.muted = false;
    this.source.src = letsPlay;
    this.audio.appendChild(this.source);
    this.audio.play();
    this.muteButton?.appendChild(this.audio);
    left[0].appendChild(this.audio);
  }

  replay() {
    console.log(this.muted);
    if (this.muted === false) {
      this.audio?.load();
      this.audio?.appendChild(this.source!);
      this.audio?.play();
    }
  }
  correctAnswerSound() {
    this.source!.src = correctAnswer;
    this.replay();
  }

  wrongAnswerSound() {
    this.source!.src = wrongAnswer;
    this.replay();
  }

  phoneFriend() {
    this.source!.src = phoneFriend;
    this.replay();
  }
  finalAnswerTheme() {
    this.source!.src = finalAnswer;
    this.replay();
  }
  mainTheme() {
    this.source!.src = mainTheme;
    this.replay();
  }
  muteAudio() {
    const muteImage: HTMLImageElement | null = document.images.namedItem("mute");
    if (!this.muted) {
      this.muted = true;
      if (muteImage) muteImage.src = unmuteIcon;
      this.audio?.pause();
    } else {
      this.muted = false;
      if (muteImage) muteImage.src = muteIcon;
      this.mainTheme();
    }
  }
}
