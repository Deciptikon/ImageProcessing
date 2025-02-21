import { ImageButton } from "./imageButton.js";

export class listImage {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.margin = 10;
    this.space = 10;
    this.shift = 0;

    this.listSourceImage = [];
    this.listImg = [];
    this.listBtt = [];
    this.addingBtt = null;
    this.currentIndex = null;

    this.initLocalCanvas();
  }

  initLocalCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size.w;
    this.canvas.height = this.size.h;
    this.ctx = this.canvas.getContext("2d");
  }

  draw() {
    this.ctx.save();

    this.ctx.fillStyle = `rgb(${200}, ${200}, ${200})`;
    this.ctx.fillRect(0, 0, this.size.w, this.size.h);

    let xbtt = this.margin;
    const ybtt = this.margin;
    if (this.listBtt.length > 0) {
      this.listBtt.forEach((btt, i) => {
        const border = i === this.currentIndex ? true : false;
        btt.setPosition(xbtt - this.shift, ybtt);
        btt.draw(this.ctx, border);
        xbtt += btt.getSize().w + this.space;
      });
    }

    this.addingBtt.setPosition(xbtt - this.shift, ybtt);
    this.addingBtt.draw(this.ctx);

    this.ctx.restore();
  }

  action(x, y, isClicked) {
    console.log(`this.listBtt.length = ${this.listBtt.length}`);
    if (this.listBtt.length > 0) {
      this.listBtt.forEach((btt) => {
        btt.action(x, y, isClicked);
      });
    }
    this.addingBtt.action(x, y, isClicked);
  }

  drawOnContext(ctx) {
    this.draw();
    ctx.drawImage(this.getCanvas(), this.getPosition().x, this.getPosition().y);
  }

  pushBtt(btt) {
    btt.setIndexForDelete(this.listBtt.length);
    this.listBtt.push(btt);
  }

  setAddingBtt(btt) {
    this.addingBtt = btt;
  }

  getPosition() {
    return this.position;
  }

  getCanvas() {
    return this.canvas;
  }

  getButton(index) {
    if (this.listBtt.length > 0 && this.listBtt.length > index) {
      return this.listBtt[index];
    }
    return null;
  }

  deleteBtt(index) {
    if (this.listBtt.length > 0 && this.listBtt.length > index) {
      this.getButton(index).delete();
      this.listBtt.splice(index, 1);
      if (index < this.listBtt.length) {
        for (let i = index; i < this.listBtt.length; i++) {
          this.listBtt[i].setIndexForDelete(i);
        }
        if (!(this.currentIndex < this.listBtt.length)) {
          this.currentIndex = null;
        }
      }
      if (this.listBtt == null) {
        this.listBtt = [];
        this.currentIndex = null;
      }
    }
  }

  setCurrentIndex(index) {
    this.currentIndex = index;
  }

  setLastCurrentIndex() {
    this.currentIndex = this.listBtt.length - 1;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }
}
