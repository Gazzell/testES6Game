import * as Pixi from 'pixi.js'
import {Level} from './level.es6'

//import * as Pixi_tilemap from 'pixi-tiledmap'
( ( ) => {
	const renderer = new Pixi.autoDetectRenderer(
		800, 600,
		{ antialias: false, transparent: false, resolution: 1});
	document.body.appendChild( renderer.view );


	const lv1 = new Level({ level: './levels/level1.json' });
	lv1.init()
	   .then( () => {
			lv1.start();
			const root = lv1.getRootNode();
			root.x = 400;
			root.y = 300;
			renderer.render( root );
	   }  );
	

} )();
