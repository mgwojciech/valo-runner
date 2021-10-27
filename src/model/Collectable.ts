import { Constants } from "../utils/Constants";
import { PlayerAnimationHelper } from "../utils/PlayerAnimationHelper";
import { Enemy } from "./Enemy";

export class Collectable extends Enemy {
    constructor(animationCollection: string[]) {
        super(animationCollection);
        this.enemySpeedModifier = 0.5;
        this.spriteSize = Constants.collectableSize;
    }
}