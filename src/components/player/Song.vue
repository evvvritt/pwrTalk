<template lang="jade">
  audio(ref="song",:src="song",@canplay="canplay",@ended="ended")
</template>

<script>
export default {
  props: ['song', 'play', 'mute'],
  methods: {
    canplay: function () {
      return this.play ? this.$refs.song.play() : null
    },
    ended: function () {
      return this.$emit('ended')
    }
  },
  watch: {
    play: function () {
      return this.play ? this.$refs.song.play() : this.$refs.song.pause()
    },
    mute: function (mute) {
      this.$refs.song.muted = mute
    },
  }
}
</script>