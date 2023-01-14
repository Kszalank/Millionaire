export class MoneyPrizeListItem {
  item: string;
  index: number;

  constructor(item: string, index: number) {
    this.item = item;
    this.index = index;
  }

  render(length: number) {
    const singlePrice = document.createElement("p");
    singlePrice.classList.add("price-list__item");
    singlePrice.classList.add(`price-list__item--${length - this.index}`);
    singlePrice.innerHTML = `${length - this.index}. $ <span>${this.item}</span>`;
    return singlePrice;
  }
}
