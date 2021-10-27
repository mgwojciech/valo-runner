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
    protected gameEnded = false;
    constructor(protected canvas: HTMLCanvasElement) {
        this.player = new Player();
        this.canvasCtx = canvas.getContext("2d");
        this.ground = new Ground();
        let enemy = new Enemy([
            "frame1.png",
            "frame2.png",
            "frame3.png",
            "frame4.png",
            "frame5.png",
            "frame6.png",
            "frame7.png",
            "frame8.png"]);
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
        enemyInka.xPosition = 1000;

        this.enemies = [enemy, enemyInka];

        document.onkeydown = (ev: KeyboardEvent) => {
            if (ev.keyCode === 32) {
                if (!Constants.isGameRunning && !this.gameEnded) {
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
                this.gameEnded = true;
            }
        }
    }
}