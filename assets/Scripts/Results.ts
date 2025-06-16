import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label
    })
    public score: Label;

    @property({
        type: Label
    })
    public highScore: Label;

    @property({
        type: Label
    })
    public resultFinal: Label;

    maxScore: number = 0; 
    currentScore: number;

    updateScore(currentScore: number) {
        this.currentScore = currentScore;
        this.score.string = (`${Math.trunc(this.currentScore)}`);
    }

    resetScore() {
        this.updateScore(0);
        this.hideResults();
    }

    increaseScore() {
        this.updateScore(this.currentScore + 0.01);
    }

    displayResults() {
        this.maxScore = Math.max(this.currentScore, this.maxScore);
        this.highScore.string = (`High Score: ${Math.trunc(this.maxScore)}`);
        this.resultFinal.node.active = true;
        this.highScore.node.active = true;
    }

    hideResults() {
        this.resultFinal.node.active = false;
        this.highScore.node.active = false;
    }
}


