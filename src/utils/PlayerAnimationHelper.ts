export class PlayerAnimationHelper {
    public framesImages: [];
    private currentAnimationIndex: number = 0;
    private animationSpeed: number = 5;
    private animationFrame: number = 0;
    constructor(protected animationFrames) {
        this.framesImages = animationFrames.map(frame => {
            let image = new Image();
            image.src = require("../model/assets/" + frame);
            return image;
        });
    }

    public getAnimation: () => HTMLImageElement = () => {
        this.animationFrame = (this.animationFrame + 1) % this.animationSpeed;
        if (this.animationFrame === 0) {
            this.currentAnimationIndex = (this.currentAnimationIndex + 1) % this.framesImages.length;
        }
        return this.framesImages[this.currentAnimationIndex];
    }
}