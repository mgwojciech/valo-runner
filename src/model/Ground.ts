import { Constants } from "../utils/Constants";
import { Rock } from "./Rock";

export class Ground {
    public yPosition: number = 50;
    public xPosition: number = 90;
    protected rocks: Rock[];
    public groundImage = new Image();
    public forestImage = new Image();
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
    }
    public draw(canvas: HTMLCanvasElement) {
        let context = canvas.getContext("2d");
       
        const forestPtrn = context.createPattern(this.forestImage, 'repeat');
        context.fillStyle = forestPtrn;
        context.fillRect(0, 400, canvas.width, 200);
        const groundPtrn = context.createPattern(this.groundImage, 'repeat');
        context.fillStyle = groundPtrn;
        context.fillRect(0, 550, canvas.width, 50);
        //context.moveTo(0, Constants.groundLevel);
        //context.lineWidth = 1;
        //context.lineTo(800, Constants.groundLevel);
        //context.strokeStyle = "black";
        //context.beginPath();
        //context.stroke();
        for (let rock of this.rocks) {
            rock.draw(context);
        }
    }
}