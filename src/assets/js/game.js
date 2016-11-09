const Matter = require('matter-js/src/module/main.js');
const Scenes = require('./scenes/_scenes.js');

const Game = {};

(function () {
  //const isBrowser = typeof window !== 'undefined' && window.location
  //const isMobile = isBrowser && /(ipad|iphone|ipod|android)/gi.test(navigator.userAgent)

  Matter.Game = Game;

  // Matter aliases
  const Body = Matter.Body
  const Engine = Matter.Engine
  const World = Matter.World
  const Common = Matter.Common
  const Bodies = Matter.Bodies
  const Events = Matter.Events
  const MouseConstraint = Matter.MouseConstraint
  const Render = Matter.Render

  Game.create = function (options) {
    const defaults = {
      isManual: false,
      //sceneName: 'gravity', // default
      sceneEvents: []
    };
    return Common.extend(defaults, options);
  };

  Game.init = function () {
    const game = Game.create();
    Matter.Game._game = game;
    // get container element for the canvas
    game.container = document.getElementById('matterjs');
    // create an example engine (see /examples/engine.js)
    game.engine = Scenes.engine(game);
    // run the engine
    game.runner = Engine.run(game.engine);
    // create a debug renderer
    game.render = Render.create({
      element: game.container,
      engine: game.engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
    // run the renderer
    Render.run(game.render);
    // add a mouse controlled constraint
    game.mouseConstraint = MouseConstraint.create(game.engine, {
      element: game.render.canvas,
      constraint: {
        render: {
          visible: false
        }
      }
    });
    World.add(game.engine.world, game.mouseConstraint);
    // pass mouse to renderer to enable showMousePosition
    game.render.mouse = game.mouseConstraint.mouse;
    // set up a scene with bodies
    Game.reset(game);
    Game.setScene(game, game.container.dataset.engine);
    // pass through runner as timing for debug rendering
    game.engine.metrics.timing = game.runner;

    return game;
  };

  Game.setScene = function (game, sceneName) {
    Scenes[sceneName](game, game.container.dataset.fill);
  }

  Game.reset = function (game) {
    const gamme = game
    const world = gamme.engine.world
    let i

    // DESTORY OLD WORLD ====================================

    World.clear(world);
    Engine.clear(gamme.engine);

    // clear scene graph (if defined in controller)
    if (gamme.render) {
      const renderController = gamme.render.controller;
      if (renderController && renderController.clear) {
        renderController.clear(gamme.render);
      }
    }
    // clear all scene events
    if (gamme.engine.events) {
      for (i = 0; i < gamme.sceneEvents.length; i += 1) {
        Events.off(gamme.engine, gamme.sceneEvents[i]);
      }
    }
    if (gamme.mouseConstraint && gamme.mouseConstraint.events) {
      for (i = 0; i < gamme.sceneEvents.length; i += 1) {
        Events.off(gamme.mouseConstraint, gamme.sceneEvents[i]);
      }
    }
    if (world.events) {
      for (i = 0; i < gamme.sceneEvents.length; i += 1) {
        Events.off(world, gamme.sceneEvents[i]);
      }
    }
    if (gamme.runner && gamme.runner.events) {
      for (i = 0; i < gamme.sceneEvents.length; i += 1) {
        Events.off(gamme.runner, gamme.sceneEvents[i]);
      }
    }
    if (gamme.render && gamme.render.events) {
      for (i = 0; i < gamme.sceneEvents.length; i += 1) {
        Events.off(gamme.render, gamme.sceneEvents[i]);
      }
    }

    gamme.sceneEvents = [];

    // reset id pool
    Body._nextCollidingGroupId = 1;
    Body._nextNonCollidingGroupId = -1;
    Body._nextCategory = 0x0001;
    Common._nextId = 0;

    // reset random seed
    Common._seed = 0;


    // BUILD NEW WORLD ====================================


    gamme.engine.enableSleeping = false;
    gamme.engine.world.gravity.y = -0.25;
    gamme.engine.world.gravity.x = 0;
    gamme.engine.timing.timeScale = 1;

    // world boundaries
    const offset = 150
    const width = window.innerWidth
    const height = window.innerHeight
    const thickness = 10
    const options = {
      restitution: 0.25,
      isStatic: true,
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'transparent',
      }
    }
    const top =
      Bodies.rectangle(
        width / 2,
        -thickness - offset,
        width + (thickness * 2),
        thickness,
        options
      )
    const bottom =
      Bodies.rectangle(
        width / 2,
        height + thickness + offset,
        width + (thickness * 2),
        thickness,
        options
      )
    const left =
      Bodies.rectangle(
        -offset - thickness,
        height / 2,
        thickness,
        height + (thickness * 2),
        options
      )
    const right =
      Bodies.rectangle(
        width + offset + thickness,
        height / 2,
        thickness,
        height + (thickness * 2),
        options
      )
    // add boundaries
    World.add(world, [top, bottom, left, right])

    // add Mouse Constraint
    if (gamme.mouseConstraint) {
      World.add(world, gamme.mouseConstraint);
    }

    // render it
    if (gamme.render) {
      const renderOptions = gamme.render.options;
      renderOptions.wireframes = false;
      renderOptions.hasBounds = false;
      renderOptions.showDebug = false;
      renderOptions.showBroadphase = false;
      renderOptions.showBounds = false;
      renderOptions.showVelocity = false;
      renderOptions.showCollisions = false;
      renderOptions.showAxes = false;
      renderOptions.showPositions = false;
      renderOptions.showAngleIndicator = false;
      renderOptions.showIds = false;
      renderOptions.showShadows = false;
      renderOptions.showVertexNumbers = false;
      renderOptions.showConvexHulls = false;
      renderOptions.showInternalEdges = false;
      renderOptions.showSeparations = false;
      renderOptions.background = 'transparent';

    }
  };

  Game.changeScene = (sceneName) => {
    const game = Matter.Game._game;
    Game.reset(game);
    Game.setScene(game, sceneName);
  }

  Game.explosion = () => {
    const engine = Matter.Game._game.engine
    const bodies = Matter.Composite.allBodies(engine.world);

    engine.world.gravity.y = 0;

    for (let i = 0; i < bodies.length; i += 1) {
      const body = bodies[i];

      if (!body.isStatic) {
        const forceMagnitude = 0.03 * body.mass;
        Body.applyForce(body, body.position, {
          x: (forceMagnitude + (Common.random() * forceMagnitude)) * Common.choose([1, -1]),
          y: (forceMagnitude + (Common.random() * -forceMagnitude)) * Common.choose([1, -1]),
        });
      }
    }
  }

  Game.gravity = (x = 0, y = 0) => {
    const g = Matter.Game._game.engine.world.gravity;
    g.x = x;
    g.y = y;
  }

}());

module.exports = Game;
