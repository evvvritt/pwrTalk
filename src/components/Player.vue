<template lang="jade">

  #player
    
    .controls
        label {{action}}
        br
        button(@click="pwrPlay", @mouseenter="btnEnter", @mouseleave="btnLeave", v-bind:style="{ backgroundColor : colors.btns1 }") {{play ? 'pause' : 'play'}}
        button(@click="audioMute", @mouseenter="btnEnter", @mouseleave="btnLeave", v-bind:style="{ backgroundColor : colors.btns2 }") {{mute ? 'unmute' : 'mute'}}
        button(@mouseenter="btnEnter", @mouseleave="btnLeave", v-bind:style="{ backgroundColor : colors.btns1 }") clear
        button(@mouseenter="btnEnter", @mouseleave="btnLeave", v-bind:style="{ backgroundColor : colors.btns2 }") next
    
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
      text: 'pwrTalk is a consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      colors: {
        btns1: 'rgb(247, 221, 212)',
        btns2: 'rgb(255,17,73)',
        bg: 'rgb(252,67,111)',
        gd1a: 'rgb(252,67,111)',
        gd1b: 'rgb(113,187,161)',
        gd1direction: 'top'
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