import backgroundLogo from "../../../assets/img/background_logo.svg";
import { AudioToggle } from "../components/AudioToggle";
import { LifeRings } from "../components/Lifelines/LifelineButton";
import { MoneyPrizeList } from "../components/MoneyPrizeList/MoneyPrizeList";
import { debug } from "./temp";
export const left = document.createElement("div");
export const mid = document.createElement("div");
export const right = document.createElement("div");

export class Base {
  constructor() {}

  static render() {
    const audioToggle = AudioToggle.render();
    const lifeRings = LifeRings.render();
    const moneyPrizeList = MoneyPrizeList.render();
    left.classList.add("left");
    document.body.appendChild(left);
    left.appendChild(audioToggle);
    mid.classList.add("mid");
    document.body.appendChild(mid);
    mid.appendChild(lifeRings);
    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.innerHTML = `<img src=${backgroundLogo} alt="logo">`;
    mid.appendChild(logo);
    right.classList.add("right");
    document.body.appendChild(right);
    right.appendChild(moneyPrizeList);
    debug();
  }
}
