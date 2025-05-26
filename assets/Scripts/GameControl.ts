import { _decorator, CCInteger, Component, Node } from "cc";
import { Ground } from "./Ground";
const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
    @property({ 
        type: Component, 
        tooltip: 'This is ground' 
    })
    public ground: Ground;

    @property({ 
        type: CCInteger,
        tooltip: 'Game Speed',      
    })
    public speed: number = 200;

    @property({
        type: CCInteger,    
        tooltip: 'Pipe Speed'
    })
    public pipeSpeed: number = 200;
}

