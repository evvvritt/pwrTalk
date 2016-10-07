<template lang="jade">
  .background(:style="layer0")
    .background(:style="layer1")
</template>

<script>
export default {
  props: ['color'],
  computed: {
    layer0 () {
      return { backgroundColor: this.color.bg }
    },
    layer1 () {
      return {
        opacity: this.color.gradient.opacity,
        background: 'linear-gradient(to ' + this.color.gradient.direction + ', ' + this.color.gradient.start + '0%, ' + this.color.gradient.end + ' 100%)'
      }
    }
  }
}
</script>

<style lang="scss">
#player > .background{
  position: fixed;
  z-index: -1;
}
</style>