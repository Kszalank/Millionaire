import { QuestionModel } from "../model/Question";
import { QuizModel } from "../model/Quiz";
import { questionsList } from "../view/components/Question/constants";
import { QuestionPresenter } from "../presenter/QuestionPresenter";
import { Timer } from "../view/components/Timer";
import { Audio } from "../model/Audio";
import { EndGameWindow } from "../model/EndingWindow";
import { LifeLineWindowClass } from "../model/LifeLineWindow";

export class QuizPresenter {
  questionPresenter: QuestionPresenter | null = null;
  quiz: QuizModel | null = null;
  numberOfCorrectlyAnsweredQuestions: number | null = null;
  timer: Timer | null = null;
  numberOfQuestions: number | null = null;
  audio: Audio | null = null;
  selectedAnswer: string | null = null;
  endWindow: EndGameWindow | null = null;
  lifeLineWindow: LifeLineWindowClass | null = null;

  constructor() {
    this.quiz = new QuizModel(questionsList);
    this.numberOfQuestions = questionsList.length;
    this.quiz.startQuiz();
    this.audio = new Audio();
    this.audio.start();
    const muteButton = document.getElementsByClassName("sound");
    muteButton[0].addEventListener("click", () => {
      this.audio?.muteAudio();
    });
    this.numberOfCorrectlyAnsweredQuestions = 0;
    const currentQuestion = this.quiz.getCurrentQuestion();
    this.showingCurrentQuestionOnPriceList();
    this.timer = new Timer();
    const [left] = document.getElementsByClassName("left");
    left.appendChild(this.timer.render());

    if (currentQuestion) {
      this.questionPresenter = new QuestionPresenter(currentQuestion, (answer) => {
        this.selectedAnswer = answer;
        this.colorSelectedAnswer();
        setTimeout(() => {
          this.checkAnswer(answer);
        }, 2000);
      });
      this.questionPresenter.initialize();
    }
    this.lifeLineWindow = new LifeLineWindowClass();
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
        this.colorSelectedAnswer();
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
          this.colorRightAnswer();
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
          this.colorRightAnswer();
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
        this.colorWrongAnswer();
        this.audio?.wrongAnswerSound();
      }, 2000);

      setTimeout(() => {
        this.endWindow = new EndGameWindow();
        this.endOfGameWindow();
        this.quiz?.stopQuiz();
      }, 4000);
    }
  }

  showingCurrentQuestionOnPriceList() {
    const [priceList] = document.getElementsByClassName("price-list");
    const currentQuestion =
      priceList.children[questionsList.length - (this.numberOfQuestions! - priceList.children.length)];
    currentQuestion.id = "currentQuestion";
    const currentQuestionId = document.getElementById("currentQuestion");

    const previousQuestion =
      priceList.children[questionsList.length - (this.numberOfQuestions! - priceList.children.length - 1)];
    if (previousQuestion) {
      previousQuestion.id = "previousQuestion";
      const previousQuestionId = document.getElementById("previousQuestion");

      if (previousQuestionId) {
        previousQuestionId.className = "previousQuestion";
      }
    }

    if (currentQuestionId) {
      currentQuestionId.className = "currentQuestion";
    }
  }

  openningLifeLineWindow(lifeLine: string) {
    this.lifeLineWindow?.openLifeLineWindow();
    const answerWindow = document.getElementById("answerWindow");
    if (answerWindow) {
      if (this.quiz?.getCurrentQuestion()?.getQuestionData().rightAnswer) {
        if (lifeLine === "friend") {
          this.audio?.phoneFriend();
          answerWindow.style.alignContent = "center";
          answerWindow.innerText =
            "Hello, I think that " +
            this.quiz?.getCurrentQuestion()?.getQuestionData().rightAnswer +
            " is the right answer";
        } else if (lifeLine === "fiftyfifty") {
          answerWindow.style.alignContent = "center";
          answerWindow.innerText = "2 wrong answers removed";
          const allButtons = document.getElementsByClassName("button");
          var buttonsArray = [...allButtons];
          let last = buttonsArray.length;
          buttonsArray.forEach((answer, index) => {
            if (
              this.quiz
                ?.getCurrentQuestion()
                ?.getQuestionData()
                .wrongAnswers.includes(document.getElementsByClassName("button")[index].children[1].innerHTML)
            ) {
              if (last > 2) {
                let firstWrongAnswer = document.getElementsByClassName("button")[index].children[0];
                let secondWrongAnswer = document.getElementsByClassName("button")[index].children[1];
                firstWrongAnswer.innerHTML = "";
                secondWrongAnswer.innerHTML = "";
              }
              last--;
              console.log(last);
            }
          });
        } else {
          const indexDiv = document.createElement("div");
          const columnWidth = "10%";
          const columnPosition = "relative";
          const columnBackground = "#e1a02e";
          const allButtons = document.getElementsByClassName("button");
          var buttonsArray = [...allButtons];
          let last = buttonsArray.length;
          let chance = 100;
          buttonsArray.forEach((answer, index) => {
            const chanceToGetRightAnswer = 30;
            const answerColumn = document.createElement("div");
            const answerColumnPercentage = document.createElement("div");
            const indexDivA = document.createElement("div");
            answerColumn.style.position = columnPosition;
            answerColumn.style.width = columnWidth;
            answerColumn.style.background = columnBackground;
            answerColumn.style.color = "black";
            answerColumnPercentage.style.position = columnPosition;
            answerColumnPercentage.style.top = "-20px";
            answerColumnPercentage.style.color = "#e1a02e";
            indexDiv.style.display = "flex";
            indexDiv.style.position = "absolute";
            indexDiv.style.width = "100%";
            indexDiv.style.height = "10%";
            indexDiv.style.top = "105%";
            indexDiv.style.background = "#071319";
            indexDiv.style.border = "1px solid #e1a02e";
            indexDiv.style.fontFamily = "Inter";
            indexDiv.style.color = "#e1a02e";
            indexDivA.style.position = "relative";
            indexDivA.style.width = "25%";
            indexDivA.style.height = "100%";
            indexDivA.style.background = "#071319";
            indexDivA.style.fontFamily = "Inter";
            indexDivA.style.color = "#e1a02e";
            indexDivA.innerHTML = String.fromCharCode(65 + index);
            indexDiv.appendChild(indexDivA);
            let random;
            document.getElementsByClassName("button")[index].children[1].innerHTML ===
            this.quiz?.getCurrentQuestion()?.getQuestionData().rightAnswer
              ? last === 1
                ? (random = chance)
                : (random = chanceToGetRightAnswer + Math.floor(Math.random() * (chance - chanceToGetRightAnswer)))
              : last === 1
              ? (random = chance)
              : chance - chanceToGetRightAnswer < 0
              ? (random = Math.floor(Math.random() * chance))
              : (random = Math.floor(Math.random() * (chance - chanceToGetRightAnswer)));
            answerColumn.style.height = `${random}%`;
            answerColumnPercentage.innerText = random + "";
            chance -= random;
            last--;
            answerColumn.appendChild(answerColumnPercentage);
            answerWindow.appendChild(answerColumn);
            answerWindow.appendChild(indexDiv);
          });
        }
      }
    }
  }

  colorSelectedAnswer() {
    const allButtons = document.getElementsByClassName("button");
    var buttonsArray = [...allButtons];
    buttonsArray.forEach((answer, index) => {
      if (document.getElementsByClassName("button")[index].children[1].innerHTML === this.selectedAnswer) {
        const selectedButton = document.getElementsByClassName("button")[index];
        selectedButton.id = "selected";
        const selectedButtonId = document.getElementById("selected");
        if (selectedButtonId) {
          selectedButtonId.style.background = "#e1a02e";
          selectedButtonId.style.color = "black";
          const answerIndex = document.getElementsByClassName("button")[index].children[0];
          answerIndex.id = "selectedIndex";
          const answerIndexId = document.getElementById("selectedIndex");
          if (answerIndexId) {
            answerIndexId.style.color = "white";
          }
        }
      }
    });
  }

  colorWrongAnswer() {
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

  colorRightAnswer() {
    const allButtons = document.getElementsByClassName("button");
    const buttonsArray = [...allButtons];
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
    this.endWindow?.openWindow();
    const wonPriceInfo = document.getElementById("endPriceWindow");
    const [priceList] = document.getElementsByClassName("price-list");
    if (wonPriceInfo) {
      this.numberOfCorrectlyAnsweredQuestions! < 5
        ? (wonPriceInfo.innerHTML = "Wrong answer, you won nothing, do you want to play again?")
        : this.numberOfCorrectlyAnsweredQuestions! >= 5 && this.numberOfCorrectlyAnsweredQuestions! < 10
        ? (wonPriceInfo.innerHTML =
            "Wrong answer, you won guaranteed " +
            priceList.children[priceList.children.length - 5].children[0].innerHTML +
            " $, do you want to play again?")
        : this.numberOfCorrectlyAnsweredQuestions! >= 10
        ? (wonPriceInfo.innerHTML =
            "Wrong answer, you won guaranteed " +
            priceList.children[priceList.children.length - 10].children[0].innerHTML +
            " $, do you want to play again?")
        : "";
    }
  }
}
