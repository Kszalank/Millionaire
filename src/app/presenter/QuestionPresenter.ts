import { Question } from "../view/components/Question/Question";

import { QuestionModel } from "../model/Question";

type QuestionPresenterData = QuestionModel;

export class QuestionPresenter {
  constructor(private data: QuestionPresenterData) {}

  initialize() {
    console.log(this.data);
    const questionData = this.data.getQuestionData();
    const q = new Question({
      answers: [questionData.rightAnswer, ...questionData.wrongAnswers],
      question: questionData.question,
      onAnswerClick: (answer) => {
        console.log("selected", answer);
      },
    });
    const mid = document.querySelector(".mid");
    mid?.appendChild(q.render());
  }
  destroy() {}
  onAnswerClick() {}
}

//DONE//1. Add onAnswerClick to questionButton
//2. Pass onAnswerClick from question to questionButton
//DONE//3. In questionButton add an EventLsitenrer on the buttonElement onCLick
// 4. Pass onAnswerClick as a callback to event listener
// 5. Inside eventlistener callback get button answer and call the onanswerclick with the answer as an argument
