import { Player } from "../model/Player";
import { Constants } from "./Constants";

export class CollisionDetector {
    public detectCollision(player1: Player, player2: Player): boolean {
        return player1.xPosition - Constants.collisionToleranceLevel < player2.xPosition + player2.spriteSize &&
            (player1.xPosition + player1.spriteSize - Constants.collisionToleranceLevel) > player2.xPosition &&
            player1.yPosition < player2.yPosition + player2.spriteSize &&
            player1.spriteSize + player1.yPosition > player2.yPosition;
    }
}