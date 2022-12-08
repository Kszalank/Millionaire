import { Question } from "../view/components/Question/Question";

import { QuestionModel } from "../model/Question";

type QuestionPresenterData = QuestionModel;

export class QuestionPresenter {
  questionElement: HTMLDivElement | null = null;
  constructor(private data: QuestionPresenterData, private onAnswerClick: (answer: string) => void) {}

  initialize() {
    const questionData = this.data.getQuestionData();
    const questionComponent = new Question({
      answers: [questionData.rightAnswer, ...questionData.wrongAnswers],
      question: questionData.question,
      onAnswerClick: this.onAnswerClick,
    });
    const mid = document.querySelector(".mid");
    this.questionElement = questionComponent.render();
    mid?.appendChild(this.questionElement);
  }

  destroy() {
    this.questionElement?.remove();
  }
}
