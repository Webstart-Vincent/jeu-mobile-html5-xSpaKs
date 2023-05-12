import { Game } from "./game.js";
import { Bird } from "./bird.js";

export class BirdPool {
    /**
     *
     * @param {Game} game
     */
    constructor(game) {
        /** @type {Bird[]} */
        this.birds = [];

        this.resetTimer();
    }

    resetTimer = () => {
        this.timer = 0;
        this.nextTime = Math.random() * 500 + 1500;
    };

    render = (timeStamp, deltaTime) => {
        if (this.timer >= this.nextTime) {
            this.activateNewBird();
            this.resetTimer();
        } else {
            this.timer += deltaTime;
        }
        for (const activeBird of this.birds.filter((bs) => bs.isActive))
            activeBird.render(timeStamp, deltaTime);
    };

    activateNewBird = () => {
        const bird = this.birds.find((bs) => !bs.isActive);
        if (bird) bird.reset();
        else this.birds.push(new Bird(this.game));
    };
}
