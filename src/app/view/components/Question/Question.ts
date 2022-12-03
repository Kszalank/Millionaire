import { QuestionButton } from "./QuestionButton";

export type QuestionData = {
  question: string;
  answers: string[];
  onAnswerClick: (answer: string) => void;
};

export class Question {
  constructor(private data: QuestionData) {}

  render() {
    const questionAndAnswers = document.createElement("div");
    questionAndAnswers.classList.add("questionAndAnswers");
    const question = document.createElement("div");
    question.classList.add("question");
    question.innerText = this.data.question;

    questionAndAnswers.appendChild(question);
    //-ANSWERS DIV
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");
    questionAndAnswers.appendChild(answersDiv);
    //--ANSWER BUTTONS

    this.data.answers.forEach((answer, index) => {
      const button = new QuestionButton(String.fromCharCode(65 + index), answer, this.data.onAnswerClick);
      answersDiv.appendChild(button.render());
    });
    return questionAndAnswers;
  }
}
