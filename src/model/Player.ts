import { Constants } from "../utils/Constants";
import { PlayerAnimationHelper } from "../utils/PlayerAnimationHelper";
import { IGameElement } from "./IGameElements";

export class Player implements IGameElement {
    public xPosition: number = 30;
    public yPosition: number = Constants.groundLevel;
    public get renderYPosition() {
        return this.yPosition - this.spriteSize;
    }
    protected rideAnimation: PlayerAnimationHelper;
    private jumping: boolean = false;
    private doubleJump: boolean = false;
    public spriteSize: number = Constants.playerSize;
    private currentJumpSpeed: number = 0;
    protected lastAnimation;

    constructor() {
        this.rideAnimation = new PlayerAnimationHelper([
            "ValoBot-moving.png",
            "ValoBot-moving2.png",
            "ValoBot-moving3.png",
            "ValoBot-moving4.png",
            "ValoBot-moving5.png",
            "ValoBot-moving6.png"
        ]);
        this.lastAnimation = this.rideAnimation.getAnimation();
    }
    public update() {
        if (Constants.isGameRunning) {
            this.handleJump();
        }
    }
    public draw(canvas: HTMLCanvasElement) {
        let context = canvas.getContext("2d");
        if (Constants.isGameRunning) {
            this.lastAnimation = this.rideAnimation.getAnimation();
        }
        context.drawImage(this.lastAnimation,
            0,
            0,
            this.lastAnimation.width,
            this.lastAnimation.height,
            this.xPosition,
            this.renderYPosition,
            this.spriteSize,
            this.spriteSize);
    }

    public jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.currentJumpSpeed = Constants.jumpTime;
        }
        else {
            if (this.jumping && !this.doubleJump) {
                this.doubleJump = true;
                this.currentJumpSpeed = Constants.jumpTime * 0.7;
            }
        }
    }
    public handleJump() {
        if (this.jumping) {
            this.yPosition = this.yPosition - this.currentJumpSpeed;
            this.currentJumpSpeed = this.currentJumpSpeed - (9.8 * Constants.gravityModified);
            if (this.yPosition >= Constants.groundLevel) {
                this.jumping = false;
                this.doubleJump = false;
                this.yPosition = Constants.groundLevel;
            }
        }
    }

}