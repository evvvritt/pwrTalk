<template lang="jade">
  audio(ref="song",:src="song")
</template>

<script>
export default {
  props: ['song', 'play', 'autoplay', 'mute'],
  watch: {
    play: function (play) {
      console.log(play);
      return play ? this.$refs.song.play() : this.$refs.song.pause()
    },
    mute: function (mute) {
      this.$refs.song.muted = mute
    }
  }
}
</script>