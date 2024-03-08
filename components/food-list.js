import fish from "../imgs/fish.png";
import milk from "../imgs/milk-1.png";
import replay from "../imgs/replay-icon.png";

export class foodList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <hr>
    <h1>List of Actions</h1>
    <div id="food_images">
    <img id="fish" src="${fish}" alt="fish">
    <img id="milk" src="${milk}" alt="milk">
    <img src="${replay}" alt="replay icon" id="replay_icon">
    <br>
    </div>
    `;
  }
}

customElements.define("food-list", foodList);
