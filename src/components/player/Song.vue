<template lang="jade">
  audio(ref="song",:src="song",@canplay="canplay")
</template>

<script>
export default {
  props: ['song', 'play', 'mute'],
  methods: {
    canplay() {
      return this.play ? this.$refs.song.play() : null
    },
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