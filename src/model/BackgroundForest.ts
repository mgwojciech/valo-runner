import { Constants } from "../utils/Constants";
import { Rock } from "./Rock";

export class BackgroundForest {
    public forestImage = new Image();
    protected imageStartPixel = 0;
    constructor() {
        let firstRock = new Rock();
        firstRock.xPosition = 200;
        firstRock.yPosition = Constants.groundLevel;
        this.forestImage.src = require("./assets/forest.png");
    }
    public update() {
        this.imageStartPixel = (this.imageStartPixel + Constants.scrollSpeed * 0.5) % (636);
    }
    protected scaleToFill(img, canvas, ctx: CanvasRenderingContext2D) {
        ctx.drawImage(img, this.imageStartPixel, 300, this.imageStartPixel + 636, img.height, 0, 345, canvas.width, 495);
    }
    public draw(canvas: HTMLCanvasElement) {
        let context = canvas.getContext("2d");

        this.scaleToFill(this.forestImage, canvas, context);

    }
}