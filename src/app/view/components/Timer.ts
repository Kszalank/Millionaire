type Timing = Timer;
export class Timer {
  currentTime: number | null = null;
  constructor() {}

  resetTimer() {
    this.currentTime = 46;
  }

  render() {
    this.currentTime = 45;
    const timer = document.createElement("div");
    timer.classList.add("timer");
    const firstCircle = document.createElement("div");
    const secondCircle = document.createElement("div");
    const middleCircle = document.createElement("div");
    const hiddenCircle = document.createElement("div");
    firstCircle.classList.add("C1");
    secondCircle.classList.add("C2");
    middleCircle.classList.add("C3");
    hiddenCircle.classList.add("C4");
    timer.appendChild(firstCircle);
    timer.appendChild(secondCircle);
    timer.appendChild(middleCircle);
    timer.appendChild(hiddenCircle);
    const timerSpan = document.createElement("span");
    timerSpan.classList.add("time");
    timerSpan.innerHTML = "" + this.currentTime;
    timer.appendChild(timerSpan);
    const interval = setInterval(() => {
      this.currentTime!--;
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
      timerSpan.innerHTML = "" + this.currentTime;

      if (this.currentTime! === 0) {
        alert("NO TIME LEFT, YOU LOST");
        clearInterval(interval);
      }
    }, 1000);
    return timer;
  }
}
