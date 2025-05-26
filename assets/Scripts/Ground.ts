import { _decorator, Component, Node, Vec3, UITransform, director, Canvas } from 'cc';
import { GameControl } from './GameControl';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    @property({
        type: Node,
        tooltip: 'Ground One'
    })
    public ground1: Node;

    @property({
        type: Node,
        tooltip: 'Ground Two'
    })
    public ground2: Node;

    @property({
        type: Node,
        tooltip: 'Ground Three'
    })
    public ground3: Node;

    @property({
        type: GameControl,
        tooltip: 'Reference to GameControl'
    })
    public gameControl: GameControl;

    public groundWidth1: number;
    public groundWidth2: number;    
    public groundWidth3: number;

    public startPosition1 = new Vec3();
    public startPosition2 = new Vec3(); 
    public startPosition3 = new Vec3();

    public gameControlSpeed = new GameControl;
    public gameSpeed: number = 50;

    onLoad() {
        this.startUp();
    }

    startUp() {
        this.groundWidth1 = this.ground1.getComponent(UITransform).width;
        this.groundWidth2 = this.ground2.getComponent(UITransform).width;     
        this.groundWidth3 = this.ground3.getComponent(UITransform).width;

        this.startPosition1.x = 0;
        this.startPosition2.x = this.groundWidth1;
        this.startPosition3.x = this.groundWidth1 + this.groundWidth2;

        this.ground1.setPosition(this.startPosition1);
        this.ground2.setPosition(this.startPosition2);          
        this.ground3.setPosition(this.startPosition3);
    }

    update(deltaTime: number) {
        this.startPosition1 = this.ground1.position;
        this.startPosition2 = this.ground2.position;    
        this.startPosition3 = this.ground3.position;

        this.startPosition1.x -= this.gameSpeed * deltaTime;    
        this.startPosition2.x -= this.gameSpeed * deltaTime;
        this.startPosition3.x -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        if (this.startPosition1.x <= -this.groundWidth1) { 
            this.startPosition1.x = canvas.getComponent(UITransform).width;
        }

        if (this.startPosition2.x <= -this.groundWidth2) { 
            this.startPosition2.x = canvas.getComponent(UITransform).width;
        }

        if (this.startPosition3.x <= -this.groundWidth3) { 
            this.startPosition3.x = canvas.getComponent(UITransform).width;
        }

        this.ground1.setPosition(this.startPosition1);
        this.ground2.setPosition(this.startPosition2);          
        this.ground3.setPosition(this.startPosition3);
    }
}


