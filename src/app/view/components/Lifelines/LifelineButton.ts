import phone from "../../../../assets/img/phone.svg";
import audience from "../../../../assets/img/audience.svg";
export class LifeRings {
  constructor() {}

  static render() {
    const lifeRings = document.createElement("div");
    lifeRings.classList.add("life-rings");
    const button1 = document.createElement("button");
    button1.classList.add("life-rings__option");
    button1.classList.add("life-rings__option--fiftyfifty");
    button1.id = "fiftyfifty";
    button1.innerText = "50:50";
    lifeRings.appendChild(button1);
    const button2 = document.createElement("button");
    button2.classList.add("life-rings__option");
    button2.classList.add("life-rings__option--telephone");
    button2.id = "phone";
    button2.innerHTML = `<img src=${phone} alt="phone">`;
    lifeRings.appendChild(button2);
    const button3 = document.createElement("button");
    button3.classList.add("life-rings__option");
    button3.classList.add("life-rings__option--audience");
    button3.id = "audience";
    button3.innerHTML = `<img src=${audience} alt="audience">`;
    lifeRings.appendChild(button3);
    return lifeRings;
  }
}
