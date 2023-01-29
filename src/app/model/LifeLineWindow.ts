type LLWindow = LifeLineWindowClass;
export class LifeLineWindowClass {
  openLifeLineWindow() {
    const lifeLineWindow = document.createElement("div");
    const correctAnswerWindow = document.createElement("div");
    correctAnswerWindow.id = "answerWindow";

    const acceptButton = document.createElement("button");
    const mid = document.getElementsByClassName("mid");
    lifeLineWindow.style.position = "absolute";
    lifeLineWindow.style.width = "50%";
    lifeLineWindow.style.height = "40%";
    lifeLineWindow.style.top = "20%";
    lifeLineWindow.style.left = "25%";
    lifeLineWindow.style.background = "#071319";
    lifeLineWindow.style.border = "1px solid #e1a02e";
    lifeLineWindow.style.borderRadius = "50px";

    correctAnswerWindow.style.display = "flex";
    correctAnswerWindow.style.flexWrap = "wrap-reverse";
    correctAnswerWindow.style.position = "relative";
    correctAnswerWindow.style.width = "75%";
    correctAnswerWindow.style.height = "60%";
    correctAnswerWindow.style.top = "5%";
    correctAnswerWindow.style.left = "12.5%";
    correctAnswerWindow.style.background = "#071319";
    correctAnswerWindow.style.border = "1px solid #e1a02e";
    correctAnswerWindow.style.textAlign = "center";
    correctAnswerWindow.style.justifyContent = "space-around";
    correctAnswerWindow.style.alignContent = "flex-start";
    correctAnswerWindow.style.fontFamily = "Inter";
    correctAnswerWindow.style.color = "#e1a02e";
    acceptButton.style.position = "relative";
    acceptButton.style.width = "25%";
    acceptButton.style.height = "10%";
    acceptButton.style.top = "20%";
    acceptButton.style.left = "0";
    acceptButton.style.background = "#071319";
    acceptButton.style.border = "1px solid #e1a02e";
    acceptButton.style.borderRadius = "50px";
    acceptButton.style.fontFamily = "Inter";
    acceptButton.style.color = "#e1a02e";
    acceptButton.innerText = "Thank you";

    lifeLineWindow.appendChild(correctAnswerWindow);
    lifeLineWindow.appendChild(acceptButton);
    mid[0].appendChild(lifeLineWindow);
    acceptButton.addEventListener("click", () => {
      lifeLineWindow.remove();
    });
  }
}
