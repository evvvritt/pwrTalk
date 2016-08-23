<template lang="jade">
  .background(v-bind:style="{ backgroundColor: colors.bg }")
    .background(v-bind:style="{ background: 'linear-gradient(to ' + colors.gradient.direction + ', ' + colors.gradient.start + '0%, ' + colors.gradient.end + ' 100%)', opacity: colors.gradient.opoacity }")
</template>

<script>
export default {
  props: ['colors']
}
</script>

<style lang="scss">
#player > .background{
  position: fixed;
  z-index: -1;
}
</style>