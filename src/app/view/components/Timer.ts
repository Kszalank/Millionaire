export class Timer {
  constructor() {}

  static render() {
    const timer = document.createElement("div");
    timer.classList.add("timer");
    const timerSpan = document.createElement("span");
    timerSpan.classList.add("time");
    timerSpan.innerText = "45";
    timer.appendChild(timerSpan);
    return timer;
  }
}
