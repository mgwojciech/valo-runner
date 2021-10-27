import { Constants } from "../utils/Constants";
import { PlayerAnimationHelper } from "../utils/PlayerAnimationHelper";
import { Ground } from "./Ground";
import { Player } from "./Player";

export class Enemy extends Player {
    constructor() {
        super();
        this.rideAnimation = new PlayerAnimationHelper([
            "zombie1frame1.png",
            "zombie1frame2.png",
            "zombie1frame3.png",
            "zombie1frame4.png"
        ]);
        this.spriteSize = Constants.enemySize;
        this.lastAnimation = this.rideAnimation.getAnimation();
        this.yPosition = Constants.groundLevel + 10;

    }

    public update() {
        this.xPosition = (((this.xPosition - Constants.scrollSpeed * 1.5) % Constants.gameCanvasWidth) + Constants.gameCanvasWidth) % Constants.gameCanvasWidth;
    }
}