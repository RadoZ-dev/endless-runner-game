import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, easing } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property({
        type: CCFloat,
        tooltip: 'The height of the jump of the bird',
    })
    public jumpHeight: number = 200;

    @property({
        type: CCFloat,
        tooltip: 'The duration of the jump of the bird',
    })
    public jumpDuration: number = 3.5;

    public birdFlyingAnimation: Animation;
    public birdLocation: Vec3;

    onLoad(): void {
        this.resetBird();

        this.birdFlyingAnimation = this.getComponent(Animation);
    }

    resetBird() {
        this.birdLocation = new Vec3(0, 56, 0);
        this.node.setPosition(this.birdLocation);
    }

    fly() {
        this.birdFlyingAnimation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), { easing: "smooth",
                onUpdate: (target: Vec3, ration: number) => {
                    this.node.position = target;
                }
             })
            .start();

        this.birdFlyingAnimation.play();    
    }
}


