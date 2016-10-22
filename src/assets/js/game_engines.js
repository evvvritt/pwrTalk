const Matter = require('matter-js/src/module/main.js');

//const _isBrowser = typeof window !== 'undefined' && window.location
//const Matter = _isBrowser ? window.Matter : require('../../build/matter-dev.js');

const Example = {};
Matter.Example = Example;

//if (!_isBrowser) {
  //module.exports = Example;
//}

(function () {
  const Engine = Matter.Engine;

  Example.engine = function () { //Example.engine = function (demo) {
    // some example engine options
    const options = {
      positionIterations: 6,
      velocityIterations: 4,
      enableSleeping: false,
      metrics: { extended: true }
    };
    return Engine.create(options);
  };
}());

// gravity
(function () {
  const World = Matter.World
  const Bodies = Matter.Bodies
  const Composites = Matter.Composites
  const Events = Matter.Events
  const Common = Matter.Common

  Example.gravity = function (demo) {
    const engine = demo.engine
    const world = engine.world
    const mouseConstraint = demo.mouseConstraint
    const sceneEvents = demo.sceneEvents
    let dragged = false

    engine.world.gravity.y = 0;

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
      Events.on(mouseConstraint, 'mouseup', () => {
        if (dragged) {
          dragged = false;
          demo.container.classList.remove('behind-text')
        } else {
          demo.container.classList.add('behind-text')
        }
      })
    );

    // Scene Code
    const stack = Composites.stack(50, 50, 3, 3, 100, 50, (x, y) => {
      const options = {
        render: {
          fillStyle: 'rgba(255,0,98,.75)', //'rgba(0,0,255,.75)',
          strokeStyle: 'transparent'
        },
      }

      switch (Math.round(Common.random(0, 1))) {

        case 0:
          if (Common.random() < 0.8) {
            return Bodies.rectangle(x, y, Common.random(100, 150), Common.random(100, 150), options);
          }
          options.id = 'close';
          return Bodies.rectangle(x, y, Common.random(150, 200), Common.random(50, 60), options);
          // break;
        case 1:
          return Bodies.polygon(x, y, Math.round(Common.random(1, 1)), Common.random(100, 100), options);
        default:

      }
      return true // eslint wants a return, but does this break anythign?
    });

    World.add(world, stack);
  };
}());

module.exports = Example;
