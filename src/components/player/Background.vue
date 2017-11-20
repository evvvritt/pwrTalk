<template lang="pug">
  .background(:style="layer0")
    .background(:style="layer1")
</template>

<script>
export default {
  props: ['main', 'mainTransition', 'gradient'],
  computed: {
    layer0 () {
      return {
        backgroundColor: this.main,
        transitionDuration: this.mainTransition + 'ms'
      }
    },
    layer1 () {
      return {
        opacity: this.gradient.opacity,
        background: `linear-gradient(to ${this.gradient.direction}, ${this.gradient.start} 0%, ${this.gradient.end} 100%)`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';
#player > .background{
  position: fixed;
  z-index: -1;
  transition:background-color .5s;
}
</style>