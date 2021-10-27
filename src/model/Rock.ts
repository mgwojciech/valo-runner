export class Rock {
    public xPosition: number = 0;
    public yPosition: number = 0;
    public rockImage = new Image();
    constructor() {
        this.rockImage.src = require("./assets/flat-rock.png");
    }
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.rockImage, this.xPosition, this.yPosition - 5, 20, 10);
    }
}