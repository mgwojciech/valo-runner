import { Enemy } from "../model/Enemy";
import { Player } from "../model/Player";
import { CollisionDetector } from "../utils/CollisionDetector";
import { Sound } from "../model/Sound";


export class EnemyManager {

    protected collisionDetector = new CollisionDetector();
    protected sound = new Sound();
    protected enemies: Enemy[];
    constructor(protected canvas: HTMLCanvasElement) {
        this.initializeEnemies();
    }
    private initializeEnemies() {
        let enemy = new Enemy([
            "frame1.png",
            "frame2.png",
            "frame3.png",
            "frame4.png",
            "frame5.png",
            "frame6.png",
            "frame7.png",
            "frame8.png"
        ]);
        enemy.xPosition = 800;

        let enemyInka = new Enemy([
            "inka1.png",
            "inka2.png",
            "inka3.png",
            "inka4.png",
            "inka5.png",
            "inka6.png",
            "inka7.png",
            "inka8.png"
        ]);
        enemyInka.xPosition = 950;

        this.enemies = [enemy, enemyInka];
    }
    public drawEnemiesAndCheckForCollisions(player: Player): boolean {
        let collision = false;
        this.enemies.forEach(enemy => {
            enemy.update();
            enemy.draw(this.canvas);
            let collide = this.collisionDetector.detectCollision(player, enemy);
            if (collide) {
                collision = true;
                this.sound.playSound("https://cdn.valosolutions.com/valo-runner/splatttmp3-6295.mp3")
            }
        });
        return collision;
    }
}