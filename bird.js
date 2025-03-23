import { loadImage } from './utils.js';

export class Bird {
  static birdImg;
  width = 66;
  height = 47;
  hitboxWidth = 55;
  hitboxHeight = 35;

  flapPower = 5.7; // Сила взмаха крыльев
  gravity = 0.25;   // Гравитация

  static async preloadImage() {
    Bird.birdImg = new Image();
    await loadImage(Bird.birdImg, './assets/bird.png');
  }

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = canvas.width / 10;   
    this.y = canvas.height / 4;
    this.velocity = 0; // Начальная скорость
    this.lastTime = Date.now(); // Время последнего обновления
  }

  draw() {
    this.ctx.drawImage(
      Bird.birdImg,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

  flap() {
    this.velocity = -this.flapPower; // При взмахе крыльев задаем отрицательную скорость (вверх)
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Отрисовываем птицу
    this.draw();
  }
}