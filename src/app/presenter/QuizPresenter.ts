import { QuestionModel } from "../model/Question";
import { QuizModel } from "../model/Quiz";
import { questionsList } from "../view/components/Question/constants";
import { QuestionPresenter } from "../presenter/QuestionPresenter";
import { Timer } from "../view/components/Timer";
import { Audio } from "../model/Audio";

export class QuizPresenter {
  questionPresenter: QuestionPresenter | null = null;
  quiz: QuizModel | null = null;
  numberOfCorrectlyAnsweredQuestions: number | null = null;
  timer: Timer | null = null;
  numberOfQuestions: number | null = null;
  audio: Audio | null = null;
  selectedAnswer: string | null = null;

  constructor() {
    this.quiz = new QuizModel(questionsList);
    this.numberOfQuestions = questionsList.length;
    this.quiz.startQuiz();
    this.audio = new Audio();
    this.audio.start();
    const muteButton = document.getElementsByClassName("sound");
    const muteButtonImage = document.getElementById("mute");
    muteButton[0].addEventListener("click", () => {
      this.audio?.muteAudio();
      console.log(muteButtonImage?.innerHTML);
    });
    this.numberOfCorrectlyAnsweredQuestions = 0;
    const currentQuestion = this.quiz.getCurrentQuestion();
    this.showingCurrentQuestionOnPriceList();
    this.timer = new Timer();
    const left = document.getElementsByClassName("left");
    // left[0].appendChild(this.timer.render());

    if (currentQuestion) {
      this.questionPresenter = new QuestionPresenter(currentQuestion, (answer) => {
        this.selectedAnswer = answer;
        this.ColorSelectedAnswer();
        setTimeout(() => {
          this.checkAnswer(answer);
          this.timer!.resetTimer();
        }, 2000);
      });
      this.questionPresenter.initialize();
    }
    const fiftyFifty = document.getElementById("fiftyfifty");
    const phone = document.getElementById("phone");
    const audience = document.getElementById("audience");
    fiftyFifty?.addEventListener("click", () => {
      this.quiz?.useLifeLine("50:50");
      fiftyFifty.style.filter = "blur(2px)";
      this.openningLifeLineWindow("fiftyfifty");
    });
    phone?.addEventListener("click", () => {
      this.quiz?.useLifeLine("friend");
      phone.style.filter = "blur(2px)";
      this.openningLifeLineWindow("friend");
    });
    audience?.addEventListener("click", () => {
      this.quiz?.useLifeLine("audience");
      audience.style.filter = "blur(2px)";
      this.openningLifeLineWindow("audience");
    });
  }

  destroyPreviousAndInitializeNextQuestion() {
    this.questionPresenter?.destroy();
    this.quiz?.setNextQuestion();
    const currentQuestion = this.quiz?.getCurrentQuestion();

    if (currentQuestion) {
      this.questionPresenter = new QuestionPresenter(currentQuestion, (answer) => {
        this.selectedAnswer = answer;
        this.ColorSelectedAnswer();
        setTimeout(() => {
          this.checkAnswer(answer);
          this.timer!.resetTimer();
        }, 2000);
      });
      this.questionPresenter.initialize();
    }
  }

  checkAnswer(answer: string) {
    if (this.quiz?.isCorrectAnswerToCurrentQuestion(answer)) {
      this.numberOfCorrectlyAnsweredQuestions!++;
      if (this.numberOfCorrectlyAnsweredQuestions === 15) {
        setTimeout(() => {
          this.ColorRightAnswer();
          this.audio?.correctAnswerSound();
          alert("YOU HAVE WON 1.000.000 $");
        }, 2000);
      }
      if (this.numberOfCorrectlyAnsweredQuestions === 14) {
        this.audio?.finalAnswerTheme();
      }
      if (questionsList.length === 0) {
        alert("NO MORE QUESTIONS");
      } else {
        setTimeout(() => {
          this.ColorRightAnswer();
          this.audio?.correctAnswerSound();
        }, 2000);

        setTimeout(() => {
          this.destroyPreviousAndInitializeNextQuestion();
          this.showingCurrentQuestionOnPriceList();
        }, 4000);
      }
    } else {
      setTimeout(() => {
        this.ColorWrongAnswer();
        this.audio?.wrongAnswerSound();
      }, 2000);

      setTimeout(() => {
        this.showWonPrice();
        this.quiz?.stopQuiz();
      }, 4000);
    }
  }

  showWonPrice() {
    const PriceList = document.getElementsByClassName("price-list");
    if (this.numberOfCorrectlyAnsweredQuestions! < 5) {
      alert("YOU WON 0 $");
    } else if (this.numberOfCorrectlyAnsweredQuestions! >= 5 && this.numberOfCorrectlyAnsweredQuestions! < 10) {
      alert(
        "WRONG ANSWER - WON GUARANTEED PRICE " +
          PriceList[0].children[PriceList[0].children.length - 5].children[0].innerHTML +
          " $"
      );
    } else if (this.numberOfCorrectlyAnsweredQuestions! >= 10) {
      alert(
        "WRONG ANSWER - WON GUARANTEED PRICE " +
          PriceList[0].children[PriceList[0].children.length - 10].children[0].innerHTML +
          " $"
      );
    }
  }

