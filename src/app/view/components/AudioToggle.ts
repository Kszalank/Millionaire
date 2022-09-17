import muteIcon from "../../../assets/img/mute.svg";
export class AudioToggle {
  constructor() {}

  static render() {
    const muteButton = document.createElement("button");
    muteButton.classList.add("sound");
    const muteButtonImage = document.createElement("img");
    muteButtonImage.classList.add("sound");
    muteButtonImage.src = muteIcon;
    muteButtonImage.alt = "muteButton";
    muteButton.appendChild(muteButtonImage);
    return muteButton;
  }
}
