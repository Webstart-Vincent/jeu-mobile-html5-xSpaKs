import { Game } from "./game.js";

export class Bird {
    sourceX = 0;
    sourceY = 0;

    fps = 1000 / 2;
    frameLength = 2;

    /**
     * @param {Game} game
     */
    constructor(game) {
        this.image = new Image();
        this.image.src = "./assets/img/birds.png";

        this.ctx = game.ctx;
        const { canvas } = game;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        this.frameWidth = 150;
        this.frameHeight = 210;

        this.reset();
    }

    render = (timeStamp, deltaTime) => {
        this.draw();
        this.update(timeStamp, deltaTime);
    };

    reset = () => {
        this.isActive = true;
        this.destinationX = this.canvasWidth;
        this.destinationY =
            Math.random() * (this.canvasHeight - this.frameHeight);
        this.speed = Math.random();
    };

    draw() {
        this.ctx.drawImage(
            this.image,
            this.sourceX,
            this.sourceY,
            this.frameWidth,
            this.frameHeight,
            this.destinationX,
            this.destinationY,
            this.frameWidth,
            this.frameHeight
        );
    }

    update(timeStamp, deltaTime) {
        const frameIndex = Math.floor(timeStamp / this.fps) % this.framesLength;
        this.sourceX = frameIndex * this.frameWidth;

        this.destinationX -= (deltaTime * this.speed) / 1000;

        if (this.destinationX <= -this.frameWidth) this.isActive = false;
    }
}
