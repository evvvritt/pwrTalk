<template lang="jade">
  audio(
        v-el:audio,
        :src="audio",
      )
</template>

<script>
export default {
  props: ['audio', 'play', 'autoplay', 'mute'],
  watch: {
    'play': function (play) {
      play ? this.$els.audio.play() : this.$els.audio.pause()
    },
    'mute': function (mute) {
      this.$els.audio.muted = mute
    }
  }
}
</script>