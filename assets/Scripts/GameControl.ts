import { _decorator, CCInteger, Component, Node, input, Input, EventKeyboard, KeyCode, director, UITransform, Collider2D, Contact2DType, IPhysics2DContact } from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";
import { BirdAudio } from "./BirdAudio";

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

    @property({
        type: BirdAudio,
    })
    public birdAudio: BirdAudio;  

    public isOver: boolean;

    onLoad() {
        this.initListener();
        this.results.resetScore();
        director.pause();
        this.isOver = true;
    }

    initListener() {
        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isOver) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }

            if (this.isOver === false) {
                this.bird.fly();
                this.birdAudio.onAudioQueue(0);
            }
        });
    }

    startGame() {
        this.results.hideResults();
        director.resume();
    }

    gameOver() {
        this.results.displayResults();
        this.bird.resetBird();
        this.birdAudio.onAudioQueue(3);
        director.pause();
        this.isOver = true;
    }

    resetGame() {
        this.results.resetScore()
        this.startGame();
        this.pipeQueue.reset();
        this.isOver = false;
    }

    passPipe() {
        this.results.updateScore(this.results.currentScore + 10);
        this.birdAudio.onAudioQueue(1);
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    contactGroundOrPipe() {
        let colider = this.bird.getComponent(Collider2D);

        if(colider) {
            colider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }  
    }
    
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        this.bird.hitSomehing = true;
        this.birdAudio.onAudioQueue(2);
    }

    birdStruck() {
        this.contactGroundOrPipe();
        
        if (this.bird.hitSomehing) {
            this.gameOver();
        }
    }

    update(dt: number): void {
        this.results.increaseScore();

        if (this.isOver === false) {
            this.birdStruck();
        }
    }
}

