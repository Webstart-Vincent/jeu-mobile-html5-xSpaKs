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

        if (window.innerWidth < 580) setTimeout(this.hideWarning, 3000);
        if (window.innerWidth >= 580) this.hideWarning();

        this.animate(0);
        this.lastTimeStamp = 0;
    }

    hideWarning = () => {
        document.querySelector(".welcome").style.display = "none";
        document.querySelector(".jeu").style.display = "grid";
    };

    /**
     * Description
     *  @param {number} timeStamp
     */
    animate = (timeStamp) => {
        if (document.querySelector(".jeu").style.display == "grid") {
            const deltaTime = timeStamp - this.lastTimeStamp;
            this.lastTimeStamp = timeStamp;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.background.draw();
            this.background.update(deltaTime);

            this.birdPool.render(timeStamp, deltaTime);

            this.player.draw();
            this.player.update(timeStamp);
        }
        window.requestAnimationFrame(this.animate);
    };

    pauseResumeMode = () => {
        if (this.inputHandler.has(Key.Pause)) this.pauseGame;
        else if (this.inputHandler.has(Key.Resume)) this.resumeGame;
    };

    pauseGame = () => {
        console.log("p");
        cancelAnimationFrame(this.animate);
    };

    resumeGame = () => {
        requestAnimationFrame(this.animate);
    };
}
