import * as Pixi from 'pixi.js';

export const PlayerHeading = {
    'STOP': 0,
    'LEFT': 1,
    'RIGHT': 2,
    'UP': 3,
    'DOWN': 4
};

export class Player {
    constructor( params ){
        this.x = 0;
        this.y = 0;
        this.heading = PlayerHeading.STOP;
        this.pixSprite = undefined;
        this.rotation = 0;
    }
};