import "./style.css";
import catWhiteHappy from "./imgs/cat-white-happy.png";
import cat_black_skin from "./imgs/cat-black-skin-cute--lleno-2.png";
import catSad from "./imgs/cat-white-sad.png";
export const catReady = {
  catSad: catSad,
  catWhiteHappy: catWhiteHappy,
};

import { catBody, lifeState, foodList, Footer, MessageStates, Login } from "./components";

// prettier-ignore
document.querySelector("#app").innerHTML =
  //html
  `
<life-state></life-state>
<login-component></login-component>
<cat-body></cat-body>
<messages-states></messages-states>
<food-list></food-list>
<footer-component></footer-component> 
  `;
const firstCatIcon = document.querySelector("login-component  svg");

// tests
console.log(firstCatIcon);
function mostrarVentana_uno() {
  console.log("click on cat icon");
  const form = document.querySelector("#login_container");
  // form.style.visibility = "visible";

  if (form.style.visibility !== "visible") {
    firstCatIcon.style.stroke = "none";
    form.style.visibility = "visible";
  } else {
    firstCatIcon.style.stroke = "#ef4";

    form.style.visibility = "hidden";
  }
}

firstCatIcon.addEventListener("click", mostrarVentana_uno);

const msg = document.querySelector("div#messages_container>h1");
function aumentaVida(life) {
  const cat = document.querySelector("img#cat");
  const fishImage = document.querySelector("img#fish");
  const milkImage = document.querySelector("img#milk");
  [fishImage, milkImage].forEach((image) => {
    image.addEventListener("click", () => {
      life.value += 20;
      if (life.value >= 50 && life.value < 100) {
        cat.src = `${catWhiteHappy}`;
        msg.textContent = "muchas gracias,+ comida!";
      } else if (life.value >= 100) {
        cat.src = `${cat_black_skin}`;
        msg.textContent = "muchas gracias, me llené!";
      } else {
        cat.src = `${catReady.catSad}`;
        msg.textContent = "tengo hambre!";
      }
    });
  });
}
const replayImage = document.querySelector("img#replay_icon");
function reset() {
  life.value = 0;
  cat.src = `${catReady.catSad}`;
  msg.textContent = "tengo hambre! toca, la comida o leche xd,donde quieras";
}
replayImage.addEventListener("click", reset);
aumentaVida(document.querySelector("#life"));
document.querySelector("#btnReset").addEventListener("click", reset);
