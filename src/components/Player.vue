<template lang="jade">

  #player

    h1(v-bind:style="{ color: colors.btns.odd }") {{action}}

    .controls
      button(@click="pwrPlay", @mouseenter="btnEnter", @mouseleave="btnLeave", v-bind:style="{ backgroundColor : colors.btns.odd }") {{play ? 'pause' : 'play'}}
      button(@click="audioMute", @mouseenter="btnEnter", @mouseleave="btnLeave", v-bind:style="{ backgroundColor : colors.btns.even }") {{mute ? 'unmute' : 'mute'}}
      button(@mouseenter="btnEnter", @mouseleave="btnLeave", v-bind:style="{ backgroundColor : colors.btns.odd }") clear
      button(@mouseenter="btnEnter", @mouseleave="btnLeave", v-bind:style="{ backgroundColor : colors.btns.even }") next
    
    audio(
      :audio="audio",
      :play="play",
      :mute="mute"
    )
    
    .text {{{text}}}
    
    background(:colors="colors")
    
    #matterjs(data-scene="{{scene}}")

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
      scene: 'gravity',
      audio: '/static/demo/song1.mp3',
      text: 'pwrTalk is a consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      colors: {
        btns: {
          odd: 'rgb(247, 221, 212)',
          even: 'rgb(255,17,73)'
        },
        bg: 'rgb(252,67,111)',
        gradient: {
          start: 'rgb(252,67,111)',
          end: 'rgb(113,187,161)',
          opacity: '0',
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