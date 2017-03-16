import { expect } from 'chai';
import {SpriteAnimator} from './spriteAnimator.es6';

const fakeSpriteAnimationDef = { 
    animations : {
        "one": {
            loop: true,
            frames: [
                { x: 0, y: 0, w: 10, h: 10, duration: 0.2 },
                { x: 10, y: 0, w: 10, h: 10, duration: 0.2 }
            ]
        },
        "two": {
            loop: false,
            frames : [{ x: 0, y: 0, w: 10, h: 10, duration: 0.2 }]
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
            expect(one).to.have.property('loop', true);
            expect(one).to.have.property('frames');
            expect(one.frames).to.have.property('length', 2);
            expect(one.frames[0]).to.have.property('x', 0);
            expect(one.frames[0]).to.have.property('y', 0);
            expect(one.frames[0]).to.have.property('w', 10);
            expect(one.frames[0]).to.have.property('h', 10);
            expect(one.frames[0]).to.have.property('duration', 0.2);
            expect(one.frames[1]).to.have.property('x', 10);
            expect(one.frames[1]).to.have.property('y', 0);
            expect(one.frames[1]).to.have.property('w', 10);
            expect(one.frames[1]).to.have.property('h', 10);
            expect(one.frames[1]).to.have.property('duration', 0.2);
            expect(one).to.have.property('duration', 0.4);
            const two = animator.animations.get('two');
            expect( two ).not.to.be.undefined;
            expect(two).to.have.property('loop', false);
            expect(two).to.have.property('frames');
            expect(two.frames).to.have.property('length', 1);
            expect(two.frames[0]).to.have.property('x', 0);
            expect(two.frames[0]).to.have.property('y', 0);
            expect(two.frames[0]).to.have.property('w', 10);
            expect(two.frames[0]).to.have.property('h', 10);
            expect(two.frames[0]).to.have.property('duration', 0.2);
            expect(two).to.have.property('duration', 0.2);
        });
    });
});