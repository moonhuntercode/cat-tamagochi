import javascriptLogo from "../javascript.svg";
import viteLogo from "/vite.svg";

export class Footer extends HTMLElement {
  constructor() {
    super();
    // prettier-ignore
    this.innerHTML = //html
    `
    <hr>
    <div id="old">
    <a href="https://vitejs.dev" target="_blank">
    <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    
    <div class="card">
      <button id="btnReset" type="button">
      RESET</button>
      </div>
    <p class="read-the-docs">
    Click on the Vite logo to learn more
    </p>
    </div>
    `;
  }
}
customElements.define("footer-component", Footer);
