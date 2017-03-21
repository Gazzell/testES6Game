export class SpriteAnimator {
    constructor( params ){
        this.animations = new Map();
        this._currentAnimation = undefined;
        this._currentFrame = 0;
        this._currentAnimationTime = 0;
        this._paused = false;

        if( params ){
            if( params.animations ){
                for( let name in params.animations ){
                    this.addAnimation( name, params.animations[ name ] );
                }
            }
        }
        return this;
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
    playAnimation( name, onAnimationFinished ){
        this._currentFrame = 0;
        this._currentAnimationTime = 0;
        if( this.animations.has( name ) ){
            this._currentAnimation = this.animations.get( name );
        }
        return this;
    }
    pauseAnimation( value ){
        this._paused = value;
        return this;
    }
    stopAnimation(){    
        this._paused = false;
        this._currentFrame = 0;
        this._currentAnimationTime = 0;
        return this;
    }
    update( delta ){
        if( !this._paused && this._currentAnimation){
            this._currentAnimationTime += delta;
            let timeOffset = this._currentAnimation.loop ? this._currentAnimationTime % this._currentAnimation.duration : this._currentAnimationTime;
            if( timeOffset > this._currentAnimation.duration ){
                this._currentFrame = this._currentAnimation.frames.length - 1;
            } else {
                let frame = 0;
                while( timeOffset > 0 ){
                    timeOffset -= this._currentAnimation.frames[ frame ].duration;
                    frame++;
                }
                this._currentFrame = frame - 1;
            }
        }
    }
    getAnimationRect(){
        if( this._currentAnimation && this._currentAnimation.frames[ this._currentFrame ]){
            const { x, y, w, h } = this._currentAnimation.frames[ this._currentFrame ];
            return { x, y, w, h };
        }
    }
};