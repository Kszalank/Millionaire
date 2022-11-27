export type LifeLine = "50:50" | "friend" | "audience";
export class LifeLineModel {
  availableLifeLines: LifeLine[] = ["50:50", "friend", "audience"];

  disableLifeLine(usedLifeLine: "50:50" | "friend" | "audience") {
    if (this.availableLifeLines.includes(usedLifeLine)) {
      this.availableLifeLines.splice(this.availableLifeLines.indexOf(usedLifeLine), 1);
    } else {
      throw new Error("Lifeline already used or doesn't exist");
    }
  }
}
