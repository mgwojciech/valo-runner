import { Constants } from "../utils/Constants";
import { PlayerAnimationHelper } from "../utils/PlayerAnimationHelper";
import { Player } from "./Player";

export class Enemy extends Player {
    constructor() {
        super();
        this.rideAnimation = new PlayerAnimationHelper([
            "enemy.png"
        ]);
        this.spriteSize = Constants.enemySize;
    }

    public update() {
        if (Constants.isGameRunning)
            this.xPosition = (((this.xPosition - Constants.scrollSpeed * 1.5) % Constants.gameCanvasWidth) + Constants.gameCanvasWidth) % Constants.gameCanvasWidth;
    }
}