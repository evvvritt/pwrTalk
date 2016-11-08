<template lang="jade">
  #matterjs.background(v-if="gaming",ref="gameboard",:data-engine="current.game",:data-fill="current.colors.bg",@mousewheel="gameLowerZ")
</template>

<script>
const Game = require('../../assets/js/game.js')

export default {
  props: ['gaming', 'current'],
  methods: {
    gameLowerZ: function () {
      this.$refs.gameboard.classList.add('behind-text')
    },
  },
  watch: {
    gaming: (gaming) => {
      if (gaming) {
        setTimeout(() => Game.init(), 10);
      }
    },
    current: (current) => {
      Game.changeScene(current.game)
    }
  },
  // events
  mounted() {
    Game.init()
  }
}
</script>

<style lang="scss">
@import '../../style/variables';
#matterjs{
  position: fixed;
  z-index:$z-matterjs;
  opacity:0.9;
  //height:calc(100vh - #{$nav-h});
  &.behind-text{
    z-index:25;
  }
}
</style>