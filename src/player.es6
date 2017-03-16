import * as Pixi from 'pixi.js';

export const PlayerHeading = {
    'LEFT': 0,
    'RIGHT': 1,
    'UP': 2,
    'DOWN': 3
};

export class Player {
    constructor( params ){
        this.x = params? params.x || 0 : 0;
        this.y = params? params.y || 0 : 0;
        this.heading = params? params.heading || PlayerHeading.LEFT: PlayerHeading.LEFT;
        this.pixSprite = undefined;
        this.halfWidth = 0;
        this.halfHeight = 0;
    }

    init(){
         return new Promise(
            ( resolve, reject ) => {
                if( !Pixi.loader.resources['./levels/res/player.png'] ){
                    Pixi.loader.add( './levels/res/player.png' )
                        .load( () => resolve() );
                } else {
                    resolve();
                }
            }
        )
    }

    start(){
        if( Pixi.loader.resources['./levels/res/player.png'] ){
            const texture = Pixi.loader.resources['./levels/res/player.png'].texture;
            this.pixSprite = new Pixi.Sprite( texture );
            this.halfWidth = texture.width * 0.5;
            this.halfHeight = texture.height * 0.5;
            this.pixSprite.pivot.set( -this.halfWidth, -this.halfHeight );
            this.pixSprite.x = this.x;
            this.pixSprite.y = this.y;
        }
        return this;
    }
    setPosition( x, y ){
        this.x = x;
        this.y = y;
        if( this.pixSprite ){
            this.pixSprite.x = x;
            this.pixSprite.y = y;
        }
        return this;
    }
};