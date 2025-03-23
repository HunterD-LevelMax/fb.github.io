import { loadImage } from './utils.js';

export class Bird {
  static birdImg;
  width = 66;
  height = 47;
  hitboxWidth = 55;
  hitboxHeight = 35;
  flapPower = 6.3; // Сила взмаха крыльев
  gravity = 0.31;   // Гравитация
  maxVelocity = 16; // Максимальная скорость падения/подъема

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
    const currentTime = Date.now();
    const deltaTime = (currentTime - this.lastTime) / 16; // Нормализуем время (16ms ~ 60 FPS)
    this.lastTime = currentTime;

    // Применяем гравитацию с учетом времени
    this.velocity += this.gravity * deltaTime;

    // Ограничиваем скорость, чтобы птица не падала/поднималась слишком быстро
    this.velocity = Math.min(this.velocity, this.maxVelocity);
    this.velocity = Math.max(this.velocity, -this.maxVelocity);

    // Обновляем позицию птицы с учетом скорости и времени
    this.y += this.velocity * deltaTime;

    // Отрисовываем птицу
    this.draw();
  }
}