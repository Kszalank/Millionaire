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
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");
    questionAndAnswers.appendChild(answersDiv);
    const currentQuestionAnswersList = [...this.data.answers];
    this.data.answers.forEach((answer, index) => {
      const random = Math.floor(Math.random() * currentQuestionAnswersList.length);
      const button = new QuestionButton(
        String.fromCharCode(65 + index),
        currentQuestionAnswersList[random],
        this.data.onAnswerClick
      );
      answersDiv.appendChild(button.render());
      currentQuestionAnswersList.splice(random, 1);
    });
    return questionAndAnswers;
  }
}
