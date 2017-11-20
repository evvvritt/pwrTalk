const Matter = require('matter-js/src/module/main.js')

// const _isBrowser = typeof window !== 'undefined' && window.location
// const Matter = _isBrowser ? window.Matter : require('../../build/matter-dev.js')

const Scene = {}
Matter.Scene = Scene
const Engine = Matter.Engine

Scene.engine = function () { // Scene.engine = function (demo) {
  // some example engine options
  const options = {
    positionIterations: 6,
    velocityIterations: 4,
    enableSleeping: false,
    metrics: { extended: true }
  }
  return Engine.create(options)
}

// add scenes
Scene.gravity = require('./ball-pit.js')

module.exports = Scene
