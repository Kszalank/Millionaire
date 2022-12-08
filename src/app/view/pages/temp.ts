import { QuizModel } from "../../model/Quiz";
import { QuestionPresenter } from "../../presenter/QuestionPresenter";
import { questionsList } from "../components/Question/constants";

//temporary
export function debug() {
  const quiz = new QuizModel(questionsList);
  quiz.startQuiz();
  const x = quiz.useLifeLine("friend");
  console.log(quiz.isCorrectAnswerToCurrentQuestion(x || ""));
  quiz.setNextQuestion();
  const y = quiz.useLifeLine("50:50");
  console.log(quiz.isCorrectAnswerToCurrentQuestion(y || ""));
  quiz.setNextQuestion();
  const z = quiz.useLifeLine("audience");
  console.log(quiz.isCorrectAnswerToCurrentQuestion(z || ""));
  quiz.setNextQuestion();
  quiz.stopQuiz();
  const currentQuestion = quiz.getCurrentQuestion();

  function onAnswerClick(answer: string) {
    console.log("Selected ", answer);
  }
  if (currentQuestion) {
    const questionPresenter = new QuestionPresenter(currentQuestion, onAnswerClick); // po cQ funkcja
    questionPresenter.initialize();
  }

  //   const quiz = new QuizModel(questionsList);
  //   quiz.startQuiz();
  //   setInterval(() => {
  //     quiz.setNextQuestion();
  //     console.log(quiz);
  //     const cQ = quiz.getCurrentQuestion();
  //     console.log({ cQ });
  //     if (cQ) {
  //       const questionPresenter = new QuestionPresenter(cQ);
  //       questionPresenter.initialize();
  //       setTimeout(() => {
  //         questionPresenter.destroy();
  //       }, 4000);
  //     }
  //   }, 5000);
}
