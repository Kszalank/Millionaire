import { QuestionModel } from "../model/Question";
import { LifeLineModel } from "./LifeLine";

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
    if (this.currentQuestion) {
      this.lifeLine = new LifeLineModel();
    }
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

  useLifeLine(lifeLineOption: string) {
    this.lifeLine?.disableLifeLine(lifeLineOption);
    console.log(this.lifeLine);
    return this.currentQuestion?.getQuestionData().rightAnswer;
  }

  stopQuiz() {
    this.data = [...this.allQuestions];
  }
}
