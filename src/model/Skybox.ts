export class Skybox {
    public skyBoxImage = new Image();
    private skyboxStartPixel: number = 0;

    constructor() {
        this.skyBoxImage.src = require("./assets/background1.jpg");
    }
    public draw(canvas: HTMLCanvasElement) {
        let context = canvas.getContext("2d");
        this.skyboxStartPixel = (this.skyboxStartPixel + 0.01) % canvas.width;
        this.scaleToFill(this.skyBoxImage, canvas, context);
    }
    protected scaleToFill(img, canvas, ctx) {
        ctx.drawImage(img, this.skyboxStartPixel, 0, this.skyboxStartPixel + (img.width / 2), img.height, 0, 0, canvas.width, canvas.height);
    }
}