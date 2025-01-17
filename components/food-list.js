// food-list.js
import fish from "../imgs/fish.png";
import milk from "../imgs/milk-1.png";
import replay from "../imgs/replay-icon.png";

export class foodList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML =
      /*html*/
      `
    <hr>
    <h2>List of Actions</h2>
    <div id="food_images">

    <img id="fish" src="${fish}" alt="fish">

    <img id="milk" src="${milk}" alt="milk">
    
    <img id="replay_icon"
    src="${replay}"
    alt="replay icon">
    
    </div>
    `;
  }
}

customElements.define("food-list", foodList);
