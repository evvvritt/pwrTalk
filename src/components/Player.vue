<template lang="jade">

  #player
    
    .controls
        label {{action}}
        br
        button(@click="pwrPlay", @mouseenter="btnEnter", @mouseleave="btnLeave") {{play ? 'pause' : 'play'}}
        button(@click="audioMute", @mouseenter="btnEnter", @mouseleave="btnLeave") {{mute ? 'unmute' : 'mute'}}
        button(@mouseenter="btnEnter", @mouseleave="btnLeave") clear
        button(@mouseenter="btnEnter", @mouseleave="btnLeave") next
    
    audio(
      :audio="audio",
      :play="play",
      :mute="mute"
    )
    
    .text {{{text}}}
    
    .background
      div
    
    #matterjs(data-scene="{{scene}}")

</template>

<script>
import Audio from './Audio'
export default {
  components: {
    Audio
  },
  data () {
    return {
      play: false,
      mute: false,
      action: '',
      scene: 'gravity',
      audio: '/static/demo/song1.mp3',
      text: 'pwrTalk is a consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    pwrPlay: function (e) {
      this.play = !this.play
      this.mute = this.play ? false : this.mute
      var vm = this
      setTimeout(function () {
        vm.action = e.target.innerHTML
      }, 10)
    },
    audioMute: function (e) {
      this.mute = !this.mute
      var vm = this
      setTimeout(function () {
        vm.action = e.target.innerHTML
      }, 10)
    },
    btnEnter: function (e) {
      this.action = e.target.innerHTML
    },
    btnLeave: function () {
      this.action = ''
    }
  }
}
</script>