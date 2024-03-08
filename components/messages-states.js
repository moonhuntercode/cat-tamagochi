export class MessageStates extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <div id="messages_container">
    <h1>tengo hambre!
     toca, la comida o leche  xd,donde quieras
    </h1>
    <br>
    </div>
    `;
  }
}
customElements.define("messages-states", MessageStates);
