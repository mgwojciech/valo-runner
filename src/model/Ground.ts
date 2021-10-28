import { Constants } from "../utils/Constants";
import { Rock } from "./Rock";

export class Ground {
    public yPosition: number = 50;
    public xPosition: number = 90;
    protected rocks: Rock[];
    public groundImage = new Image();
    public forestImage = new Image();
    protected imageStartPixel = 0;
    constructor() {
        let firstRock = new Rock();
        firstRock.xPosition = 200;
        firstRock.yPosition = Constants.groundLevel;
        this.rocks = [firstRock];
        this.groundImage.src = require("./assets/ground.jpg");
        this.forestImage.src = require("./assets/forest.png");
    }
    public update() {
        this.rocks.forEach(rock => rock.xPosition = (((rock.xPosition - Constants.scrollSpeed) % 800) + 800) % 800);
        this.imageStartPixel = (this.imageStartPixel + Constants.scrollSpeed) % Constants.gameCanvasWidth;
    }
    protected scaleToFill(img, canvas, ctx:CanvasRenderingContext2D ) {
        ctx.drawImage(img, this.imageStartPixel, 0, this.imageStartPixel + (img.width / 2), img.height, 0, 550, canvas.width, 50);
    }
    public draw(canvas: HTMLCanvasElement) {
        let context = canvas.getContext("2d");

        // const forestPtrn = context.createPattern(this.forestImage, 'repeat');
        // context.fillStyle = forestPtrn;
        // context.fillRect(0, 350, canvas.width, 250);
        this.scaleToFill(this.groundImage, canvas, context);
        // const groundPtrn = context.createPattern(this.groundImage, 'repeat');
        // context.fillStyle = groundPtrn;
        // context.fillRect(0, 550, canvas.width, 50);
        for (let rock of this.rocks) {
            rock.draw(context);
        }
    }
}