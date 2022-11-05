import { MoneyPrizeListItem } from "../MoneyPrizeList/MoneyPrizeListItem";
export class MoneyPrizeList {
  constructor() {}

  static render() {
    const prices = document.createElement("div");
    prices.classList.add("price-list");
    const priceList = [
      "1 000 000",
      "500 000",
      "250 000",
      "125 000",
      "64 000",
      "32 000",
      "16 000",
      "8 000",
      "4 000",
      "2 000",
      "1 000",
      "500",
      "300",
      "200",
      "100",
    ];

    priceList.forEach((item, index) => {
      const moneyPrizeListItem = new MoneyPrizeListItem(item, index);
      prices.appendChild(moneyPrizeListItem.render(priceList.length));
    });
    return prices;
  }
}
