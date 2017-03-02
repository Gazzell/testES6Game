import { expect } from 'chai';
import {Level} from './level.es6';

describe("Level", () => {
    context("Level creation", () => {
        it("Should create level with fake map", () => {
            const level = new Level({'level': 'testLevelURL'});
            expect( level ).not.to.be.undefined;
            expect( level ).to.have.property('levelUrl', 'testLevelURL');
            expect( level ).to.have.property('width', 0);
            expect( level ).to.have.property('height', 0);
            expect( level ).to.have.property('pillsInMap');
            expect( level ).to.have.deep.property('pillsInMap.size', 0);
        });
        it("Level create level with no map", () => {
            const level = new Level();
            expect( level ).not.to.be.undefined;
            expect( level ).to.have.property('levelUrl', undefined);
            expect( level ).to.have.property('width', 0);
            expect( level ).to.have.property('height', 0);
            expect( level ).to.have.property('pillsInMap');
            expect( level ).to.have.deep.property('pillsInMap.size', 0);
        });
    });

    context("Map init", () => {
        const level = new Level({ level:'../test/testLevel.json' });
        before( () => level.init() );  
        after( () => level.unload() );

        it("Should load json map from file", () => {
            expect( level ).to.have.property('width', 5);
            expect( level ).to.have.property('height', 5);
            expect( level ).to.have.property('map');
            expect( level ).to.have.deep.property('map.map').to.be.instanceof(Array);
            expect( level ).to.have.deep.property('pillsInMap.size', 9);
        });
    });

    context("Map loading and unloading", () => {
        const level = new Level({ level:'../test/testLevel.json' });
        before( () => level.init() ); 
        
        it("Should create nodes to pixi pixRootNode", () => {
            level.start();
            expect( level ).to.have.deep.property('pixRootNode.children.length', 25);
        });

        it("Should unload map", () =>{
            level.unload();
            expect(level.width).to.equal(0);
            expect(level.height).to.equal(0);
            expect(level.map).to.be.undefined;
            expect(level).deep.property('pillsInMap.size', 0);
            expect(level.pixRootNode).deep.property('children.length', 0);
        });
    });

    context("Transforming coords", () => {
        const level = new Level({ level:'../test/testLevel.json' });
        before( () => level.init() ); 
        
        after( () => level.unload() );

        it("Should transform correct 2dCoords to arrayCoords", () => {
            level.start();
            expect( level.__transformToArrayCoords(0,0) ).to.equal(0);
            expect( level.__transformToArrayCoords(4,0) ).to.equal(4);
            expect( level.__transformToArrayCoords(0,1) ).to.equal(5);
            expect( level.__transformToArrayCoords(4,1) ).to.equal(9);
            expect( level.__transformToArrayCoords(4,4) ).to.equal(24);
        });

        it("Should return -1 transforming invalid 2dCoords to arrayCoords", () => {
            expect( level.__transformToArrayCoords(5,0) ).to.equal(-1);
            expect( level.__transformToArrayCoords(0,5) ).to.equal(-1);
            expect( level.__transformToArrayCoords(-1,0) ).to.equal(-1);
            expect( level.__transformToArrayCoords(0,-1) ).to.equal(-1);
            expect( level.__transformToArrayCoords(-1,0) ).to.equal(-1);
        });

         it("Should transform correct arrayCoords to 2dCoords", () => {
            expect( level.__transformTo2dCoords(0) ).to.eql( {x:0, y:0} );
            expect( level.__transformTo2dCoords(4) ).to.eql( {x:4, y:0} );
            expect( level.__transformTo2dCoords(5) ).to.eql( {x:0, y:1} );
            expect( level.__transformTo2dCoords(9) ).to.eql( {x:4, y:1} );
            expect( level.__transformTo2dCoords(24) ).to.eql( {x:4, y:4} );
        });

        it("Should return -1 transforming invalid 2dCoords to arrayCoords", () => {
            expect( level.__transformTo2dCoords(-1) ).to.equal( -1 );
            expect( level.__transformTo2dCoords(25) ).to.equal( -1 );
        });
    });

    context("Pills handling", () => {
        const level = new Level({ level:'../test/testLevel.json' });
        before( () => level.init() ); 
        
        after( () => level.unload() );

        it("Should be a pill in correct pill position", () => {
            level.start();
            expect(level.isPillInPosition(0,0)).to.be.false;
            expect(level.isPillInPosition(1,0)).to.be.false
            expect(level.isPillInPosition(1,1)).to.be.true;
            expect(level.isPillInPosition(4,4)).to.be.false
            expect(level.isPillInPosition(4,3)).to.be.false
            expect(level.isPillInPosition(3,3)).to.be.true;
            expect(level.isPillInPosition(1,3)).to.be.true;
        });

         it("Should return false on outOfBounds pill position", () => {
            level.start();
            expect(level.isPillInPosition(-1,0)).to.be.false;
            expect(level.isPillInPosition(0,-1)).to.be.false
            expect(level.isPillInPosition(5,0)).to.be.false;
            expect(level.isPillInPosition(0,5)).to.be.false
        });
    });
});