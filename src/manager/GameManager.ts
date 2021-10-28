import { Collectable } from "../model/Collectable";
import { Enemy } from "../model/Enemy";
import { Ground } from "../model/Ground";
import { Player } from "../model/Player";
import { Skybox } from "../model/Skybox";
import { CollisionDetector } from "../utils/CollisionDetector";
import { Constants } from "../utils/Constants";
import { LeaderBoardManager } from "./LeaderBoardManager";

export class GameManager {
    protected player: Player;
    protected ground: Ground;
    protected canvasCtx: CanvasRenderingContext2D;
    protected canvasCtxSub: CanvasRenderingContext2D;
    protected enemies: Enemy[];
    protected collectables: Enemy[] = [];
    protected skyBox: Skybox = new Skybox();
    protected collisionDetector = new CollisionDetector();
    protected gameEnded = false;
    public points = 0;
    public leaderBoard: {
        user: string;
        score: number;
    }[];
    constructor(protected canvas: HTMLCanvasElement, protected leaderBoardManager: LeaderBoardManager) {
        this.player = new Player();
        this.canvasCtx = canvas.getContext("2d");
        this.canvasCtxSub = canvas.getContext("2d");
        this.ground = new Ground();
        this.initializeEnemies();
        this.initializeCollectables();
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
        this.initializeTimeEvents();
        this.leaderBoardManager.getLeaderBoard().then(board => {
            this.leaderBoard = board;
        });
    }

    public animate = () => {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.skyBox.draw(this.canvas);
        this.ground.update();
        this.ground.draw(this.canvas);
        this.player.update();
        this.player.draw(this.canvas);
        this.enemies.forEach(enemy => {
            enemy.update();
            enemy.draw(this.canvas);
        });
        this.collectables.forEach(enemy => {
            if (this.collisionDetector.detectCollision(this.player, enemy, 10)) {
                this.points += 100;
                this.collectables.splice(this.collectables.indexOf(enemy), 1);
                this.addRandomCollectable();
            }
            enemy.update();
            enemy.draw(this.canvas);
        });
        requestAnimationFrame(this.animate);
        for (let enemy of this.enemies) {
            let collide = this.collisionDetector.detectCollision(this.player, enemy);
            if (collide) {
                Constants.isGameRunning = false;
                this.gameEnded = true;
                this.leaderBoardManager.addScore(this.points);
            }
        }
        this.drawScoreBoard();
    }

    private drawScoreBoard() {
        this.canvasCtx.font = "600 18px 'Segoe UI'";
        this.canvasCtx.fillStyle = "#bebebf";
        this.canvasCtx.textAlign = "end";
        this.canvasCtx.fillText(`SCORE`, 1150, 50);

        this.canvasCtxSub.font = "700 32px 'Segoe UI'";
        this.canvasCtxSub.fillStyle = "#fff";
        this.canvasCtxSub.textAlign = "end";
        this.canvasCtxSub.fillText(`${this.points}`, 1150, 80);
        if (this.leaderBoard && this.leaderBoard.length > 0) {
            let leaderBoardPosition = 110;
            for (let i = 0; i < Math.min(this.leaderBoard.length, 3); i++) {
                this.canvasCtx.font = "600 18px 'Segoe UI'";
                this.canvasCtx.fillStyle = "#bebebf";
                this.canvasCtx.textAlign = "end";
                this.canvasCtx.fillText(`${this.leaderBoard[i].user}: ${this.leaderBoard[i].score}`, 1150, leaderBoardPosition);
                leaderBoardPosition += 30;
            }
        }
    }

    private initializeTimeEvents() {
        setInterval(() => {
            if (Constants.isGameRunning) {
                this.points += Constants.survivalBonusPoints;
            }
        }, 1000);

        setInterval(() => {
            if (Constants.isGameRunning) {
                Constants.internalScrollSpeed = Constants.internalScrollSpeed * 1.05;
                Constants.survivalBonusPoints += 5;
            }
        }, 5000);
    }

    private addRandomCollectable() {
        let collectable = new Collectable(["logo-star.png"]);
        collectable.xPosition = 1200;
        collectable.yPosition = (Math.random() * 300) + 200;
        this.collectables.push(collectable);
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
        enemyInka.xPosition = 1000;

        this.enemies = [enemy, enemyInka];
    }

    private initializeCollectables() {
        let collectable = new Collectable(["logo-star.png"]);
        collectable.xPosition = 600;
        collectable.yPosition = 200;
        //collectable.spriteSize = 120;
        this.collectables.push(collectable);
    }
}