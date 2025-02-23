import { listImage } from "./listImage/listImage.js";
import { ImageButton } from "./listImage/imageButton.js";
import { actionBar } from "./actionBar/actionBar.js";
import { imageEditor } from "./imageEditor/imageEditor.js";
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
let actBar = new actionBar(listImg.getLeftBottomPoint(), {
  w: canvas.width,
  h: 60,
});
let imgEditor = new imageEditor(actBar.getLeftBottomPoint(), {
  w: canvas.width,
  h: canvas.height - actBar.getLeftBottomPoint().y,
});

const assets = {
  cross: "./image/cross.png",
  plus: "./image/plus.png",
  triangle: "./image/triangle.png",
  quadro: "./image/quadro.png",
  load: "./image/load.png",
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

        let addib = new ImageButton({
          x: null,
          y: null,
          width: 100,
          height: 100,
          margin: 10,
          image: loadedImages[`plus`],
          onClick: function () {
            console.log("Добавляем новую картинку!");
            listImg.pushBtt(creationBtt());
            listImg.setLastCurrentIndex();
          },
        });
        listImg.setAddingBtt(addib);

        let origib = new ImageButton({
          x: null,
          y: null,
          width: 100,
          height: 100,
          margin: 10,
          image: null,
          onClick: function () {
            console.log("Восстановленный оригинал!");
            listImg.setCurrentIndex(null);
            //
          },
        });
        origib.setStylesColor(`rgb(${100}, ${255}, ${100})`, `default`);
        origib.setStylesColor(`rgb(${100}, ${200}, ${100})`, `hover`);
        origib.setStylesColor(`rgb(${100}, ${100}, ${100})`, `active`);
        listImg.setOrigBtt(origib);

        actBar.pushBttGA(
          new ImageButton({
            x: 0,
            y: 0,
            width: 50,
            height: 50,
            margin: 3,
            image: loadedImages[`triangle`],
            onClick: function () {
              this.flag = !this.flag;
              this.image = this.flag
                ? loadedImages[`quadro`]
                : loadedImages[`triangle`];
              console.log(`Стартуем ГА ${this.flag}`);
            },
          })
        );

        actBar.pushBttGA(
          new ImageButton({
            x: 0,
            y: 0,
            width: 50,
            height: 50,
            margin: 3,
            image: loadedImages[`load`],
            onClick: function () {
              console.log(`Скачать особи`);
            },
          })
        );

        actBar.setStylesAllBttGA({
          default: {
            fill: `rgb(${100}, ${100}, ${255})`,
          },
          hover: {
            fill: `rgb(${0}, ${0}, ${255})`,
          },
          active: {
            fill: `rgb(${200}, ${200}, ${255})`,
          },
        });

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
    actBar.action(input.mouse.x, input.mouse.y, input.leftClick);
    imgEditor.action(input.mouse.x, input.mouse.y, input.leftClick);

    listImg.drawOnContext(ctx);
    actBar.drawOnContext(ctx);
    imgEditor.drawOnContext(ctx);
    //ib0.action(input.mouse.x, input.mouse.y, input.leftDown);
    //ib0.draw(ctx);
    input.resetClick();
  }
}

preloadImages();
//animate();
