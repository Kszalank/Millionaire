import muteIcon from "../../assets/img/mute.svg";
import backgroundLogo from "../../assets/img/background_logo.svg";
import phone from "../../assets/img/phone.svg";
import audience from "../../assets/img/audience.svg";
export class LeftPart {
  constructor() {}

  static render() {
    //LEFT CONTAINER
    const left = document.createElement("div");
    left.classList.add("left");
    document.body.appendChild(left);
    //-MUTE/UNMUTE BUTTON
    const muteButton = document.createElement("button");
    muteButton.classList.add("sound");
    const muteButtonImage = document.createElement("img");
    muteButtonImage.classList.add("sound");
    muteButtonImage.src = muteIcon;
    muteButtonImage.alt = "muteButton";
    muteButton.appendChild(muteButtonImage);
    left.appendChild(muteButton);

    //-TIMER
    const timer = document.createElement("div");
    timer.classList.add("timer");
    const timerSpan = document.createElement("span");
    timerSpan.classList.add("time");
    timerSpan.innerText = "45";
    timer.appendChild(timerSpan);
    left.appendChild(timer);

    //MIDDLE CONTAINER
    const mid = document.createElement("div");
    mid.classList.add("mid");
    document.body.appendChild(mid);
    // -LIFE RINGS
    const lifeRings = document.createElement("div");
    lifeRings.classList.add("life-rings");
    mid.appendChild(lifeRings);
    // --LIFE RING BUTTONS
    const button1 = document.createElement("button");
    button1.classList.add("life-ring");
    button1.classList.add("fiftyfifty");
    button1.innerText = "50:50";
    lifeRings.appendChild(button1);
    const button2 = document.createElement("button");
    button2.classList.add("life-ring");
    button2.innerHTML = `<img src=${phone} alt="phone">`;
    button2.classList.add("telephone");
    lifeRings.appendChild(button2);
    const button3 = document.createElement("button");
    button3.classList.add("life-ring");
    button3.innerHTML = `<img src=${audience} alt="audience">`;
    button3.classList.add("audience");
    lifeRings.appendChild(button3);
    // LOGO
    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.innerHTML = `<img src=${backgroundLogo} alt="logo">`;
    mid.appendChild(logo);
    //-QUESTION
    const Question = document.createElement("div");
    Question.classList.add("question");
    Question.innerText = "Odor-Eaters are designed to be used where?";
    mid.appendChild(Question);
    //-ANSWERS DIV
    const AnswersDiv = document.createElement("div");
    AnswersDiv.classList.add("answers");
    mid.appendChild(AnswersDiv);
    //--ANSWER BUTTONS
    const buttonA = document.createElement("button");
    buttonA.classList.add("answer");
    buttonA.classList.add("answer-A");
    buttonA.innerHTML = `<span class="option option-index-A">A: </span>AnswerA`;
    AnswersDiv.appendChild(buttonA);
    const buttonB = document.createElement("button");
    buttonB.classList.add("answer");
    buttonB.classList.add("answer-B");
    buttonB.innerHTML = `<span class="option option-index-B">B: </span>AnswerB`;
    AnswersDiv.appendChild(buttonB);
    const buttonC = document.createElement("button");
    buttonC.classList.add("answer");
    buttonC.classList.add("answer-C");
    buttonC.innerHTML = `<span class="option option-index-C">C: </span>AnswerC`;
    AnswersDiv.appendChild(buttonC);
    const buttonD = document.createElement("button");
    buttonD.classList.add("answer");
    buttonD.classList.add("answer-D");
    buttonD.innerHTML = `<span class="option option-index-D">D: </span>AnswerD`;
    AnswersDiv.appendChild(buttonD);

    //RIGHT CONTAINER
    const right = document.createElement("div");
    right.classList.add("right");
    document.body.appendChild(right);
    const Prices = document.createElement("div");
    Prices.classList.add("price-list");
    right.appendChild(Prices);
    const PriceList = [
      "100",
      "200",
      "300",
      "500",
      "1 000",
      "2 000",
      "4 000",
      "8 000",
      "16 000",
      "32 000",
      "64 000",
      "125 000",
      "250 000",
      "500 000",
      "1 000 000",
    ];
    for (let i = PriceList.length - 1; i >= 0; i--) {
      console.log(PriceList[i]);
      const singlePrice = document.createElement("p");
      singlePrice.classList.add("question-list");
      singlePrice.classList.add(`question-${PriceList.indexOf(PriceList[i]) + 1}`);
      singlePrice.innerText = `${PriceList.indexOf(PriceList[i]) + 1}. $ ${PriceList[i]}`;
      Prices.appendChild(singlePrice);
    }
  }
}
