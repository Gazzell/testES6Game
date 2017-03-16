import { expect } from 'chai';
import {Level} from './level.es6';

describe("Level", () => {
    describe("Level creation", () => {
        const level = new Level();
        it("Should create level", () => {
            expect( level ).not.to.be.undefined;
            expect( level.levelUrl ).to.be.undefined;
            expect( level.pixRootNode ).to.be.undefined;
            expect( level ).to.have.property('width', 0);
            expect( level ).to.have.property('height', 0);
            expect( level ).to.have.property('pillsInMap');
            expect( level ).to.have.deep.property('pillsInMap.size', 0);
        });
    });

    describe("Level initialization", () => {
        const level = new Level();
        before( () => level.init({'level': 'testLevelURL'}) ); 
        it("Level init level with fake map", () => {
            expect( level.pixRootNode ).not.to.be.undefined;
            expect( level ).to.have.property('levelUrl', 'testLevelURL');
            expect( level ).to.have.property('width', 0);
            expect( level ).to.have.property('height', 0);
            expect( level ).to.have.property('pillsInMap');
            expect( level ).to.have.deep.property('pillsInMap.size', 0);
        });
    });

    describe("Map init", () => {
        const level = new Level();
        before( () => level.init({ level:'../test/testLevel.json' }) );  

        it("Should load json map from file", () => {
            expect( level ).to.have.property('width', 5);
            expect( level ).to.have.property('height', 5);
            expect( level ).to.have.property('map');
            expect( level ).to.have.deep.property('map.map').to.be.instanceof(Array);
            expect( level ).to.have.deep.property('pillsInMap.size', 9);
        });

        it("Should unload level resources", () => {
            level.unload();
            expect( level ).to.have.property('width', 0);
            expect( level ).to.have.property('height', 0);
            expect( level.map ).to.be.undefined;
            expect( level ).to.have.deep.property('pillsInMap.size', 0);
        });
    });

    describe("Map loading and unloading", () => {
        const level = new Level();
        before( () => level.init({ level:'../test/testLevel.json' }) ); 
        
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

    describe("Transforming coords", () => {
        const level = new Level();
        before( () => level.init({ level:'../test/testLevel.json' }) ); 
        
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

    describe("Pills handling", () => {
        const level = new Level();
        before( () => level.init({ level:'../test/testLevel.json' }) ); 
        
        after( () => level.unload() );

        it("Should be a pill in correct pill position", () => {
            level.start();
            expect(level.isPillInPosition(0,0)).to.be.false;
            let pillFather = level.pixRootNode.children[0];
            expect(pillFather).deep.property('children.length',0);
            expect(level.isPillInPosition(1,0)).to.be.false;
            pillFather = level.pixRootNode.children[1];
            expect(pillFather).deep.property('children.length',0);
            expect(level.isPillInPosition(1,1)).to.be.true;
            pillFather = level.pixRootNode.children[6];
            expect(pillFather).deep.property('children.length',1);
            expect(level.isPillInPosition(4,4)).to.be.false;
            pillFather = level.pixRootNode.children[24];
            expect(pillFather).deep.property('children.length',0);
            expect(level.isPillInPosition(4,3)).to.be.false;
            pillFather = level.pixRootNode.children[23];
            expect(pillFather).deep.property('children.length',0);
            expect(level.isPillInPosition(3,3)).to.be.true;
            pillFather = level.pixRootNode.children[18];
            expect(pillFather).deep.property('children.length',1);
            expect(level.isPillInPosition(1,3)).to.be.true;
            pillFather = level.pixRootNode.children[8];
            expect(pillFather).deep.property('children.length',1);
        });

         it("Should return false on outOfBounds pill position", () => {
            expect(level.isPillInPosition(-1,0)).to.be.false;
            expect(level.isPillInPosition(0,-1)).to.be.false
            expect(level.isPillInPosition(5,0)).to.be.false;
            expect(level.isPillInPosition(0,5)).to.be.false
        });

        it("Should eat pills correctly", () => {
            expect( level ).to.have.deep.property('pillsInMap.size', 9);
            expect( level.eatPill(1,1) ).to.equal( 8 );
            let pillFather = level.pixRootNode.children[6];
            expect(pillFather).deep.property('children.length',0);
            expect( level.eatPill(1,1) ).to.equal( 8 );
            expect( level.eatPill(0,0) ).to.equal( 8 );
            expect( level.eatPill(-1,1) ).to.equal( 8 );
            expect( level.eatPill(3,3) ).to.equal( 7 );
            pillFather = level.pixRootNode.children[18];
            expect(pillFather).deep.property('children.length',0);
            expect( level.eatPill(1,-1) ).to.equal( 7 );
            expect( level.eatPill(4,4) ).to.equal( 7 );
            expect( level.eatPill(5,0) ).to.equal( 7 );
            expect( level.eatPill(0,5) ).to.equal( 7 );
        });
    });

    describe("Walkable areas handling", () => {
        const level = new Level();
        before( () => level.init({ level:'../test/testLevel.json' }) ); 
        
        after( () => level.unload() );

        it("Should check if areas are walkable correctly", () => {
            level.start();
            expect(level.isWalkable(0,0)).to.be.false;
            expect(level.isWalkable(1,0)).to.be.false;
            expect(level.isWalkable(1,1)).to.be.true;
            expect(level.isWalkable(-1,0)).to.be.false;
            expect(level.isWalkable(0,-1)).to.be.false;
            expect(level.isWalkable(4,0)).to.be.false;
            expect(level.isWalkable(0,4)).to.be.false;
            expect(level.isWalkable(5,0)).to.be.false;
            expect(level.isWalkable(0,5)).to.be.false;
            expect(level.isWalkable(3,3)).to.be.true;
            expect(level.isWalkable(2,2)).to.be.true;
        });
    });
});