<template lang="jade">

  #player

    h1(:style="{ color: color.btnsOdd }") {{action}}

    .controls
      button(@click="pwrPlay", @mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : color.btnsOdd }") {{play ? 'pause' : 'play'}}
      button(@click="audioMute", @mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : color.btnsEven }") {{mute ? 'unmute' : 'mute'}}
      button(@mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : color.btnsOdd }") clear
      button(@mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : color.btnsEven }") next
    
    audio(
      :audio="audio",
      :play="play",
      :mute="mute"
    )
    
    .text(:style="{ color: color.text }") {{{text}}}
    
    background(:color="color")
    
    #matterjs(data-scene="{{game}}")

</template>

<script>
import Audio from './Audio'
import Background from './Background'
export default {
  components: {
    Audio,
    Background
  },
  data () {
    return {
      play: false,
      mute: false,
      action: '',
      game: 'gravity',
      audio: '/static/demo/song1.mp3',
      text: 'pwrTalk is a consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      color: {
        text: 'rgb(113,187,161)',
        btnsOdd: 'rgb(247, 221, 212)',
        btnsEven: 'rgb(255,17,73)',
        bg: 'rgb(252,67,111)',
        gradient: {
          start: 'rgb(252,67,111)',
          end: 'rgb(113,187,161)',
          opacity: 0,
          direction: 'right'
        }
      }
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