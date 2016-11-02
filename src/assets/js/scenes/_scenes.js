const Matter = require('matter-js/src/module/main.js');

//const _isBrowser = typeof window !== 'undefined' && window.location
//const Matter = _isBrowser ? window.Matter : require('../../build/matter-dev.js');

const Example = {};
Matter.Example = Example;

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

module.exports = Example;

// scenes
require('./ball-pit.js');
