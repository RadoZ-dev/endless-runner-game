import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab, 
    })
    public prefabPipes = null;

    @property({
        type: Node,
    })
    public pipesContainer;

    public pool = new NodePool;
    public pipe: Node = null;

    initPool() {
        let pipesCount = 3;

        for (let i = 0; i < pipesCount; i++) {
            this.pipe = instantiate(this.prefabPipes);
            
            if (i === 0) {
                this.pipesContainer.addChild(this.pipe);
            } else {
                this.pool.put(this.pipe);
            }
        }
    }

    addPool() {
        if(this.pool.size() > 0) {
            this.pipe = this.pool.get();
        } else {
            this.pipe = instantiate(this.prefabPipes);
        }

        this.pipesContainer.addChild(this.pipe);
    }

    reset() {
        this.pipesContainer.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


