import { Enemy } from "../model/Enemy";
import { Ground } from "../model/Ground";
import { Player } from "../model/Player";
import { Skybox } from "../model/Skybox";
import { CollisionDetector } from "../utils/CollisionDetector";
import { Constants } from "../utils/Constants";

export class GameManager {
    protected player: Player;
    protected ground: Ground;
    protected canvasCtx: CanvasRenderingContext2D;
    protected enemies: Enemy[];
    protected skyBox: Skybox = new Skybox();
    protected collisionDetector = new CollisionDetector();
    constructor(protected canvas: HTMLCanvasElement) {
        this.player = new Player();
        this.canvasCtx = canvas.getContext("2d");
        this.ground = new Ground();
        let enemy = new Enemy();
        enemy.xPosition = 800;

        this.enemies = [enemy];

        document.onkeydown = (ev: KeyboardEvent) => {
            if (ev.keyCode === 32) {
                if (!Constants.isGameRunning) {
                    Constants.isGameRunning = true;
                }
                else {
                    this.player.jump();
                }
                ev.preventDefault();
                ev.stopImmediatePropagation();
            }
        };
    }

    public animate = () => {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.skyBox.draw(this.canvas);
        this.player.update();
        this.player.draw(this.canvas);
        this.ground.update();
        this.ground.draw(this.canvas);
        this.enemies.forEach(enemy => {
            enemy.update();
            enemy.draw(this.canvas);
        });
        requestAnimationFrame(this.animate);
        for (let enemy of this.enemies) {
            let collide = this.collisionDetector.detectCollision(this.player, enemy);
            if (collide) {
                Constants.isGameRunning = false;
                Constants.scrollSpeed = 0;
            }
        }
    }
}