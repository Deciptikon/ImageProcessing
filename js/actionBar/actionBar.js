export class actionBar {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.margin = 5;
    this.space = 10;

    this.isDrawOrigin = false;

    this.listBttOrigin = [];
    this.listBttGA = [];

    this.initLocalCanvas();
  }

  initLocalCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size.w;
    this.canvas.height = this.size.h;
    this.ctx = this.canvas.getContext("2d");
  }

  action(x, y, isClicked) {
    if (this.listBttGA.length > 0) {
      this.listBttGA.forEach((btt, i) => {
        btt.action(x - this.position.x, y - this.position.y, isClicked);
      });
    }
    if (this.isDrawOrigin && this.listBttOrigin.length > 0) {
      this.listBttOrigin.forEach((btt, i) => {
        btt.action(x - this.position.x, y - this.position.y, isClicked);
      });
    }
  }

  draw() {
    this.ctx.save();

    this.ctx.fillStyle = `rgb(${100}, ${100}, ${255})`;
    this.ctx.fillRect(0, 0, this.size.w, this.size.h);

    let xbtt = this.margin;
    const ybtt = this.margin;
    if (this.listBttGA.length > 0) {
      this.listBttGA.forEach((btt, i) => {
        btt.setPosition(xbtt, ybtt);
        btt.draw(this.ctx);
        xbtt += btt.getSize().w + this.space;
      });
    }
    xbtt += this.space;
    if (this.isDrawOrigin && this.listBttOrigin.length > 0) {
      this.listBttOrigin.forEach((btt, i) => {
        btt.setPosition(xbtt, ybtt);
        btt.draw(this.ctx);
        xbtt += btt.getSize().w + this.space;
      });
    }

    this.ctx.restore();
  }

  drawOnContext(ctx) {
    this.draw();
    ctx.drawImage(this.canvas, this.position.x, this.position.y);
  }

  getLeftBottomPoint() {
    return { x: this.position.x, y: this.position.y + this.size.h };
  }

  pushBttGA(btt) {
    this.listBttGA.push(btt);
  }

  pushBttOrigin(btt) {
    this.listBttOrigin.push(btt);
  }

  setStylesAllBttGA(styles) {
    if (this.listBttGA.length > 0) {
      this.listBttGA.forEach((btt, i) => {
        btt.setStylesColor(styles[`default`].fill, `default`);
        btt.setStylesColor(styles[`hover`].fill, `hover`);
        btt.setStylesColor(styles[`active`].fill, `active`);
      });
    }
  }
}
