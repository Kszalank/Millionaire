export class QuestionButton {
  index: string;
  answer: string;
  onAnswerClick: Function;

  constructor(index: string, answer: string, onAnswerClick: Function) {
    this.index = index;
    this.answer = answer;
    this.onAnswerClick = onAnswerClick;
  }

  render() {
    const button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("answers__option");
    button.classList.add(`answers__option--${this.index}`);
    button.innerHTML = `<span class="index option-index-${this.index}">${this.index}: </span>${this.answer}`;
    button.addEventListener("click", () => this.onAnswerClick(this.answer));

    return button;
  }
}
