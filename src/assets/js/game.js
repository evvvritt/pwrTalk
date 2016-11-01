const Matter = require('matter-js/src/module/main.js');
const Example = require('./game_engines.js');

let Demo;

(function () {
  const isBrowser = typeof window !== 'undefined' && window.location
  const isMobile = isBrowser && /(ipad|iphone|ipod|android)/gi.test(navigator.userAgent)

  //const Matter = isBrowser ? window.Matter : require('../../build/matter-dev.js');

  Demo = {};
  Matter.Demo = Demo;

  //if (!isBrowser) {
    //module.exports = Demo;
    ////window = {};
  //}

  // Matter aliases
  const Body = Matter.Body
  //const Example = Matter.Example
  const Engine = Matter.Engine
  const World = Matter.World
  const Common = Matter.Common
  const Bodies = Matter.Bodies
  const Events = Matter.Events
  //const Mouse = Matter.Mouse
  const MouseConstraint = Matter.MouseConstraint
  //const Runner = Matter.Runner
  const Render = Matter.Render

  //// MatterTools aliases
  //if (window.MatterTools) {
    //const Gui = MatterTools.Gui
    //const Inspector = MatterTools.Inspector
  //}

  Demo.create = function (options) {
    const defaults = {
      isManual: false,
      //sceneName: 'gravity', // default
      sceneEvents: []
    };

    return Common.extend(defaults, options);
  };

  Demo.init = function () {
    const demo = Demo.create();
    Matter.Demo._demo = demo; // Matter.Demo._demo = demo;

    // get container element for the canvas
    demo.container = document.getElementById('matterjs');

    // create an example engine (see /examples/engine.js)
    demo.engine = Example.engine(demo);

    // run the engine
    demo.runner = Engine.run(demo.engine);

    // create a debug renderer
    demo.render = Render.create({
      element: demo.container,
      engine: demo.engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });

    // run the renderer
    Render.run(demo.render);

    // add a mouse controlled constraint
    demo.mouseConstraint = MouseConstraint.create(demo.engine, {
      element: demo.render.canvas,
      constraint: {
        render: {
          visible: false
        }
      }
    });
    World.add(demo.engine.world, demo.mouseConstraint);
    // pass mouse to renderer to enable showMousePosition
    demo.render.mouse = demo.mouseConstraint.mouse;

    // scene function from article data
    demo.sceneName = demo.container.dataset.engine

    // set up a scene with bodies
    Demo.reset(demo);
    Demo.setScene(demo, demo.sceneName);

    // set up demo interface (see end of this file)
    //Demo.initControls(demo);

    // pass through runner as timing for debug rendering
    demo.engine.metrics.timing = demo.runner;

    return demo;
  };

  // call init when the page has loaded fully
  ////if (!_isAutomatedTest) {
  if (window.addEventListener) {
    window.addEventListener('load', Demo.init);
  } else if (window.attachEvent) {
    window.attachEvent('load', Demo.init);
  }
  ////}

  Demo.setScene = function (demo, sceneName) {
    Example[sceneName](demo);
  }
  Demo.reset = function (demo) {
    const demmo = demo
    const world = demmo.engine.world
    let i

    World.clear(world);
    Engine.clear(demmo.engine);

    // clear scene graph (if defined in controller)
    if (demmo.render) {
      const renderController = demmo.render.controller;
      if (renderController && renderController.clear) {
        renderController.clear(demmo.render);
      }
    }

    // clear all scene events
    if (demmo.engine.events) {
      for (i = 0; i < demmo.sceneEvents.length; i += 1) {
        Events.off(demmo.engine, demmo.sceneEvents[i]);
      }
    }

    if (demmo.mouseConstraint && demmo.mouseConstraint.events) {
      for (i = 0; i < demmo.sceneEvents.length; i += 1) {
        Events.off(demmo.mouseConstraint, demmo.sceneEvents[i]);
      }
    }

    if (world.events) {
      for (i = 0; i < demmo.sceneEvents.length; i += 1) {
        Events.off(world, demmo.sceneEvents[i]);
      }
    }

    if (demmo.runner && demmo.runner.events) {
      for (i = 0; i < demmo.sceneEvents.length; i += 1) {
        Events.off(demmo.runner, demmo.sceneEvents[i]);
      }
    }

    if (demmo.render && demmo.render.events) {
      for (i = 0; i < demmo.sceneEvents.length; i += 1) {
        Events.off(demmo.render, demmo.sceneEvents[i]);
      }
    }

    demmo.sceneEvents = [];

    // reset id pool
    Body._nextCollidingGroupId = 1;
    Body._nextNonCollidingGroupId = -1;
    Body._nextCategory = 0x0001;
    Common._nextId = 0;

    // reset random seed
    Common._seed = 0;

    // reset mouse offset and scale (only required for Demo.views)
    //if (demmo.mouseConstraint) {
      //Mouse.setScale(demmo.mouseConstraint.mouse, { x: 1, y: 1 });
      //Mouse.setOffset(demmo.mouseConstraint.mouse, { x: 0, y: 0 });
    //}

    demmo.engine.enableSleeping = false;
    demmo.engine.world.gravity.y = 1;
    demmo.engine.world.gravity.x = 0;
    demmo.engine.timing.timeScale = 1;

    // world boundaries
    const offset = 0
    const width = window.innerWidth
    const height = window.innerHeight
    const thickness = 10
    const top =
      Bodies.rectangle(
        width / 2,
        -thickness - offset,
        width + (thickness * 2),
        thickness,
        { isStatic: true }
      )
    const bottom =
      Bodies.rectangle(
        width / 2,
        height + thickness + offset,
        width + (thickness * 2),
        thickness,
        { isStatic: true }
      )
    const left =
      Bodies.rectangle(
        -offset - thickness,
        height / 2,
        thickness,
        height + (thickness * 2),
        { isStatic: true }
      )
    const right =
      Bodies.rectangle(
        width + offset + thickness,
        height / 2,
        thickness,
        height + (thickness * 2),
        { isStatic: true }
      )
    World.add(world, [top, bottom, left, right])
    // bounce
    top.restitution = bottom.restitution = left.restitution = right.restitution = 1;

    if (demmo.mouseConstraint) {
      World.add(world, demmo.mouseConstraint);
    }

    if (demmo.render) {
      const renderOptions = demmo.render.options;
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

      if (isMobile) {
        renderOptions.showDebug = true;
      }
    }
  };
}());

module.exports = Demo;
