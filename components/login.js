export class Login extends HTMLElement {
  constructor() {
    super();
    // prettier-ignore
    this.innerHTML =//html
      `
        <form method="get" 
        action="../submission.html"
        id="login_container">
        <label for="username">username</label>
        
       <input type="text" name="username" 
       required
      pattern="[a-zA-Z0-9]+"
      id="username">
       <label for="password">password</label>
       
       <input type="password" name="password" id="password">
       <input type="submit" value="login">
       </form>

        `;
  }
}
let regex = /[0-9]{14,16}/;
let res = regex.test("123467891234567");
console.log(res);

customElements.define("login-component", Login);
