export class InputManager {
  constructor() {
    this.keys = new Set();
    this.deltaY = 0;
    this.mouse = { x: 0, y: 0 };
    this.active = false;
    this.leftDown = false;
    this.rightDown = false;
    this.leftUp = false;
    this.rightUp = false;
    this.leftClick = false;
    this.isMove = false;

    window.addEventListener("keydown", (e) => {
      this.keys.add(e.key);
      this.active = true;
      console.log(`add ${e.key}`);
    });

    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.key);
      this.active = true;
    });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.deltaY = 0;
      this.leftUp = false;
      this.rightUp = false;
      this.isMove = true;
      this.active = true;
    });

    window.addEventListener("mousedown", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.active = true;
      this.deltaY = 0;
      this.leftUp = false;
      this.rightUp = false;
      this.leftClick = false;

      if (e.button === 0) {
        this.leftDown = true;
        console.log("Левая кнопка");
      } else if (e.button === 2) {
        this.rightDown = true;
        console.log("Правая кнопка");
      }
    });

    window.addEventListener("mouseup", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.deltaY = 0;
      this.active = true;
      this.leftClick = false;

      if (e.button === 0) {
        this.leftUp = true;
        console.log("Левая кнопка");
      } else if (e.button === 2) {
        this.rightUp = true;
        console.log("Правая кнопка");
      }
      this.leftDown = false;
      this.rightDown = false;
    });

    window.addEventListener("click", (e) => {
      //console.log("Клик!", e.clientX, e.clientY);
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.leftClick = true;
      this.active = true;
    });

    window.addEventListener("wheel", (e) => {
      this.deltaY = e.deltaY;
      if (this.deltaY < 0) {
        console.log("Колесо вверх");
      } else if (this.deltaY > 0) {
        console.log("Колесо вниз");
      }
      this.active = true;
    });
  }

  getActivity() {
    let active = this.active ? true : false;
    this.active = false;

    return active;
  }

  getMove() {
    let mv = this.isMove ? true : false;
    this.isMove = false;

    return mv;
  }

  resetClick() {
    this.leftClick = false;
  }
}

export const input = new InputManager();
