export class LifeLineModel {
  availableLifeLines: string[] = ["50:50", "friend", "audience"];

  constructor() {}

  disableLifeLine(usedLifeLine: string) {
    if (this.availableLifeLines.includes(usedLifeLine)) {
      this.availableLifeLines.splice(this.availableLifeLines.indexOf(usedLifeLine), 1);
    } else {
      throw new Error("Lifeline already used or doesn't exist");
    }
    return this.availableLifeLines;
  }
}
