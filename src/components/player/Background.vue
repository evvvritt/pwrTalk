<template lang="jade">
  .background(:style="layer0")
    .background(:style="layer1")
</template>

<script>
export default {
  props: ['colors'],
  computed: {
    layer0() {
      return { backgroundColor: this.colors.bg }
    },
    layer1() {
      return {
        opacity: this.colors.gradient.opacity,
        background: `linear-gradient(to ${this.colors.gradient.direction}, ${this.colors.gradient.start} 0%, ${this.colors.gradient.end} 100%)`
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../style/variables';
#player > .background{
  position: fixed;
  z-index: -1;
}
</style>