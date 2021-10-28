import { Constants } from "../utils/Constants";
import { PlayerAnimationHelper } from "../utils/PlayerAnimationHelper";
import { Ground } from "./Ground";
import { Player } from "./Player";

export class Enemy extends Player {
    public enemySpeedModifier: number = 1.5;
    constructor(animationFrames: string[]) {
        super();
        this.rideAnimation = new PlayerAnimationHelper(animationFrames);
        this.spriteSize = Constants.enemySize;
        this.lastAnimation = this.rideAnimation.getAnimation();
        this.yPosition = Constants.groundLevel + 10;
    }

    public update() {
        this.xPosition = (((this.xPosition - Constants.scrollSpeed * this.enemySpeedModifier) % Constants.gameCanvasWidth) + Constants.gameCanvasWidth) % Constants.gameCanvasWidth;
    }
}