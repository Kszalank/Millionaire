import { QuestionModel } from "../model/Question";
import { LifeLineModel } from "./LifeLine";
import { LifeLine } from "../model/LifeLine";

interface QuizData {
  question: string;
  wrongAnswers: string[];
  rightAnswer: string;
}

export class QuizModel {
  currentQuestion: QuestionModel | null = null;
  allQuestions: QuizData[] = [];
  lifeLine: LifeLineModel | null = null;

  constructor(private data: QuizData[]) {}

  startQuiz() {
    this.allQuestions = [...this.data];
    this.setNextQuestion();
    this.lifeLine = new LifeLineModel();
  }

  setNextQuestion() {
    const numberOfQuestions = this.data.length;
    const random = Math.floor(Math.random() * numberOfQuestions);
    this.currentQuestion = new QuestionModel(this.data[random]);
    this.data.splice(random, 1);
  }

  isCorrectAnswerToCurrentQuestion(answer: string): boolean {
    return !!this.currentQuestion?.isAnsweredCorrectly(answer);
  }

  useLifeLine(lifeLineOption: LifeLine) {
    this.lifeLine?.disableLifeLine(lifeLineOption);
    return this.currentQuestion?.getQuestionData().rightAnswer;
  }

  stopQuiz() {
    console.log(this.currentQuestion?.getQuestionData());
    this.data = [...this.allQuestions];
  }

  getCurrentQuestion() {
    if (this.currentQuestion) {
      return this.currentQuestion;
    }
  }
}
