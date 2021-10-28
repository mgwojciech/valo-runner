import { LeaderBoardProvider } from "../dal/LeaderBoardProvider";
import { LeaderBoard } from "../model/LeaderBoard";

export class LeaderBoardManager {
    constructor(protected leaderBoardProvider: LeaderBoardProvider, protected user: string) {

    }

    public async getLeaderBoard() {
        let board = await this.leaderBoardProvider.getLeaderboard();
        if (board && board.scores) {
            board.scores.sort((a, b) => a.score - b.score);
            return board.scores;
        }
        return [];
    }

    public async addScore(score: number) {
        let board = await this.leaderBoardProvider.getLeaderboard();
        if (board && board.scores) {
            board.scores.push({ user: this.user, score: score });
            board.scores.sort((a, b) => a.score - b.score);
        }
        else{
            board = new LeaderBoard();
            board.scores = [{ user: this.user, score: score }];
        }
        await this.leaderBoardProvider.updateLeaderboard(board); 
    }
}