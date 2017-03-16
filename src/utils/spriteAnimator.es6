export class SpriteAnimator {
    constructor( params ){
        this.animations = new Map();
        if( params ){
            if( params.animations ){
                for( let name in params.animations ){
                    this.addAnimation( name, params.animations[ name ] );
                }
            }
        }
    }
    addAnimation ( name, animation ) {
        const newAnimation = {
            frames: animation.frames,
            loop: animation.loop,
            duration: animation.frames.reduce( (total, frame) => total += frame.duration? frame.duration : 0 , 0 )
        };

        if( !this.animations.has(name) ){
            this.animations.set(name, newAnimation);
        }
        return this;
    }
};