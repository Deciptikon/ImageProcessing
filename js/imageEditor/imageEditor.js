export class imageEditor {
  constructor(position, size) {
    this.position = position;
    this.size = size;
    this.initLocalCanvas();
  }

  initLocalCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.size.w;
    this.canvas.height = this.size.h;
    this.ctx = this.canvas.getContext("2d");
  }

  action(x, y, isClicked) {
    //
  }

  draw() {
    this.ctx.save();

    this.ctx.fillStyle = `rgb(${100}, ${255}, ${255})`;
    this.ctx.fillRect(0, 0, this.size.w, this.size.h);

    this.ctx.restore();
  }

  drawOnContext(ctx) {
    this.draw();
    ctx.drawImage(this.canvas, this.position.x, this.position.y);
  }

  getLeftBottomPoint() {
    return { x: this.position.x, y: this.position.y + this.size.h };
  }
}
