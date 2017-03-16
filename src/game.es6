import {Level} from './level.es6';
import {Player, PlayerHeading} from './player.es6';

export class Game{
    constructor(){
        this.initTime = 0;
        this.elapsetTime = 0;
    }

    init(){
        this.initTime = Date.getTime();
    }

    update(){
        const newElapsedTime = Date.getTime - initTime;
        let deltaTime = newElapsedTime - this.elapsedTime;
        this.elapsedTime = newElapsedTime;
    }
};