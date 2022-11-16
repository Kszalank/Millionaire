interface QuestionData {
  question: string;
  wrongAnswers: string[];
  rightAnswer: string;
}

export class QuestionModel {
  constructor(private data: QuestionData) {}

  isAnsweredCorrectly(answer: string): boolean {
    return answer === this.data.rightAnswer;
  }

  getQuestionData() {
    return this.data;
  }
}
