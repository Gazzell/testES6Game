import { expect } from 'chai';
import {Player} from './player.es6';
import {PlayerHeading} from './player.es6';

describe("Player", () => {
    context("Player creation", () => {
        const player = new Player();
        it("Should create player", () =>{
            expect(player.x).to.equal(0);
            expect(player.y).to.equal(0);
            expect(player.heading).to.equal(PlayerHeading.LEFT);
            expect(player.pixSprite).to.be.undefined;
        });
        
        before(() => player.init() );
        it("Should initialize player correctly", () => {
            player.start();
            expect(player.pixSprite).not.to.be.undefined;
            expect(player.pixSprite).to.have.property('x', 0);
            expect(player.pixSprite).to.have.property('y', 0);
        });
    });

    context("Player movement", () => {
        const player = new Player();
        
        before(() => player.init() );

        it("Should set position correctly", () =>{
            player.start();

            player.setPosition(20,20);
            expect(player.x).to.equal(20);
            expect(player.y).to.equal(20);
            expect(player).deep.property('pixSprite.x', 20 );
            expect(player).deep.property('pixSprite.y', 20 );
            expect(player).deep.property('pixSprite.pivot.x', -player.halfWidth );
            expect(player).deep.property('pixSprite.pivot.y', -player.halfHeight );
        });
        
        it("Should head correctly on move change");
    });
});