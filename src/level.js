import * as Pixi from 'pixi.js'

export class Level {
    constructor( params ){
        this.levelUrl = params.level;
        this.map = null;
        this.width = 0;
        this.height = 0;
        this.pillsInMap = new Set();

        this.pixRootNode = new Pixi.Container(); 
    }

    init( ){
        return new Promise(
            ( resolve, reject ) => {
                const parse = () => {
                    this.map = Pixi.loader.resources[ this.levelUrl ].data;
                    if( this.map ){
                        this.width = this.map.cols;
                        this.height = this.map.rows;
                        for( let i = 0; i < this.map.map.length; i++){
                            if( this.map.map[i] === 1 ){
                                this.pillsInMap.add(i);
                            }
                        }
                    }
                    resolve();
                };


                if( this.levelUrl ){
                    Pixi.loader.add( [this.levelUrl, './levels/res/floor.png', './levels/res/wall.png'] )
                    .load( parse );
                }
            }
        )
    }

    start(){
        const createNodes = () => {
            let node,
                texture,
                sprite;
            debugger;
            for( let x = 0; x < this.width; x++ ){
                for( let y = 0; y < this.height; y++ ){
                    node = this.__transformToArrayCoords( x, y );
                    switch( this.map.map[node] ){
                        case 0:
                            texture = Pixi.loader.resources['./levels/res/floor.png'].texture;
                            break;
                        case 1:
                            texture = Pixi.loader.resources['./levels/res/wall.png'].texture;
                            break;
                        default:
                    }
                    sprite = new Pixi.Sprite( texture );
                    sprite.x = x * texture.width - (this.width * texture.width * 0.5);
                    sprite.y = y * texture.height -(this.height * texture.height * 0.5);
                    this.pixRootNode.addChild( sprite );
                }
            }
        }

        createNodes();
    }

    __transformToArrayCoords( x, y ){
        return y * this.width + x;
    }

    __transformTo2DCoords( coord ){
        const xC = coord % this.width;
        return { x: xC, y: ( this.width * this.height - txC ) / this.width };
    }

    isPillInPosition( x, y ){
        return this.pillsInMap.has( this.__transformToArrayCoords(x, y) );
    }

    eatPill( x, y ){
        const arrayCoords = this.__transformToArrayCoords( x, y );
        if( this.pillsInMap.has(arrayCoords) ){
            this.pillsInMap.delete( arrayCoords );
        }
        return this.pillsInMap.size;
    }

    getRootNode(){
        return this.pixRootNode;
    }
}