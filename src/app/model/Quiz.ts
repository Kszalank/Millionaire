import { QuestionModel } from "../model/Question";

interface QuizData {
  question: string;
  wrongAnswers: string[];
  rightAnswer: string;
}

export class QuizModel {
  currentQuestion: QuestionModel | null = null;
  allQuestions: QuizData[] = [];

  constructor(private data: QuizData[]) {}

  startQuiz() {
    this.allQuestions = [...this.data];
    this.setNextQuestion();
  }

  setNextQuestion() {
    const numberOfQuestions = this.data.length;
    const random = Math.floor(Math.random() * numberOfQuestions);
    this.currentQuestion = new QuestionModel(this.data[random]);
    this.data.splice(random, 1);
  }

  isCorrectAnswerToCurrentQuestion(answer: string): boolean {
    if (this.currentQuestion === null) return false;
    return this.currentQuestion.isAnsweredCorrectly(answer);
  }

  stopQuiz() {
    this.data = [...this.allQuestions];
  }
}
