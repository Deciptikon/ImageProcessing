import { listImage } from "./listImage/listImage.js";
import { ImageButton } from "./listImage/imageButton.js";
import { input } from "./inputManager.js";

const FPS = 30.0;

const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.tabIndex = 1000;
canvas.focus();
let startTimer = performance.now();

const ctx = canvas.getContext("2d");

let needUpdate = true;

let listImg = new listImage({ x: 0, y: 0 }, { w: canvas.width, h: 130 });

const assets = {
  cross: "./image/cross.png",
  plus: "./image/plus.png",
};

const loadedImages = {};

function preloadImages() {
  Object.keys(assets).forEach((key) => {
    const img = new Image();
    img.src = assets[key];
    img.onload = () => {
      console.log("ok");
      loadedImages[key] = img;
      if (Object.keys(loadedImages).length === Object.keys(assets).length) {
        console.log("--> animate()");

        function creationBtt() {
          let ib0 = new ImageButton({
            x: 10,
            y: 10,
            width: 100,
            height: 100,
            margin: 5,
            image: null,
            onClick: function () {
              const i = this.getIndexForDelete();
              console.log(`Выбрана картинка #${i}`);
              listImg.setCurrentIndex(i);
            },
          });
          let isb0 = new ImageButton({
            x: 80,
            y: 0,
            width: 20,
            height: 20,
            margin: 0,
            image: loadedImages[`cross`],
            onClick: function () {
              const i = this.getIndexForDelete();
              console.log(`Удаляем картинку #${i}`);
              listImg.deleteBtt(i);
            },
          });
          //isb0.setStylesColor(`rgb(${100}, ${255}, ${100})`, `default`);
          //isb0.setStylesColor(`rgb(${100}, ${200}, ${100})`, `hover`);
          //isb0.setStylesColor(`rgb(${100}, ${100}, ${100})`, `active`);
          ib0.addSubButton(isb0);
          return ib0;
        }

        let ib0 = creationBtt();

        listImg.pushBtt(ib0);

        let addib0 = new ImageButton({
          x: null,
          y: null,
          width: 100,
          height: 100,
          margin: 10,
          image: loadedImages[`plus`],
          onClick: () => {
            console.log("Добавляем новую картинку!");
            listImg.pushBtt(creationBtt());
            listImg.setLastCurrentIndex();
          },
        });
        listImg.setAddingBtt(addib0);

        animate();
        console.log("animate() -->");
      }
    };
  });
}

function animate() {
  requestAnimationFrame(animate);
  const deltaTime = performance.now() - startTimer;
  if (deltaTime > 1000.0 / FPS) {
    startTimer = performance.now();
    //needUpdate = true;
  }

  if (needUpdate || input.getActivity() || input.getMove()) {
    needUpdate = false;
    ctx.fillStyle = `rgb(${255}, ${255}, ${255})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //const img = new Image();
    //img.src = "./image/cross.png";
    //img.onload = function () {};
    //ctx.drawImage(loadedImages[`cross`], 100, 100, 100, 100);
    listImg.action(input.mouse.x, input.mouse.y, input.leftClick);
    listImg.drawOnContext(ctx);
    //ib0.action(input.mouse.x, input.mouse.y, input.leftDown);
    //ib0.draw(ctx);
    input.resetClick();
  }
}

preloadImages();
//animate();
