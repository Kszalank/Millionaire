export class Question {
  constructor() {}

  static render() {
    const questionAndAnswers = document.createElement("div");
    const question = document.createElement("div");
    question.classList.add("question");
    question.innerText = "Odor-Eaters are designed to be used where?";
    questionAndAnswers.appendChild(question);
    //-ANSWERS DIV
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");
    questionAndAnswers.appendChild(answersDiv);
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
    return questionAndAnswers;
  }
}
