import { Background } from "./background.js";
import { Player } from "./player.js";
import { InputHandler } from "./input-handler.js";
import { Bird } from "./bird.js";
import { BirdPool } from "./birds-pool.js";

export class Game {
    score = 0;
    gameOver = false;
    lastTimeStamp = 0;

    constructor() {
        /** @type {HTMLCanvasElement} */
        this.canvas = document.querySelector("canvas");
        this.canvas.width = 480;
        this.canvas.height = 360;

        this.ctx = this.canvas.getContext("2d");

        this.inputHandler = new InputHandler();

        this.background = new Background(this.ctx);

        this.player = new Player(this);

        this.bird = new Bird(this);
        this.birdPool = new BirdPool(this);

        this.animate(0);
        this.lastTimeStamp = 0;
    }

    /**
     * Description
     *  @param {number} timeStamp
     */
    animate = (timeStamp) => {
        const deltaTime = timeStamp - this.lastTimeStamp;
        this.lastTimeStamp = timeStamp;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.background.draw();
        this.background.update(deltaTime);

        this.birdPool.render(timeStamp, deltaTime);

        this.player.draw();
        this.player.update(timeStamp);

        window.requestAnimationFrame(this.animate);
    };
}
