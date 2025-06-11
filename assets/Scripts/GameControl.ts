import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director } from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";

const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
    @property({ 
        type: Component, 
        tooltip: 'This is ground' 
    })
    public ground: Ground;

    @property({
        type: Results,
        tooltip: 'This is results'
    })
    public results: Results;

    @property({
        type: Bird,
    })
    public bird: Bird;

    @property({
        type: PipePool,
    })
    public pipeQueue: PipePool;

    @property({ 
        type: CCInteger,
        tooltip: 'Game Speed',      
    })
    public speed: number = 200;

    @property({
        type: CCInteger,    
        tooltip: 'Pipe Speed'
    })
    public pipeSpeed: number = 50;

    onLoad() {
        this.initListener();
        this.results.resetScore();
        director.pause();
    }

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.on(Node.EventType.TOUCH_START, () => {
            this.bird.fly();
        });
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.gameOver();
                break;
            case KeyCode.KEY_P:
                this.results.increaseScore();
                break;
            case KeyCode.KEY_Q:
                this.resetGame();  
                this.bird.resetBird();  
                break;
            default:
                break;
        }
    }

    startGame() {
        this.results.hideResults();
        director.resume();
    }

    gameOver() {
        this.results.displayResults();
        this.bird.resetBird();
        director.pause();
    }

    resetGame() {
        this.results.resetScore()
        this.startGame();
        this.pipeQueue.reset();
    }

    passPipe() {
        this.results.increaseScore();
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    update(dt: number): void {
        this.results.updateScore(this.results.currentScore + 1);
    }
}

