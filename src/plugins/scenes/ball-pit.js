const Matter = require('matter-js')
// const tinycolor = require('tinycolor2')

// gravity
const World = Matter.World
const Bodies = Matter.Bodies
const Composites = Matter.Composites
const Events = Matter.Events
const Common = Matter.Common
const defaultSettings = {
  shapesFill: 'rgb(255,0,98)'
}

const ballPit = function (game, settings = defaultSettings) {
  const engine = game.engine
  const world = engine.world
  const mouseConstraint = game.mouseConstraint
  const sceneEvents = game.sceneEvents
  let dragged = false

  // Events
  sceneEvents.push(
    // an example of using mouse events on a mouse
    Events.on(mouseConstraint, 'startdrag', () => {
      if (game.container.classList.contains('behind-text')) {
        game.container.classList.add('behind-text')
      }
      dragged = true
    })
  )
  sceneEvents.push(
    // an example of using mouse events on a mouse
    Events.on(mouseConstraint, 'mousedown', () => {
      if (dragged) {
        dragged = false
        game.container.classList.remove('behind-text')
      }
    })
  )

  // Bodies
  const w = game.render.options.width
  const h = game.render.options.height
  const stack = Composites.stack(w / 4, h / 4, 4, 4, 50, 100, (x, y) => {
    const options = {
      // frictionAir: 0,
      // friction: 0.001, //0.0001,
      restitution: 0.4,
      render: {
        fillStyle: settings.shapesFill,
        strokeStyle: 'transparent'
      }
    }
    switch (Math.round(Common.random(0, 1))) {
      case 0:
        return Bodies.polygon(x, y, Math.round(Common.random(1, 1)), Common.random(75, 75), options)
      case 1:
        if (Common.random() < 0.8) {
          return Bodies.rectangle(x, y, Common.random(100, 150), Common.random(100, 150), options)
        }
        return Bodies.rectangle(x, y, Common.random(150, 200), Common.random(50, 60), options)
      default:
    }
    return true // eslint wants a return, but does this break anythign?
  })

  World.add(world, stack)
}

module.exports = ballPit
