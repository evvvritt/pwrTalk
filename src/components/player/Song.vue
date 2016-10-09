<template lang="jade">
  audio(ref="song",:src="song")
</template>

<script>
export default {
  props: ['song', 'play', 'autoplay', 'mute'],
  watch: {
    play: function (play) {
      return play ? this.$els.song.play() : this.$els.song.pause()
    },
    mute: function (mute) {
      this.$els.song.muted = mute
    }
  }
}
</script>