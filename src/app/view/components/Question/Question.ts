import { QuestionButton } from "./QuestionButton";
export class Question {
  constructor() {}

  static render() {
    const questionAndAnswers = document.createElement("div");
    questionAndAnswers.classList.add("questionAndAnswers");
    const question = document.createElement("div");
    question.classList.add("question");
    question.innerText = "Odor-Eaters are designed to be used where?";
    questionAndAnswers.appendChild(question);
    //-ANSWERS DIV
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");
    questionAndAnswers.appendChild(answersDiv);
    //--ANSWER BUTTONS
    const buttonA = new QuestionButton("A", "Answer A");
    const buttonB = new QuestionButton("B", "Answer B");
    const buttonC = new QuestionButton("C", "Answer C");
    const buttonD = new QuestionButton("D", "Answer D");

    answersDiv.appendChild(buttonA.render());
    answersDiv.appendChild(buttonB.render());
    answersDiv.appendChild(buttonC.render());
    answersDiv.appendChild(buttonD.render());

    return questionAndAnswers;
  }
}
