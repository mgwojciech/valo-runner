export class Constants {
    public static groundLevel = 550;
    public static jumpTime = 10;
    public static playerSize = 150;
    public static enemySize = 200;
    public static get scrollSpeed (){
        if(Constants.isGameRunning){
            return Constants.internalScrollSpeed;
        }
        return 0;
    }
    public static survivalBonusPoints = 10;
    public static internalScrollSpeed = 4;
    public static gravityModified = 0.015;
    public static gameCanvasWidth = 1200;
    public static gameCanvasHeight = 600;
    public static isGameRunning = false;
    public static collisionToleranceLevel = 70;
    public static collectableSize = 40;
}