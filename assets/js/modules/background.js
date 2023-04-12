export class Background {
    destinationX = 0;
    destinationY = 0;
    width = 930;
    speed = 100;

    /**
     * Description
     * @param {CanvasRenderingContext2D} ctx
     */
    constructor(ctx) {
        this.image = new Image();
        this.image.src = "./assets/img/fond.jpg";

        this.ctx = ctx;
    }

    draw() {
        this.ctx.drawImage(this.image, this.destinationX, this.destinationY);

        this.ctx.drawImage(
            this.image,
            this.destinationX + this.width,
            this.destinationY
        );
    }

    /**
     * Description
     * @param {number} deltaTime
     */
    update(deltaTime) {
        this.destinationX -= (deltaTime * this.speed) / 1000;
        if (this.destinationX <= -this.width) this.destinationX = 0;
    }
}
