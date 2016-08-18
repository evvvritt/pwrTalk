<template lang="jade">

  #player
    
    .controls
      label {{controls.preview}}
      button(v-on:click="audioPlay()") {{play ? 'pause' : 'play'}}
      button(v-on:click="audioMute()") {{mute ? 'unmute' : 'mute'}}
      button(v-on:click="matterjsClear()") clear
      button(v-on:click="next()") next
    
    audio(
      v-el:audio,
      v-bind:src="audio"
    )
    
    .text {{{text}}}
    
    .background
      div
    
    #matterjs(data-scene="{{scene}}")

</template>

<script>
export default {
  data () {
    return {
      play: false,
      mute: false,
      controls: {
        label: ''
      },
      scene: 'gravity',
      audio: '/static/demo/song1.mp3',
      text: 'pwrTalk is a consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    audioPlay: function () {
      if (!this.play) { // play
        this.$els.audio.play()
        this.play = true
        // unmute
        this.mute = false
        this.$els.audio.muted = false
      } else { // pause
        this.$els.audio.pause()
        this.play = false
      }
    },
    audioMute: function () {
      this.mute = !this.mute
      var audio = this.$els.audio
      audio.muted = !audio.muted
    },
    matterjsClear: function () {
      console.log('clean')
    },
    next: function () {
      console.log('next')
    }
  }
}
</script>