import { catReady } from "../main";

export class catBody extends HTMLElement {
  constructor() {
    super();
    // prettier-ignore
    this.innerHTML =
      /*html*/
      `
    <div id="cat_container">
    <!// cambiar imagen a gato 3d-->
    <img id='cat' src="${catReady.catSad}" alt="cat1">
    <br>
    <div id="letrero_3d">3D</div> 
    <br>
    </div>
    
    `;
  }
}
customElements.define("cat-body", catBody);
