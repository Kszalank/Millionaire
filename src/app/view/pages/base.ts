import backgroundLogo from "../../../assets/img/background_logo.svg";
import { AudioToggle } from "../components/AudioToggle";
import { Timer } from "../components//Timer";
import { LifeRings } from "../components/Lifelines/LifelineButton";
import { MoneyPrizeList } from "../components/MoneyPrizeList/MoneyPrizeList";
import { QuizModel } from "../../model/Quiz";
import { questionsList } from "../components/Question/constants";
import { QuestionPresenter } from "../../presenter/QuestionPresenter";
export const left = document.createElement("div");
export const mid = document.createElement("div");
export const right = document.createElement("div");

export class Base {
  constructor() {}

  static render() {
    const audioToggle = AudioToggle.render();
    const timer = Timer.render();
    const lifeRings = LifeRings.render();
    // const question = Question.render();
    const moneyPrizeList = MoneyPrizeList.render();
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
    // mid.appendChild(question);
    right.classList.add("right");
    document.body.appendChild(right);
    right.appendChild(moneyPrizeList);

    const quiz = new QuizModel(questionsList);
    quiz.startQuiz();
    const x = quiz.useLifeLine("friend");
    console.log(quiz.isCorrectAnswerToCurrentQuestion(x || ""));
    quiz.setNextQuestion();
    const y = quiz.useLifeLine("50:50");
    console.log(quiz.isCorrectAnswerToCurrentQuestion(y || ""));
    quiz.setNextQuestion();
    const z = quiz.useLifeLine("audience");
    console.log(quiz.isCorrectAnswerToCurrentQuestion(z || ""));
    quiz.setNextQuestion();
    quiz.stopQuiz();

    const cQ = quiz.getCurrentQuestion();
    console.log(cQ);
    if (cQ) {
      const questionPresenter = new QuestionPresenter(cQ);
      questionPresenter.initialize();
    }
  }
}
