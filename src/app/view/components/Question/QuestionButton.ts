export class QuestionButton {
  index: string;
  answer: string;

  constructor(index: string, answer: string) {
    this.index = index;
    this.answer = answer;
  }

  render() {
    const button = document.createElement("button");
    button.classList.add("answers__option");
    button.classList.add(`answers__option--${this.index}`);
    button.innerHTML = `<span class="index option-index-${this.index}">${this.index}: </span>${this.answer}`;

    return button;
  }
}
