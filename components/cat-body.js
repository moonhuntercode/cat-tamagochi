import { catReady } from "../main";

export class catBody extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<img id='cat' src="${catReady.catSad}" alt="cat1">`;
  }
}
customElements.define("cat-body", catBody);
