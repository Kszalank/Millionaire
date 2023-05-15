export class EndGameWindow {
  openWindow() {
    const endWindow = document.createElement("div");
    const endPriceWindow = document.createElement("div");
    const mid = document.getElementsByClassName("mid");
    const restartButton = document.createElement("button");
    const priceInfo = document.createElement("div");

    endWindow.style.position = "absolute";
    endWindow.style.width = "50%";
    endWindow.style.height = "50%";
    endWindow.style.top = "25%";
    endWindow.style.left = "25%";
    endWindow.style.background = "#071319";
    endWindow.style.border = "1px solid #e1a02e";
    endWindow.style.borderRadius = "50px";
    endPriceWindow.style.display = "flex";
    endPriceWindow.style.flexWrap = "wrap-reverse";
    endPriceWindow.style.position = "relative";
    endPriceWindow.style.width = "75%";
    endPriceWindow.style.height = "60%";
    endPriceWindow.style.top = "5%";
    endPriceWindow.style.left = "12.5%";
    endPriceWindow.style.background = "#071319";
    endPriceWindow.style.border = "1px solid #e1a02e";
    endPriceWindow.style.textAlign = "center";
    endPriceWindow.style.justifyContent = "space-around";
    endPriceWindow.style.alignContent = "center";
    endPriceWindow.style.fontFamily = "Inter";
    endPriceWindow.style.color = "#e1a02e";
    endPriceWindow.id = "endPriceWindow";

    restartButton.style.position = "relative";
    restartButton.style.width = "25%";
    restartButton.style.height = "10%";
    restartButton.style.top = "20%";
    restartButton.style.left = "0";
    restartButton.style.background = "#071319";
    restartButton.style.border = "1px solid #e1a02e";
    restartButton.style.borderRadius = "50px";
    restartButton.style.fontFamily = "Inter";
    restartButton.style.color = "#e1a02e";
    restartButton.innerText = "Restart";

    endWindow.appendChild(endPriceWindow);
    endWindow.appendChild(priceInfo);
    endWindow.appendChild(restartButton);
    restartButton.addEventListener("click", () => {
      location.reload();
    });
    mid[0].appendChild(endWindow);
  }
}
