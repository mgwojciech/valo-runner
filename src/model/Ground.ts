import { Constants } from "../utils/Constants";
import { Rock } from "./Rock";

export class Ground {
    public yPosition: number = 50;
    protected rocks: Rock[];
    constructor() {
        let firstRock = new Rock();
        firstRock.xPosition = 200;
        firstRock.yPosition = Constants.groundLevel;
        this.rocks = [firstRock];
    }
    public update() {
        this.rocks.forEach(rock => rock.xPosition = (((rock.xPosition - Constants.scrollSpeed) % 800) + 800) % 800);
    }
    public draw(canvas: HTMLCanvasElement) {
        let context = canvas.getContext("2d");
        context.strokeStyle = "black";
        context.beginPath();
        context.moveTo(0, Constants.groundLevel);
        context.lineWidth = 1;
        context.lineTo(800, Constants.groundLevel);
        context.stroke();
        for (let rock of this.rocks) {
            rock.draw(context);
        }
    }
}