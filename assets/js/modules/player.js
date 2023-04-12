export class Player {
    width = 0;
    height = 0;

    constructor(ctx) {
        this.image = new Image();
        this.image.src = "./assets/img/chartileset.png";

        this.ctx = ctx;
    }
}
