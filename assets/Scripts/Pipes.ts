import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';

const { ccclass, property } = _decorator;
const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Pipes')
export class Pipes extends Component {
    @property({
        type: Node,
        tooltip: 'Top Pipe'
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'Bottom Pipe'
    })
    public bottomPipe: Node;

    public temporaryStartpositionTop: Vec3 = new Vec3(0, 0, 0);
    public temporaryStartpositionBottom: Vec3 = new Vec3(0, 0, 0);
    public scene = screen.windowSize;

    public game;
    public pipeSpeed: number;
    public tempSpeed: number;

    isPass: boolean;

    onLoad() {
        this.game = find("GameControl").getComponent("GameControl");
        this.pipeSpeed = this.game.pipeSpeed;
        this.initialPosition();
        this.isPass = false;
    }

    initialPosition() {
        this.temporaryStartpositionTop.x = (this.topPipe.getComponent(UITransform).width + this.scene.width + 100);
        this.temporaryStartpositionBottom.x = (this.bottomPipe.getComponent(UITransform).width + this.scene.width + 100);
    
        let gap = random(90, 100);
        let topHeight = random(400, 800);
    
        this.temporaryStartpositionTop.y = topHeight;
        this.temporaryStartpositionBottom.y = (topHeight - gap * 10);

        this.topPipe.setPosition(this.temporaryStartpositionTop);
        this.bottomPipe.setPosition(this.temporaryStartpositionBottom);
    }

    update(dt: number) {
        this.tempSpeed = this.pipeSpeed * dt;

        this.temporaryStartpositionTop = this.topPipe.position;
        this.temporaryStartpositionBottom = this.bottomPipe.position;

        this.temporaryStartpositionTop.x -= this.tempSpeed;
        this.temporaryStartpositionBottom.x -= this.tempSpeed;

        this.topPipe.setPosition(this.temporaryStartpositionTop);
        this.bottomPipe.setPosition(this.temporaryStartpositionBottom);

        if(this.isPass == false && this.topPipe.position.x <= 0) {
            this.isPass = true;
            this.game.passPipe();
        }

        if (this.topPipe.position.x < 0 -this.scene.width) {
            this.game.createPipe();
            this.destroy();
        }
    }
}


