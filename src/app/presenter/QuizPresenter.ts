import { QuestionModel } from "../model/Question";
import { QuizModel } from "../model/Quiz";
import { questionsList } from "../view/components/Question/constants";
import { QuestionPresenter } from "../presenter/QuestionPresenter";

export class QuizPresenter {
  questionPresenter: QuestionPresenter | null = null;
  quiz: QuizModel | null = null;

  constructor() {
    this.quiz = new QuizModel(questionsList);
    this.quiz.startQuiz();
    const currentQuestion = this.quiz.getCurrentQuestion();
    if (currentQuestion) {
      this.questionPresenter = new QuestionPresenter(currentQuestion, (answer) => {
        this.CheckAnswer(answer);
      });
      this.questionPresenter.initialize();
    }
  }

  DestroyAndInitialize() {
    this.questionPresenter?.destroy();
    this.quiz?.setNextQuestion();
    const currentQuestion = this.quiz?.getCurrentQuestion();
    if (currentQuestion) {
      this.questionPresenter = new QuestionPresenter(currentQuestion, (answer) => {
        this.CheckAnswer(answer);
      });
      this.questionPresenter.initialize();
    }
  }

  CheckAnswer(answer: string) {
    if (this.quiz?.isCorrectAnswerToCurrentQuestion(answer)) {
      if (questionsList.length === 0) {
        alert("NO MORE QUESTIONS");
      } else {
        this.DestroyAndInitialize();
      }
    } else {
      alert("WRONG ANSWER");
      this.quiz?.stopQuiz();
      window.location.reload();
    }
  }
}
