import { InputHandler, Key } from "./input-handler.js";

export class Player {
    sourceX = 0;
    sourceY = 0;
    frameWidth = 70;
    frameHeight = 53;
    destinationX = 25;
    destinationY = 100;

    fps = 1000 / 2;
    framesLength = 2;

    speed = 1.5;

    /**
     * @param {Game} game
     * @param {CanvasRenderingContext2D} ctx
     * @param {InputHandler} inputHandler
     */
    constructor(game) {
        this.image = new Image();
        this.image.src = "./assets/img/playertileset.png";

        this.ctx = game.ctx;
        this.inputKeys = game.inputHandler.keys;

        this.frameWidth = 70;
        this.frameHeight = 53;

        const { canvas } = game;
        this.maxDestinationX = canvas.width - this.frameWidth;
        this.maxDestinationY = canvas.height - this.frameHeight;
    }

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

    /**
     * @param {number} timeStamp
     */

    update(timeStamp) {
        const frameIndex = Math.floor(timeStamp / this.fps) % this.framesLength;
        this.sourceX = frameIndex * this.frameWidth;

        if (this.inputKeys.has(Key.ArrowUp)) this.destinationY -= this.speed;
        if (this.inputKeys.has(Key.ArrowDown)) this.destinationY += this.speed;
        if (this.inputKeys.has(Key.ArrowLeft)) this.destinationX -= this.speed;
        if (this.inputKeys.has(Key.ArrowRight)) this.destinationX += this.speed;

        if (this.destinationY < 0) this.destinationY = 0;
        if (this.destinationX < 0) this.destinationX = 0;
        if (this.destinationY > this.maxDestinationY)
            this.destinationY = this.maxDestinationY;
        if (this.destinationX > this.maxDestinationX)
            this.destinationX = this.maxDestinationX;
    }
}
