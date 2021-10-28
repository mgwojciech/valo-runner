import { LeaderBoardProvider } from "../dal/LeaderBoardProvider";
import { LeaderBoard } from "../model/LeaderBoard";

export class LeaderBoardManager {
    constructor(protected leaderBoardProvider: LeaderBoardProvider, protected user: string) {

    }

    public async getLeaderBoard() {
        let board = await this.leaderBoardProvider.getLeaderboard();
        if (board && board.scores) {
            board.scores.sort((a, b) => b.score - a.score);
            return board.scores;
        }
        return [];
    }

    public async addScore(score: number) {
        let board = await this.leaderBoardProvider.getLeaderboard();
        if (board && board.scores) {
            board.scores.push({ user: this.user, score: score });
            board.scores.sort((a, b) => b.score - a.score);
        }
        else {
            board = new LeaderBoard();
            board.scores = [{ user: this.user, score: score }];
        }
        if (board.scores.length > 10) {
            //keep only top 10
            board.scores.splice(10, board.scores.length);
        }
        await this.leaderBoardProvider.updateLeaderboard(board);
    }
}