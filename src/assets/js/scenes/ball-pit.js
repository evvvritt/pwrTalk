const Matter = require('matter-js');
const Scenes = require('./_scenes.js');
//const color = require('tinycolor2');

// gravity
(function () {
  const World = Matter.World
  const Bodies = Matter.Bodies
  const Composites = Matter.Composites
  const Events = Matter.Events
  const Common = Matter.Common

  Scenes.gravity = function (demo, bgColor = 'rgb(255,0,98)') {
    const engine = demo.engine
    const world = engine.world
    const mouseConstraint = demo.mouseConstraint
    const sceneEvents = demo.sceneEvents
    let dragged = false

    // Events
    sceneEvents.push(
      // an example of using mouse events on a mouse
      Events.on(mouseConstraint, 'startdrag', () => {
        if (demo.container.classList.contains('behind-text')) {
          demo.container.classList.add('behind-text')
        }
        dragged = true;
      })
    );
    sceneEvents.push(
      // an example of using mouse events on a mouse
      Events.on(mouseConstraint, 'mousedown', () => {
        if (dragged) {
          dragged = false;
          demo.container.classList.remove('behind-text')
        }
      })
    );

    // Bodies
    const stack = Composites.stack(50, 50, 3, 3, 100, 50, (x, y) => {
      const options = {
        //frictionAir: 0,
        //friction: 0.001, //0.0001,
        restitution: 0.4,
        render: {
          fillStyle: bgColor, //color(bgColor).darken().saturate(25), //.setAlpha(0.75), //'rgb(255,0,98)', //fillColor, //'rgba(0,0,255,.75)',
          strokeStyle: 'transparent'
        },
      }
      switch (Math.round(Common.random(0, 1))) {
        case 0:
          if (Common.random() < 0.8) {
            return Bodies.rectangle(x, y, Common.random(100, 150), Common.random(100, 150), options);
          }
          //options.id = 'close';
          return Bodies.rectangle(x, y, Common.random(150, 200), Common.random(50, 60), options);
        case 1:
          return Bodies.polygon(x, y, Math.round(Common.random(1, 1)), Common.random(100, 100), options);
        default:
      }
      return true // eslint wants a return, but does this break anythign?
    });

    World.add(world, stack);
  };
}());

//module.exports = Scenes;
