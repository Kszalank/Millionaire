import backgroundLogo from "../../../assets/img/background_logo.svg";
import { AudioToggle } from "../components/AudioToggle";
import { Timer } from "../components//Timer";
import { LifeRings } from "../components/Lifelines/LifelineButton";
import { Question } from "../components/Question/QuestionButton";
import { MoneyPrizeList } from "../components/MoneyPrizeList/MoneyPrizeListItem";
export const left = document.createElement("div");
export const mid = document.createElement("div");
export const right = document.createElement("div");
const audioToggle = AudioToggle.render();
const timer = Timer.render();
const lifeRings = LifeRings.render();
const question = Question.render();
const moneyPrizeList = MoneyPrizeList.render();
export class Base {
  constructor() {}

  static render() {
    left.classList.add("left");
    document.body.appendChild(left);
    left.appendChild(audioToggle);
    left.appendChild(timer);
    mid.classList.add("mid");
    document.body.appendChild(mid);
    mid.appendChild(lifeRings);
    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.innerHTML = `<img src=${backgroundLogo} alt="logo">`;
    mid.appendChild(logo);
    mid.appendChild(question);
    right.classList.add("right");
    document.body.appendChild(right);
    right.appendChild(moneyPrizeList);
  }
}
