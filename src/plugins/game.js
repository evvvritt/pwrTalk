const Matter = require('matter-js/src/module/main.js')
const Scenes = require('./scenes/_scenes.js')

const Game = {}

// const isBrowser = typeof window !== 'undefined' && window.location
// const isMobile = isBrowser && /(ipad|iphone|ipod|android)/gi.test(navigator.userAgent)

Matter.Game = Game

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
    // sceneName: 'gravity', // default
    sceneEvents: []
  }
  return Common.extend(defaults, options)
}

Game.init = function (containerEl) {
  const game = Game.create()
  Matter.Game._game = game
  // get container element for the canvas
  game.container = containerEl // document.getElementById('matterjs')
  // create an example engine (see /examples/engine.js)
  game.engine = Scenes.engine()
  // run the engine
  game.runner = Engine.run(game.engine)
  // create a debug renderer
  game.render = Render.create({
    element: game.container,
    engine: game.engine,
    options: {
      width: game.container.offsetWidth,
      height: game.container.offsetHeight
    }
  })
  // run the renderer
  Render.run(game.render)
  // add a mouse controlled constraint
  game.mouseConstraint = MouseConstraint.create(game.engine, {
    element: game.render.canvas,
    constraint: {
      render: {
        visible: false
      }
    }
  })
  World.add(game.engine.world, game.mouseConstraint)
  // pass mouse to renderer to enable showMousePosition
  game.render.mouse = game.mouseConstraint.mouse
  // set up a scene with bodies
  Game.reset(game)
  Game.setScene(game, game.container.dataset.game)
  // pass through runner as timing for debug rendering
  game.engine.metrics.timing = game.runner

  return game
}

Game.setScene = function (game, sceneName) {
  const options = {
    shapesFill: game.container.dataset.fill
  }
  Scenes[sceneName](game, options)
}

Game.reset = function (game) {
  const world = game.engine.world
  let i

  // DESTORY OLD WORLD ====================================

  World.clear(world)
  Engine.clear(game.engine)

  // clear scene graph (if defined in controller)
  if (game.render) {
    const renderController = game.render.controller
    if (renderController && renderController.clear) {
      renderController.clear(game.render)
    }
  }
  // clear all scene events
  if (game.engine.events) {
    for (i = 0; i < game.sceneEvents.length; i += 1) {
      Events.off(game.engine, game.sceneEvents[i])
    }
  }
  if (game.mouseConstraint && game.mouseConstraint.events) {
    for (i = 0; i < game.sceneEvents.length; i += 1) {
      Events.off(game.mouseConstraint, game.sceneEvents[i])
    }
  }
  if (world.events) {
    for (i = 0; i < game.sceneEvents.length; i += 1) {
      Events.off(world, game.sceneEvents[i])
    }
  }
  if (game.runner && game.runner.events) {
    for (i = 0; i < game.sceneEvents.length; i += 1) {
      Events.off(game.runner, game.sceneEvents[i])
    }
  }
  if (game.render && game.render.events) {
    for (i = 0; i < game.sceneEvents.length; i += 1) {
      Events.off(game.render, game.sceneEvents[i])
    }
  }

  game.sceneEvents = []

  // reset id pool
  Body._nextCollidingGroupId = 1
  Body._nextNonCollidingGroupId = -1
  Body._nextCategory = 0x0001
  Common._nextId = 0

  // reset random seed
  Common._seed = 0

  // BUILD NEW WORLD ====================================

  game.engine.enableSleeping = false
  game.engine.world.gravity.y = -0.25
  game.engine.world.gravity.x = 0
  game.engine.timing.timeScale = 1

  // world boundaries
  const offset = -5 // 150
  const thickness = 50
  const frame = {
    width: game.render.options.width,
    height: game.render.options.height
  }
  const options = {
    restitution: 0.25,
    isStatic: true,
    render: {
      fillStyle: 'green',
      strokeStyle: 'transparent'
    }
  }
  const top =
    Bodies.rectangle(
      frame.width / 2, // x
      (0 - thickness / 2 - offset), // y
      frame.width + thickness * 2 + offset * 2, // + (thickness * 2), // width
      thickness,
      options
    )
  const bottom =
    Bodies.rectangle(
      frame.width / 2, // x
      frame.height + thickness / 2 + offset, // y
      frame.width + thickness * 2 + offset * 2, // width
      thickness, // height
      options
    )
  const left =
    Bodies.rectangle(
      (0 - thickness / 2 - offset), // x
      frame.height / 2, // y
      thickness, // width
      frame.height + thickness * 2 + offset * 2, // height
      options
    )
  const right =
    Bodies.rectangle(
      frame.width + offset + thickness / 2, // x
      frame.height / 2, // y
      thickness, // width
      frame.height + thickness * 2 + offset * 2, // height
      options
    )
  // add boundaries
  World.add(world, [top, bottom, left, right])

  // add Mouse Constraint
  if (game.mouseConstraint) {
    World.add(world, game.mouseConstraint)
  }

  // render it
  if (game.render) {
    const renderOptions = game.render.options
    renderOptions.wireframes = false
    renderOptions.hasBounds = false
    renderOptions.showDebug = false
    renderOptions.showBroadphase = false
    renderOptions.showBounds = false
    renderOptions.showVelocity = false
    renderOptions.showCollisions = false
    renderOptions.showAxes = false
    renderOptions.showPositions = false
    renderOptions.showAngleIndicator = false
    renderOptions.showIds = false
    renderOptions.showShadows = false
    renderOptions.showVertexNumbers = false
    renderOptions.showConvexHulls = false
    renderOptions.showInternalEdges = false
    renderOptions.showSeparations = false
    renderOptions.background = 'transparent'
  }
}

Game.changeGame = (sceneName) => {
  const game = Matter.Game._game
  Game.reset(game)
  Game.setScene(game, sceneName)
}

Game.explosion = () => {
  const engine = Matter.Game._game.engine
  const bodies = Matter.Composite.allBodies(engine.world)

  engine.world.gravity.y = 0

  for (let i = 0; i < bodies.length; i += 1) {
    const body = bodies[i]
    if (!body.isStatic) {
      const forceMagnitude = 0.03 * body.mass
      Body.applyForce(body, body.position, {
        x: (forceMagnitude + (Common.random() * forceMagnitude)) * Common.choose([1, -1]),
        y: (forceMagnitude + (Common.random() * -forceMagnitude)) * Common.choose([1, -1])
      })
    }
  }
}

Game.gravity = (x = 0, y = 0) => {
  const g = Matter.Game._game.engine.world.gravity
  g.x = x
  g.y = y
}

module.exports = Game
