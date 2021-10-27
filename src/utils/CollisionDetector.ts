import { Player } from "../model/Player";
import { Constants } from "./Constants";

export class CollisionDetector {
    constructor(){
        
    }
    public detectCollision(player1: Player, player2: Player,collisionToleranceLevel  = Constants.collisionToleranceLevel): boolean {
        return player1.xPosition - collisionToleranceLevel < player2.xPosition + player2.spriteSize &&
            (player1.xPosition + player1.spriteSize - collisionToleranceLevel) > player2.xPosition &&
            player1.yPosition < player2.yPosition + player2.spriteSize &&
            player1.spriteSize + player1.yPosition > player2.yPosition;
    }
}