import "./style.css";
import catWhiteHappy from "./imgs/cat-white-happy.png";
import cat_black_skin from "./imgs/cat-black-skin-cute--lleno-2.png";
import catSad from "./imgs/cat-white-sad.png";
import { GUI } from "dat.gui";

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
function aumentaVida(life, cat, fishImage, milkImage) {
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

// three js config start
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import modelo1 from "/model/cat-solo-2.glb";

/* initialize GUI
lo inizializamos arriba,
para que el hoisting de js 
no nos moleste a la hora
de usar lo en cualquier parte */
const gui = new GUI();

document.querySelector(".close-bottom").click();
// camera start
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// camera.lookAt(0, 0, 0);
gui.add(camera.position, "x", -3, 1.5).name("CAM-POS X Axis");
// camera.position.x=125; //(VALUE)

gui.add(camera.position, "y", -3, 1.5).name("CAM-POS Y Axis");
// camera.position.y=125; //(VALUE)
gui.add(camera.position, "z", -3, 10).name("CAM-POS Z Axis");
// camera.position.z=125; //(VALUE)

// scene
const scene = new THREE.Scene();
// scene.background=new THREE.Color(0x000000);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
renderer.setPixelRatio(window.devicePixelRatio);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// light
const mainLight = new THREE.DirectionalLight(0xffffff, 2);
mainLight.position.set(5, 1, 1);

const hemisphereLight = new THREE.HemisphereLight(0xfff, 0x202020, 4);
scene.add(mainLight, hemisphereLight);
// dirección de el personaje
const personaje = document.querySelector("#character_container");

// 3d actions}
const letrero_3d = document.querySelector("#letrero_3d");
letrero_3d.addEventListener("click", () => {
  if (letrero_3d.textContent !== "2d") {
    letrero_3d.textContent = "2d";

    personaje.innerHTML = "";
    personaje.appendChild(renderer.domElement);
    renderer.domElement;
  } else {
    letrero_3d.textContent = "3d";

    personaje.innerHTML = "";
    const img = document.createElement("img");
    img.src = `${catSad}`;
    img.id = "cat";
    img.alt = "cat1";
    personaje.appendChild(img);
    console.log("aa");
    location.reload();
  }
});
// personaje.appendChild(renderer.domElement);

// objeto 1 start - Mesh- malla

// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const material = new THREE.MeshBasicMaterial({ color: "teal" });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// objeto 1 end
// Instantiate a loader
const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/");
loader.setDRACOLoader(dracoLoader);
// Load a glTF resource
loader.load(
  // resource URL
  `${modelo1}`,
  // called when the resource is loaded
  function (gltf) {
    scene.add(gltf.scene);
    const modelo = gltf.scene;

    const value = 0.5;
    modelo.scale.set(value, value, value);
    modelo.position.set(0, 0, -2);
    // añadiendo GUI para mover dinámicamente
    gui.add(modelo.position, "x", -5, 5).name("Mod-Pos X Axis");
    // modelo.position.x = 0;
    gui.add(modelo.position, "y", -5, 5).name("Mod-Pos y Axis");
    modelo.position.y = -1;
    gui.add(modelo.position, "z", -5, 5).name("Mod-Pos z Axis");
    // modelo.position.z = 0;
    gui.add(modelo.rotation, "x", -1, 2).name("Mod-Rotate X Axis");
    modelo.rotation.x = -1;
    gui.add(modelo.rotation, "y", -2, 2).name("Mod-Rotate Y Axis");
    modelo.rotation.y = -1.5;
    gui.add(modelo.rotation, "z", -2, 2).name("Mod-Rotate z Axis");
    modelo.rotation.z = -1.1;

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object}
    // camera.lookAt(gltf.scene.position);
  },
  // called while loading is progressing
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function (error) {
    console.log("An error happened");
  }
);
camera.position.z = 3;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
}

animate();
replayImage.addEventListener("click", reset);

document.querySelector("#btnReset").addEventListener("click", reset);

aumentaVida(
  document.querySelector("#life"),
  document.querySelector("img#cat"),
  document.querySelector("img#fish"),
  document.querySelector("img#milk")
);