  showingCurrentQuestionOnPriceList() {
    const PriceList = document.getElementsByClassName("price-list");
    const currentQuestion =
      PriceList[0].children[questionsList.length - (this.numberOfQuestions! - PriceList[0].children.length)];
    currentQuestion.id = "currentQuestion";
    const currentQuestionId = document.getElementById("currentQuestion");

    const previousQuestion =
      PriceList[0].children[questionsList.length - (this.numberOfQuestions! - PriceList[0].children.length - 1)];
    if (previousQuestion) {
      previousQuestion.id = "previousQuestion";
      const previousQuestionId = document.getElementById("previousQuestion");
      if (previousQuestionId) {
        previousQuestionId.style.color = "green";
        previousQuestionId.style.padding = "0px";
        previousQuestionId.style.backgroundColor = "071319";
        previousQuestionId.style.borderRadius = "0px";
        previousQuestionId.style.width = "fit-content";
      }
    }

    if (currentQuestionId) {
      currentQuestionId.style.color = "white";
      currentQuestionId.style.padding = "10px";
      currentQuestionId.style.backgroundColor = "e1a02e";
      currentQuestionId.style.borderRadius = "20px";
      currentQuestionId.style.width = "fit-content";
    }
  }

  openningLifeLineWindow(lifeLine: string) {
    const currentQuestion = this.quiz?.getCurrentQuestion();
    const lifeLineWindow = document.createElement("div");
    const correctAnswer = document.createElement("div");
    const acceptButton = document.createElement("button");
    const mid = document.getElementsByClassName("mid");
    lifeLineWindow.style.position = "absolute";
    lifeLineWindow.style.width = "50%";
    lifeLineWindow.style.height = "50%";
    lifeLineWindow.style.top = "25%";
    lifeLineWindow.style.left = "25%";
    lifeLineWindow.style.background = "red";
    lifeLineWindow.style.border = "1px solid #e1a02e";
    lifeLineWindow.style.borderRadius = "50px";

    correctAnswer.style.display = "flex";
    correctAnswer.style.flexWrap = "wrap";
    correctAnswer.style.position = "relative";
    correctAnswer.style.width = "75%";
    correctAnswer.style.height = "40%";
    correctAnswer.style.top = "5%";
    correctAnswer.style.left = "12.5%";
    correctAnswer.style.background = "#071319";
    correctAnswer.style.border = "1px solid #e1a02e";
    correctAnswer.style.borderRadius = "50px";
    correctAnswer.style.textAlign = "center";
    correctAnswer.style.justifyContent = "center";
    correctAnswer.style.alignContent = "center";
    correctAnswer.style.fontFamily = "Inter";
    correctAnswer.style.color = "#e1a02e";

    if (currentQuestion?.getQuestionData().rightAnswer) {
      if (lifeLine === "friend") {
        this.audio?.phoneFriend();
        correctAnswer.innerText =
          "I think that " + currentQuestion?.getQuestionData().rightAnswer + " is the right answer";
      } else {
        correctAnswer.innerText =
          "Audience thinks that " + currentQuestion?.getQuestionData().rightAnswer + " is the right answer";
      }
    }

    acceptButton.style.position = "relative";
    acceptButton.style.width = "25%";
    acceptButton.style.height = "10%";
    acceptButton.style.top = "40%";
    acceptButton.style.left = "0";
    acceptButton.style.background = "#071319";
    acceptButton.style.border = "1px solid #e1a02e";
    acceptButton.style.borderRadius = "50px";
    acceptButton.style.fontFamily = "Inter";
    acceptButton.style.color = "#e1a02e";
    acceptButton.innerText = "Thank you";

    lifeLineWindow.appendChild(correctAnswer);
    lifeLineWindow.appendChild(acceptButton);
    mid[0].appendChild(lifeLineWindow);
    acceptButton.addEventListener("click", () => {
      lifeLineWindow.remove();
      this.audio?.mainTheme();
    });
  }

  ColorSelectedAnswer() {
    const BUT = document.getElementsByClassName("button");
    var arr = [...BUT];
    arr.forEach((answer, index) => {
      if (document.getElementsByClassName("button")[index].children[1].innerHTML === this.selectedAnswer) {
        const Q = document.getElementsByClassName("button")[index];
        Q.id = "selected";
        const W = document.getElementById("selected");
        console.log(W);
        console.log(Q);
        if (W) W.style.background = "#e1a02e";
      }
    });
  }

  ColorWrongAnswer() {
    const currentQuestion = this.quiz?.getCurrentQuestion();
    const BUT = document.getElementsByClassName("button");
    var arr = [...BUT];
    arr.forEach((answer, index) => {
      if (document.getElementsByClassName("button")[index].children[1].innerHTML === this.selectedAnswer) {
        const Q = document.getElementsByClassName("button")[index];
        Q.id = "selected";
        const W = document.getElementById("selected");
        console.log(W);
        console.log(Q);
        if (W) {
          W.style.background = "red";
          W.style.borderColor = "darkred";
        }
      }
      if (
        document.getElementsByClassName("button")[index].children[1].innerHTML ===
        currentQuestion?.getQuestionData().rightAnswer
      ) {
        const Q = document.getElementsByClassName("button")[index];
        Q.id = "right";
        const W = document.getElementById("right");
        console.log(W);
        console.log(Q);
        if (W) {
          W.style.background = "green";
          W.style.borderColor = "darkgreen";
        }
      }
    });
  }

  ColorRightAnswer() {
    const BUT = document.getElementsByClassName("button");
    var arr = [...BUT];
    arr.forEach((answer, index) => {
      if (document.getElementsByClassName("button")[index].children[1].innerHTML === this.selectedAnswer) {
        const Q = document.getElementsByClassName("button")[index];
        Q.id = "selected";
        const W = document.getElementById("selected");
        console.log(W);
        console.log(Q);
        if (W) {
          W.style.background = "green";
          W.style.borderColor = "darkgreen";
        }
      }
    });
  }
}
