export class Constants {
    public static groundLevel = 600;
    public static jumpTime = 8;
    public static playerSize = 150;
    public static enemySize = 200;
    public static get scrollSpeed() {
        if (Constants.isGameRunning) {
            return 4;
        }
        return 0;
    };
    public static gravityModified = 0.017;
    public static gameCanvasWidth = 1200;
    public static gameCanvasHeight = 600;
    public static isGameRunning = false;
    public static collisionToleranceLevel = 70;
}