import { expect } from 'chai';
import {SpriteAnimator} from './spriteAnimator.es6';

const fakeSpriteAnimationDef = { 
    animations : {
        "one": {
            loop: true,
            frames: [
                { x: 0, y: 0, w: 10, h: 10, duration: 200 },
                { x: 10, y: 0, w: 10, h: 10, duration: 200 }
            ]
        },
        "two": {
            loop: false,
            frames : [{ x: 0, y: 0, w: 10, h: 10, duration: 200 }]
        }
    }
};

describe("SpriteAnimator", () => {
    describe("SpriteAnimator creation", () => {
        it("Should create animator", () => {
            const animator = new SpriteAnimator();
            expect( animator ).not.to.be.undefined;
            expect( animator ).to.have.property('animations');
        });
        it("Should create animator with correct params", () => {
            const animator = new SpriteAnimator( fakeSpriteAnimationDef );
            expect( animator ).not.to.be.undefined;
            expect( animator ).to.have.property('animations');
            expect( animator.animations ).to.have.property('size', 2);
            const one = animator.animations.get('one');
            expect( one ).not.to.be.undefined;
            expect( one ).to.have.property('loop', true);
            expect( one ).to.have.property('frames');
            expect( one.frames ).to.have.property('length', 2);
            expect( one.frames[0] ).to.have.property('x', 0);
            expect( one.frames[0] ).to.have.property('y', 0);
            expect( one.frames[0] ).to.have.property('w', 10);
            expect( one.frames[0] ).to.have.property('h', 10);
            expect( one.frames[0] ).to.have.property('duration', 200);
            expect( one.frames[1] ).to.have.property('x', 10);
            expect( one.frames[1] ).to.have.property('y', 0);
            expect( one.frames[1] ).to.have.property('w', 10);
            expect( one.frames[1] ).to.have.property('h', 10);
            expect( one.frames[1] ).to.have.property('duration', 200);
            expect( one ).to.have.property('duration', 400);
            const two = animator.animations.get('two');
            expect( two ).not.to.be.undefined;
            expect( two ).to.have.property('loop', false);
            expect( two ).to.have.property('frames');
            expect( two.frames ).to.have.property('length', 1);
            expect( two.frames[0] ).to.have.property('x', 0);
            expect( two.frames[0] ).to.have.property('y', 0);
            expect( two.frames[0] ).to.have.property('w', 10);
            expect( two.frames[0] ).to.have.property('h', 10);
            expect( two.frames[0] ).to.have.property('duration', 200);
            expect( two ).to.have.property('duration', 200);
        });
    });

    describe("SpriteAnimator operations", () => {
        it("Should play animation", () => {
            const animator = new SpriteAnimator( fakeSpriteAnimationDef );
            animator.playAnimation('one');
            expect( animator._currentAnimation ).not.to.be.undefined;
            expect( animator._currentAnimation ).to.have.property( 'loop', true );
            expect( animator._currentAnimation ).to.have.property( 'frames' );
            expect( animator._currentAnimation ).deep.property('frames.length', 2 );
            expect( animator._currentFrame ).to.equal( 0 );
            expect( animator._currentAnimationTime ).to.equal( 0 );
            expect( animator._paused ).to.equal( false );
        });
        it("Should not play unexistent animation", () => {
            const animator = new SpriteAnimator( fakeSpriteAnimationDef );
            animator.playAnimation('pepe');
            expect( animator._currentAnimation ).to.be.undefined;            
            expect( animator._currentFrame).to.equal( 0 );
            expect( animator._currentAnimationTime).to.equal( 0 );
            expect( animator._paused).to.equal( false );
        });
        it("Should update animation correctly", () => {
            const animator = new SpriteAnimator( fakeSpriteAnimationDef );
            animator.playAnimation( 'one' );
            animator.update( 300 );
            expect( animator._currentFrame ).to.equal( 1 );
            expect( animator._currentAnimationTime ).to.equal( 300 );
            animator.update( 200 );
            expect( animator._currentFrame ).to.equal( 0 );
            expect( animator._currentAnimationTime ).to.equal( 500 );
        });
        it("Should pause and unpause animation correctly", () => {
            const animator = new SpriteAnimator( fakeSpriteAnimationDef );
            animator.playAnimation( 'one' );
            animator.update( 300 );
            expect( animator._currentAnimationTime ).to.equal( 300 );
            expect( animator._currentFrame ).to.equal( 1 );
            animator.pauseAnimation( true );
            expect( animator._paused ).to.be.true;
            animator.update( 200 );
            expect( animator._currentAnimationTime ).to.equal( 300 );
            expect( animator._currentFrame ).to.equal( 1 );
            animator.pauseAnimation( false );
            expect( animator._paused ).to.be.false;
            animator.update( 200 );
            expect( animator._currentAnimationTime ).to.equal( 500 );
            expect( animator._currentFrame ).to.equal( 0 );
        });
        it("Should stop animation correctly", () => {
            const animator = new SpriteAnimator( fakeSpriteAnimationDef );
            animator.playAnimation( 'one' );
            animator.update( 300 );
            expect( animator._currentAnimationTime ).to.equal( 300 );
            expect( animator._currentFrame ).to.equal( 1 );
            animator.stopAnimation();
            expect( animator._paused ).to.be.false;
            animator.update( 200 );
            expect( animator._currentAnimationTime ).to.equal( 200 );
            expect( animator._currentFrame ).to.equal( 0 );
        });
        it("Should get animation rect correctly", () => {
            const animator = new SpriteAnimator( fakeSpriteAnimationDef );
            animator.playAnimation( 'one' );
            expect( animator.getAnimationRect() ).to.deep.equal({x: 0, y: 0, w: 10, h: 10});
            animator.update( 300 );
            expect( animator.getAnimationRect() ).to.deep.equal({x: 10, y: 0, w: 10, h: 10});
        });
        it("Should not get incorrect animation rect", () => {
            const animator = new SpriteAnimator( fakeSpriteAnimationDef );
            animator.playAnimation( 'pepe' );
            expect( animator.getAnimationRect() ).to.be.undefined;
        });
    });
});