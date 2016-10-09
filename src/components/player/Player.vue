<template lang="jade">

  #player

    nav
      .controls
        button(@click="pwrPlay", @mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : current.colors.btnsOdd }") {{play ? 'pause' : 'play'}}
        button(@click="audioMute", @mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : current.colors.btnsEven }") {{mute ? 'unmute' : 'mute'}}
        button(@mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : current.colors.btnsOdd }") clear
        button(@mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : current.colors.btnsEven }") next
      label(:style="{ color: current.colors.btnsOdd }") {{actionPreview}}
    
    song(:song="current.song",:play="play",:mute="mute")
    
    .text(v-html="current.text",:style="{ color: current.colors.text }") 
    
    background(:colors="current.colors")
    
    #matterjs(:data-scene="current.game")

</template>

<script>
import Song from './Song'
import Background from './Background'

export default {
  components: {
    Song,
    Background
  },
  data() {
    return {
      play: false,
      mute: false,
      actionPreview: '',
      current: {},
      scenes: [
        {
          song: '/static/demo/song1.mp3',
          game: 'gravity',
          text: 'pwrTalk is a consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          colors: {
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
        },
      ]
    }
  },
  created() {
    this.current = this.scenes[0]
  },
  methods: {
    pwrPlay: function (e) {
      this.play = !this.play
      this.mute = this.play ? false : this.mute
      setTimeout(() => {
        this.actionPreview = e.target.innerHTML
      }, 10)
    },
    audioMute: function (e) {
      this.mute = !this.mute
      setTimeout(() => {
        this.actionPreview = e.target.innerHTML
      }, 10)
    },
    btnEnter: function (e) {
      this.actionPreview = e.target.innerHTML
    },
    btnLeave: function () {
      this.actionPreview = ''
    }
  }
}
</script>