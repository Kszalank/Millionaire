import { questionsList } from "../view/components/Question/constants";
import { QuestionModel } from "../model/Question";
interface QuizData {}
export class QuizModel {
  constructor(private data: QuizData) {}

  currentQuestion: any;

  startQuiz() {
    this.setNextQuestion();
  }

  setNextQuestion() {
    const numberOfQuestions = questionsList.length;
    const random = Math.floor(Math.random() * numberOfQuestions);
    this.currentQuestion = new QuestionModel(questionsList[random]);
    this.currentQuestion.isAnsweredCorrectly(questionsList[random].rightAnswer);
    questionsList.splice(random, 1);
  }

  stopQuiz() {}
}
