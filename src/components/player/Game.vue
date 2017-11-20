<template lang="pug">
  #matterjs(v-if="gaming", :data-game="current.game", :data-fill="current.colors.shapes", @mousewheel="isBehindText")
</template>

<script>
import Game from '@/plugins/game.js'
export default {
  props: ['current', 'play', 'gaming', 'event'],
  data () {
    return {
      isBackground: false
    }
  },
  watch: {
    current (current) {
      this.$nextTick(() => { Game.changeGame(current.game) })
    },
    gaming (gaming) {
      if (gaming) this.$nextTick(() => { this.start() })
    },
    play (play) {
      if (play) {
        Game.explosion()
        Game.gravity(0, 0)
      } else {
        Game.gravity(0, 0.25)
      }
    },
    event () {
      Game.explosion()
    }
  },
  methods: {
    start () {
      Game.init(this.$el)
    },
    isBehindText: function () {
      this.$el.classList.add('behind-text')
    }
  },
  mounted () {
    this.start()
  }
}
</script>

<style lang="scss">
@import '../../style/variables';
$offset: 30%;
#matterjs{
  position: fixed;
  width:100% + $offset; height:100% + $offset;
  top:-$offset/2; left:-$offset/2;
  z-index:$z-matterjs;
  &.behind-text{
    z-index:25;
  }
}
</style>