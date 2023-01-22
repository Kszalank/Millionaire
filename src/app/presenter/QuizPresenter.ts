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
    left[0].appendChild(this.timer.render());

    if (currentQuestion) {
      this.questionPresenter = new QuestionPresenter(currentQuestion, (answer) => {
        this.selectedAnswer = answer;
        this.ColorSelectedAnswer();
        setTimeout(() => {
          this.checkAnswer(answer);
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
          this.timer!.resetTimer();
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
      this.endOfGameWindow();
    } else if (this.numberOfCorrectlyAnsweredQuestions! >= 5 && this.numberOfCorrectlyAnsweredQuestions! < 10) {
      alert(
        "WRONG ANSWER - WON GUARANTEED PRICE " +
          PriceList[0].children[PriceList[0].children.length - 5].children[0].innerHTML +
          " $"
      );
      this.endOfGameWindow();
    } else if (this.numberOfCorrectlyAnsweredQuestions! >= 10) {
      alert(
        "WRONG ANSWER - WON GUARANTEED PRICE " +
          PriceList[0].children[PriceList[0].children.length - 10].children[0].innerHTML +
          " $"
      );
      this.endOfGameWindow();
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
    // correctAnswer.style.borderRadius = "50px";
    correctAnswer.style.textAlign = "center";
    correctAnswer.style.justifyContent = "space-around";
    correctAnswer.style.alignContent = "flex-start";
    correctAnswer.style.fontFamily = "Inter";
    correctAnswer.style.color = "#e1a02e";

    if (currentQuestion?.getQuestionData().rightAnswer) {
      if (lifeLine === "friend") {
        this.audio?.phoneFriend();
        correctAnswer.innerText =
          "I think that " + currentQuestion?.getQuestionData().rightAnswer + " is the right answer";
      } else {
        const answerAColumn = document.createElement("div");
        const answerBColumn = document.createElement("div");
        const answerCColumn = document.createElement("div");
        const answerDColumn = document.createElement("div");
        const chanceToGetRightAnswer = 20;
        const random = chanceToGetRightAnswer + Math.floor(Math.random() * (100 - chanceToGetRightAnswer));
        const random1 = Math.floor(Math.random() * (100 - random));
        console.log("random1 = " + (100 - random));
        const random2 = Math.floor(Math.random() * (100 - random - random1));
        console.log("random2 = " + (100 - random - random1));
        const random3 = 100 - random - random1 - random2;
        console.log("random3 = " + (100 - random - random1 - random2));
        console.log(
          random + " " + random1 + " " + random2 + " " + random3 + "SUMA " + (random + random1 + random2 + random3)
        );
        const columnWidth = "10%";
        const columnPosition = "relative";
        const columnBackground = "#e1a02e";
        answerAColumn.style.position = columnPosition;
        answerAColumn.style.width = columnWidth;
        answerAColumn.style.height = `${random}px`;
        answerAColumn.style.top;
        answerAColumn.style.left = "0";
        answerAColumn.style.background = columnBackground;
        answerAColumn.style.color = "black";
        answerAColumn.innerText = random + "";

        answerBColumn.style.position = columnPosition;
        answerBColumn.style.width = columnWidth;
        answerAColumn.style.height = `${random1}px`;
        answerBColumn.style.top;
        answerBColumn.style.left;
        answerBColumn.style.background = columnBackground;
        answerBColumn.style.color = "black";
        answerBColumn.innerText = random1 + "";

        answerCColumn.style.position = columnPosition;
        answerCColumn.style.width = columnWidth;
        answerCColumn.style.height = `${random2}px`;
        answerCColumn.style.top;
        answerCColumn.style.left;
        answerCColumn.style.background = columnBackground;
        answerCColumn.style.color = "black";
        answerCColumn.innerText = random2 + "";

        answerDColumn.style.position = columnPosition;
        answerDColumn.style.width = columnWidth;
        answerDColumn.style.height = `${random3}px`;
        answerDColumn.style.top;
        answerDColumn.style.left;
        answerDColumn.style.background = columnBackground;
        answerDColumn.style.color = "black";
        answerDColumn.innerText = random3 + "";

        correctAnswer.appendChild(answerAColumn);
        correctAnswer.appendChild(answerBColumn);
        correctAnswer.appendChild(answerCColumn);
        correctAnswer.appendChild(answerDColumn);
        // correctAnswer.innerText =
        //   "Audience thinks that " + currentQuestion?.getQuestionData().rightAnswer + " is the right answer";
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
    const allButtons = document.getElementsByClassName("button");
    var buttonsArray = [...allButtons];
    buttonsArray.forEach((answer, index) => {
      if (document.getElementsByClassName("button")[index].children[1].innerHTML === this.selectedAnswer) {
        const selectedButton = document.getElementsByClassName("button")[index];
        selectedButton.id = "selected";
        const selectedButtonId = document.getElementById("selected");
        if (selectedButtonId) {
          console.log(selectedButton);
          selectedButtonId.style.background = "#e1a02e";
          selectedButtonId.style.color = "black";
          const answerIndex = document.getElementsByClassName("button")[index].children[0];
          answerIndex.id = "selectedIndex";
          const answerIndexId = document.getElementById("selectedIndex");
          if (answerIndexId) {
            answerIndexId.style.color = "white";
          }
          console.log(answerIndex);
        }
      }
    });
  }

  ColorWrongAnswer() {
    const currentQuestion = this.quiz?.getCurrentQuestion();
    const allButtons = document.getElementsByClassName("button");
    var buttonsArray = [...allButtons];
    buttonsArray.forEach((answer, index) => {
      if (document.getElementsByClassName("button")[index].children[1].innerHTML === this.selectedAnswer) {
        const selectedButton = document.getElementsByClassName("button")[index];
        selectedButton.id = "selected";
        const selectedButtonId = document.getElementById("selected");

        if (selectedButtonId) {
          selectedButtonId.style.background = "red";
          selectedButtonId.style.borderColor = "darkred";
        }
      }
      if (
        document.getElementsByClassName("button")[index].children[1].innerHTML ===
        currentQuestion?.getQuestionData().rightAnswer
      ) {
        const selectedButton = document.getElementsByClassName("button")[index];
        selectedButton.id = "rightAnswer";
        const selectedButtonId = document.getElementById("rightAnswer");
        if (selectedButtonId) {
          selectedButtonId.style.background = "green";
          selectedButtonId.style.borderColor = "darkgreen";
        }
      }
    });
  }

  ColorRightAnswer() {
    const allButtons = document.getElementsByClassName("button");
    var buttonsArray = [...allButtons];
    buttonsArray.forEach((answer, index) => {
      if (document.getElementsByClassName("button")[index].children[1].innerHTML === this.selectedAnswer) {
        const selectedButton = document.getElementsByClassName("button")[index];
        selectedButton.id = "selected";
        const selectedButtonId = document.getElementById("selected");
        if (selectedButtonId) {
          selectedButtonId.style.background = "green";
          selectedButtonId.style.borderColor = "darkgreen";
        }
      }
    });
  }

  endOfGameWindow() {
    const endWindow = document.createElement("div");
    const mid = document.getElementsByClassName("mid");
    const restartButton = document.createElement("button");
    const priceInfo = document.createElement("div");
    endWindow.style.position = "absolute";
    endWindow.style.width = "50%";
    endWindow.style.height = "50%";
    endWindow.style.top = "25%";
    endWindow.style.left = "25%";
    endWindow.style.background = "red";
    endWindow.style.border = "1px solid #e1a02e";
    endWindow.style.borderRadius = "50px";
    restartButton.style.position = "relative";
    restartButton.style.width = "25%";
    restartButton.style.height = "10%";
    restartButton.style.top = "40%";
    restartButton.style.left = "0";
    restartButton.style.background = "#071319";
    restartButton.style.border = "1px solid #e1a02e";
    restartButton.style.borderRadius = "50px";
    restartButton.style.fontFamily = "Inter";
    restartButton.style.color = "#e1a02e";
    restartButton.innerText = "Thank you";

    endWindow.appendChild(priceInfo);
    endWindow.appendChild(restartButton);
    restartButton.addEventListener("click", () => {
      location.reload();
    });
    mid[0].appendChild(endWindow);
  }
}
