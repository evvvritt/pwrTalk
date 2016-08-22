<template lang="jade">
  .background(v-bind:style="{ backgroundColor: colors.bg }")
    .background(v-bind:style="{ background: 'linear-gradient(to ' + colors.gd1direction + ', ' + colors.gd1a + '0%, ' + colors.gd1b + ' 100%)', opacity: colors.gd1op }")
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