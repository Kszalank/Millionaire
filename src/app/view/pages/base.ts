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
    button1.classList.add("life-rings__option");
    button1.classList.add("life-rings__option--fiftyfifty");
    button1.innerText = "50:50";
    lifeRings.appendChild(button1);
    const button2 = document.createElement("button");
    button2.classList.add("life-rings__option");
    button2.classList.add("life-rings__option--telephone");
    button2.innerHTML = `<img src=${phone} alt="phone">`;
    lifeRings.appendChild(button2);
    const button3 = document.createElement("button");
    button3.classList.add("life-rings__option");
    button3.classList.add("life-rings__option--audience");
    button3.innerHTML = `<img src=${audience} alt="audience">`;
    lifeRings.appendChild(button3);
    // LOGO
    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.innerHTML = `<img src=${backgroundLogo} alt="logo">`;
    mid.appendChild(logo);
    //-QUESTION
    const question = document.createElement("div");
    question.classList.add("question");
    question.innerText = "Odor-Eaters are designed to be used where?";
    mid.appendChild(question);
    //-ANSWERS DIV
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");
    mid.appendChild(answersDiv);
    //--ANSWER BUTTONS
    const buttonA = document.createElement("button");
    buttonA.classList.add("answers__option");
    buttonA.classList.add("answers__option--A");
    buttonA.innerHTML = `<span class="index option-index-A">A: </span>AnswerA`;
    answersDiv.appendChild(buttonA);
    const buttonB = document.createElement("button");
    buttonB.classList.add("answers__option");
    buttonB.classList.add("answers__option--B");
    buttonB.innerHTML = `<span class="index option-index-B">B: </span>AnswerB`;
    answersDiv.appendChild(buttonB);
    const buttonC = document.createElement("button");
    buttonC.classList.add("answers__option");
    buttonC.classList.add("answers__option--C");
    buttonC.innerHTML = `<span class="index option-index-C">C: </span>AnswerC`;
    answersDiv.appendChild(buttonC);
    const buttonD = document.createElement("button");
    buttonD.classList.add("answers__option");
    buttonD.classList.add("answers__option--D");
    buttonD.innerHTML = `<span class="index option-index-D">D: </span>AnswerD`;
    answersDiv.appendChild(buttonD);

    //RIGHT CONTAINER
    const right = document.createElement("div");
    right.classList.add("right");
    document.body.appendChild(right);
    const prices = document.createElement("div");
    prices.classList.add("price-list");
    right.appendChild(prices);
    const priceList = [
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

    priceList.reverse().forEach((item) => {
      const singlePrice = document.createElement("p");
      singlePrice.classList.add("price-list__item");
      singlePrice.classList.add(`price-list__item--${priceList.reverse().indexOf(item) + 1}`);
      singlePrice.innerText = `${priceList.indexOf(item) + 1}. `;
      priceList.reverse();
      singlePrice.innerText += `$ ${item}`;
      prices.appendChild(singlePrice);
      console.log(item);
    });
  }
}
