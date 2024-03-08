import barraVida from "../imgs/barra-vida.png";
import corazonIcon from "../imgs/corazon-icon-r.png";
export class lifeState extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div id="progress_container">
    <img src="${corazonIcon}" alt="barraVida">
    <progress value="32" max="100" id="life"></progress>
    </div>
    `;
  }
}
customElements.define("life-state", lifeState);
