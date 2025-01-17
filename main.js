// dame el código mejorado, comentado, no borres comentarios, sugerencias :
// main.js
// Importación de estilos y recursos multimedia
import "./style.css";
import catWhiteHappy from "./imgs/cat-white-happy.png";
import cat_black_skin from "./imgs/cat-black-skin-cute--lleno-2.png";
import catSad from "./imgs/cat-white-sad.png";

// three js config start
// Configuración y utilidades de Three.js
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "dat.gui";

// import modeloCat from "./models/cat-solo.glb";
// Componentes personalizados
import {
  catBody,
  ProgressLifeComponent,
  foodList,
  Footer,
  MessageStates,
  Login,
} from "./components";

// Inicialización de GUI
/* initialize GUI
  lo inizializamos arriba,
  para que el hoisting de js 
  no nos moleste a la hora
  de usar lo en cualquier parte */
const gui = new GUI();

// Exportación de referencias de estados del gato
export const catReady = {
  catSad: catSad,
  catWhiteHappy: catWhiteHappy,
};

// Renderizado inicial del HTML en el contenedor principal
// prettier-ignore
document.querySelector("#app").innerHTML =
    //html
    `
  <progress-life-component>
  </progress-life-component>
  <login-component></login-component>
  <cat-body></cat-body>
  <messages-states></messages-states>
  <food-list></food-list>
  <footer-component></footer-component> 
    `;

// Lógica para manejo de íconos en el componente de inicio de sesión
const firstCatIcon = document.querySelector("login-component svg");
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
        msg.textContent = "tengo hambre!,quiero más!";
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
camera.position.z = 7.5; //(VALUE)

// scene
const scene = new THREE.Scene();
// scene.background=new THREE.Color(0x000000);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
let heightRatio = 1.5;
renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
renderer.setPixelRatio(window.devicePixelRatio);

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.enablePan = true;
controls.enableDamping = true;

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
  if (letrero_3d.textContent !== "2D") {
    letrero_3d.textContent = "2D";

    personaje.innerHTML = "";
    personaje.appendChild(renderer.domElement);
    renderer.domElement;
  } else {
    letrero_3d.textContent = "3D";
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

// agregando al container visible para tests
// personaje.appendChild(renderer.domElement);
function loadModels() {
  // objeto 1 start - Mesh- malla

  // const geometry = new THREE.BoxGeometry(1, 1, 1);

  // const material = new THREE.MeshBasicMaterial({ color: "teal" });
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  // objeto 1 end
  // Instantiate a loader

  // Optional: Provide a DRACOLoader instance to decode compressed mesh data
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./node_modules/three/examples/jsm/libs/draco/gltf");
  const loader = new GLTFLoader();

  loader.setDRACOLoader(dracoLoader);
  // DRACOLOADER ENDS

  const option = {
    model1: "/models/cat-solo.glb",
  };
  let modeloElegido = option.model1;
  // Load a glTF resource
  loader.load(
    // resource URL
    `${option.model1}`,
    // called when the resource is loaded
    function (gltf) {
      const modelo = gltf.scene;
      modelo.traverse((e) => {
        if (e.isMesh == true) {
          e.castShadow = true;
          e.recieveShadow = true;
        }
      });

      const value = 0.5;
      modelo.scale.set(value, value, value);
      modelo.position.set(0, 0, -2);
      // añadiendo GUI para mover dinámicamente
      gui.add(modelo.position, "x", -5, 5).name("Mod-Pos X Axis");
      modelo.position.x = 0;
      gui.add(modelo.position, "y", -5, 5).name("Mod-Pos y Axis");
      modelo.position.y = -1.1;
      gui.add(modelo.position, "z", -5, 5).name("Mod-Pos z Axis");
      modelo.position.z = 0;
      gui.add(modelo.rotation, "x", -1, 2).name("Mod-Rotate X Axis");
      modelo.rotation.x = -1;
      gui.add(modelo.rotation, "y", -2, 2).name("Mod-Rotate Y Axis");
      modelo.rotation.y = -1.6;
      gui.add(modelo.rotation, "z", -2, 2).name("Mod-Rotate z Axis");
      modelo.rotation.z = -1.1;

      // gltf.animations; // Array<THREE.AnimationClip>
      // gltf.scene; // THREE.Group
      // gltf.scenes; // Array<THREE.Group>
      // gltf.cameras; // Array<THREE.Camera>
      // gltf.asset; // Object}
      // // camera.lookAt(gltf.scene.position);
      scene.add(modelo);
      animate();

      // click on gui to close
      document.querySelector(".close-bottom").click();
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
      console.log(error);
    }
  );
  // END  MODEL
}
loadModels();

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
