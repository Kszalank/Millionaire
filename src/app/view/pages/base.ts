export class LeftPart {
  constructor() {}

  static render() {
    const exampleElement = document.createElement("div");
    exampleElement.classList.add("part-left");
    document.body.appendChild(exampleElement);
  }
}
