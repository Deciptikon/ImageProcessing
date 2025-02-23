export class ImageButton {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.margin = options.margin;
    this.image = options.image;
    this.onClick = options.onClick;
    this.listSubButton = [];
    this.indexForDelete = null;
    this.flag = false;

    // Стили для разных состояний
    this.styles = {
      default: {
        fill: `rgb(${255}, ${100}, ${100})`,
      },
      hover: {
        fill: `rgb(${155}, ${50}, ${50})`,
      },
      active: {
        fill: `rgb(${255}, ${200}, ${200})`,
      },
    };

    this.state = "default";
    this.isPressed = false;

    this.initLocalCanvas();
  }

  setStylesColor(color, style) {
    this.styles[style].fill = color;
  }

  initLocalCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
  }

  // Отрисовка кнопки
  draw(ctx, border = false) {
    this.ctx.save();
    const style = this.styles[this.state];

    this.ctx.fillStyle = style.fill;
    this.ctx.fillRect(0, 0, this.width, this.height);

    if (this.image !== null) {
      this.ctx.drawImage(
        this.image,
        this.margin, // Позиция X
        this.margin, // Позиция Y
        this.width - 2 * this.margin,
        this.height - 2 * this.margin // Размер на экране
      );
    }

    if (border) {
      this.ctx.strokeStyle = "black";
      this.ctx.lineWidth = 4;
      this.ctx.strokeRect(2, 2, this.width - 4, this.height - 4);
    }

    if (this.listSubButton.length > 0) {
      this.listSubButton.forEach((subButton) => {
        subButton.draw(this.ctx);
      });
    }
    this.ctx.restore();

    ctx.drawImage(this.canvas, this.x, this.y);
  }

  addSubButton(button) {
    this.listSubButton.push(button);
  }

  isPointInside(x, y) {
    if (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    ) {
      return true;
    }
    return false;
  }

  action(x, y, isClicked) {
    //console.log(`x=${x}, y=${y}, isClicked=${isClicked}`);
    if (this.isPointInside(x, y)) {
      let subResult = false;
      if (this.listSubButton.length > 0) {
        this.listSubButton.forEach((subButton) => {
          let res = subButton.action(x - this.x, y - this.y, isClicked);
          subResult = subResult || res;
        });
      }
      if (subResult) {
        return false;
      }
      if (isClicked) {
        this.updateState(`active`);
        if (this.onClick !== null) {
          this.onClick();
        }
      } else {
        this.updateState(`hover`);
      }
      return true;
    } else {
      this.updateState(`default`);
    }
  }

  updateState(newState) {
    //console.log(`newState=${newState}`);
    this.state = newState;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getSize() {
    return { w: this.width, h: this.height };
  }

  setIndexForDelete(index) {
    this.indexForDelete = index;
    if (this.listSubButton.length > 0) {
      this.listSubButton.forEach((subButton) => {
        subButton.setIndexForDelete(index);
      });
    }
  }

  getIndexForDelete() {
    return this.indexForDelete;
  }

  delete() {
    this.image = null;
    this.onClick = null;
    this.canvas = null;
    this.ctx = null;

    if (this.listSubButton.length > 0) {
      this.listSubButton.forEach((subButton) => {
        subButton.delete();
        subButton = null;
      });
    }
    this.listSubButton = null;
  }
}
