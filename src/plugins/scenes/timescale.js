const Matter = require('matter-js/src/module/main.js');
const Example = require('./_scenes.js');

// time scaling
(function () {

  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const Body = Matter.Body;
  const Composite = Matter.Composite;
  const Composites = Matter.Composites;
  const Common = Matter.Common;
  const Events = Matter.Events;

  Example.timescale = function (demo) {
    const engine = demo.engine;
    const world = engine.world;
    const sceneEvents = demo.sceneEvents;

    setTimeout(() => {
      engine.world.gravity.y = 0;
    }, 500);

    const explosion = (engin) => {
      const bodies = Composite.allBodies(engin.world);

      for (let i = 0; i < bodies.length; i += 1) {
        const body = bodies[i];

        if (!body.isStatic && body.position.y >= 500) {
          const forceMagnitude = body.mass * 0.05;

          Body.applyForce(body, body.position, {
            x: (forceMagnitude + (Common.random() * forceMagnitude)) * Common.choose([1, -1]),
            y: -forceMagnitude + (Common.random() * -forceMagnitude)
          });
        }
      }
    }

    let timeScaleTarget = 0;
    let counter = 0;

    sceneEvents.push(
      Events.on(engine, 'afterUpdate-asdfasf', () => {
        // tween the timescale for bullet time slow-mo
        engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 0.05;
        counter += 1;
        // every 1.5 sec
        if (counter >= 60 * 3) {
          // flip the timescale
          if (timeScaleTarget < 1) {
            timeScaleTarget = 1;
          } else {
            timeScaleTarget = 0.05;
          }
          // create some random forces
          explosion(engine);
          // reset counter
          counter = 0;
        }
      })
    );

    const bodyOptions = {
      frictionAir: 0,
      friction: 0.0001,
      restitution: 0.8,
      //render: {
        //fillStyle: 'rgba(255,0,98,.9)', //rgba(255,0,98,.75)', //'rgba(0,0,255,.75)',
        //strokeStyle: 'transparent'
      //}
    };

    // add some small bouncy circles... remember Swordfish?
    World.add(world, Composites.stack(20, 100, 15, 3, 20, 40, (x, y) => Bodies.circle(x, y, Common.random(10, 20), bodyOptions)));

    // add some larger random bouncy objects
    World.add(world, Composites.stack(50, 50, 8, 3, 0, 0, (x, y) => {
      switch (Math.round(Common.random(0, 1))) {
        case 0:
          if (Common.random() < 0.8) {
            return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50), bodyOptions);
          }
          return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30), bodyOptions);
        case 1:
          return Bodies.polygon(x, y, Math.round(Common.random(4, 8)), Common.random(20, 50), bodyOptions);
        default:
      }
      return true
    }));
  };

}());
