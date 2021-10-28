import { BackgroundForest } from "../model/BackgroundForest";
import { Collectable } from "../model/Collectable";
import { Enemy } from "../model/Enemy";
import { Ground } from "../model/Ground";
import { Player } from "../model/Player";
import { Skybox } from "../model/Skybox";
//import { audio } from "../model/Audio";
import { CollisionDetector } from "../utils/CollisionDetector";
import { Constants } from "../utils/Constants";
import { EnemyManager } from "./EnemyManager";
import { LeaderBoardManager } from "./LeaderBoardManager";

export class GameManager {
    protected player: Player;
    protected ground: Ground;
    protected canvasCtx: CanvasRenderingContext2D;
    protected canvasCtxSub: CanvasRenderingContext2D;
    protected collectables: Enemy[] = [];
    protected skyBox: Skybox = new Skybox();
    protected forest: BackgroundForest = new BackgroundForest();
    //protected audio: audio = new audio();
    protected collisionDetector = new CollisionDetector();
    protected gameEnded = false;
    public points = 0;
    public leaderBoard: {
        user: string;
        score: number;
    }[];
    protected welcomeImage = new Image();
    protected enemyManager: EnemyManager;
    constructor(protected canvas: HTMLCanvasElement, protected leaderBoardManager: LeaderBoardManager) {
        this.player = new Player();
        this.canvasCtx = canvas.getContext("2d");
        this.canvasCtxSub = canvas.getContext("2d");
        this.ground = new Ground();
        this.enemyManager = new EnemyManager(canvas);
        this.initializeCollectables();
        this.welcomeImage.src = require("../model/assets/start-screen.jpg");
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
        // if (!Constants.isGameRunning && !this.gameEnded) {
        //     this.canvasCtx.drawImage(this.welcomeImage,  0, 0, this.welcomeImage.width, this.welcomeImage.height, 0, 0, this.canvas.width, this.canvas.height);
        // }
         {

            this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.skyBox.draw(this.canvas);
            this.ground.update();
            this.ground.draw(this.canvas);
            this.forest.update();
            this.forest.draw(this.canvas);
            this.player.update();
            this.player.draw(this.canvas);
            if (this.enemyManager.drawEnemiesAndCheckForCollisions(this.player)) {
                if (!this.gameEnded) {
                    this.leaderBoardManager.addScore(this.points);
                }
                Constants.isGameRunning = false;
                this.gameEnded = true;
            }
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

            this.drawScoreBoard();
        }
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



    private initializeCollectables() {
        let collectable = new Collectable(["logo-star.png"]);
        collectable.xPosition = 600;
        collectable.yPosition = 200;
        //collectable.spriteSize = 120;
        this.collectables.push(collectable);
    }

    public playAudio() {
        let audioPath = "https://cdn.valosolutions.com/valo-runner/0096.%20Fun%20Halloween%20-%20AShamaluevMusic.mp3";
        //@ts-ignore
        const music = new Audio(audioPath);
        music.play();
        music.volume = 0.3;
        music.loop = true;
    };
}