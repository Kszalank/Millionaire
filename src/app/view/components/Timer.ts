import { EndGameWindow } from "../../model/EndingWindow";

type Timing = Timer;
export class Timer {
  currentTime: number | null = null;
  timerSpan: HTMLSpanElement | null = null;
  stopTime: number | null = null;
  constructor() {}

  resetTimer() {
    this.currentTime = 46;
  }

  render() {
    const endWindow = new EndGameWindow();
    this.currentTime = 45;
    const timer = document.createElement("div");
    timer.classList.add("timer");
    const firstCircle = document.createElement("div");
    const secondCircle = document.createElement("div");
    const middleCircle = document.createElement("div");
    const hiddenCircle = document.createElement("div");
    firstCircle.classList.add("circle1");
    secondCircle.classList.add("circle2");
    middleCircle.classList.add("circle3");
    hiddenCircle.classList.add("circle4");
    timer.appendChild(firstCircle);
    timer.appendChild(secondCircle);
    timer.appendChild(middleCircle);
    timer.appendChild(hiddenCircle);
    this.timerSpan = document.createElement("span");
    this.timerSpan?.classList.add("time");
    this.timerSpan.innerHTML = "" + this.currentTime;
    timer.appendChild(this.timerSpan);
    const interval = setInterval(() => {
      this.currentTime!--;
      this.stopTime = this.currentTime;
      const remainingTime = 45 - this.currentTime!;
      secondCircle.style.transform = `rotate(${-180 + remainingTime * 8}deg)`;
      if (remainingTime < 22.5) {
        firstCircle.style.zIndex = "" + 5;
        secondCircle.style.zIndex = "" + 1;
        middleCircle.style.zIndex = "" + 10;
        hiddenCircle.style.zIndex = "" + 0;
        hiddenCircle.style.transform = `rotate(${-180 + remainingTime * 8}deg)`;
      }
      if (remainingTime >= 22.5) {
        secondCircle.style.zIndex = "" + 8;
        hiddenCircle.style.transform = `rotate(${remainingTime * 8}deg)`;
        hiddenCircle.style.zIndex = "" + 4;
      }
      if (this.timerSpan) this.timerSpan.innerHTML = "" + this.currentTime;

      if (this.currentTime! === 0) {
        endWindow.openWindow();
        const wonPriceInfo = document.getElementById("endPriceWindow");

        if (wonPriceInfo) {
          wonPriceInfo.innerHTML = "NO TIME LEFT, YOU LOST";
          clearInterval(interval);
        }
      }
    }, 1000);
    return timer;
  }
}
