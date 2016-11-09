<template lang="jade">

  #player(:class="{ 'loading' : loading, 'nav-top' : navTop }")

    nav
      ul
        li(@click="pwrPlay", @mouseenter="setActionPreview($event)", @mouseleave="setActionPreview()", :style="{ backgroundColor : current.colors.btnsOdd }") {{play ? 'pause' : 'play'}}
        li(@click="audioMute", @mouseenter="setActionPreview($event)", @mouseleave="setActionPreview()", :style="{ backgroundColor : current.colors.btnsEven }") {{mute ? 'unmute' : 'mute'}}
        li(@click="gameState", @mouseenter="setActionPreview($event)", @mouseleave="setActionPreview()", :style="{ backgroundColor : current.colors.btnsOdd }") {{gaming ? 'clean' : 'messy'}}
        li(@click="nextScene", @mouseenter="setActionPreview($event)", @mouseleave="setActionPreview()", :style="{ backgroundColor : current.colors.btnsEven }") next
      label(:style="{ color: current.colors.btnsOdd }") {{actionPreview}}
    
    article
      .text(v-html="current.text",:style="current.textStyle") 
      //- song(:song="current.song",:play="play",:mute="mute",v-on:ended="nextScene")
      audio(ref="song",:src="current.song",@canplay="audioCanPlay",@playing="audioIsPlaying",@timeupdate="audioTime",@ended="nextScene")
    
    background(:colors="current.colors")

    gameboard(:gaming="gaming",:current="current")

</template>



<!-- ==================================================================== -->



<script>
import Background from './Background'
import Gameboard from './Game'

const Game = require('../../assets/js/game.js')

export default {
  props: ['scenes'],
  components: {
    Background,
    Gameboard
  },
  data() {
    return {
      play: false,
      mute: false,
      gaming: true,
      loading: false,
      actionPreview: 'pwrTalk',
      index: 0,
      navTop: false,
    }
  },
  computed: {
    current() {
      return this.scenes[this.index]
    }
  },
  methods: {
    pwrPlay: function (e) {
      const audio = this.$refs.song
      // pause or play ?
      if (!audio.paused && audio.duration > 0) {
        audio.pause()
        this.play = false
      } else {
        audio.play()
        this.mute = false
      }
      // update button preview
      setTimeout(() => { this.setActionPreview(e.target.innerHTML) }, 50);
    },
    audioMute: function (e) {
      this.mute = !this.mute
      setTimeout(() => { this.setActionPreview(e.target.innerHTML) }, 50);
    },
    audioCanPlay: function () {
      return this.play ? this.$refs.song.play() : null
    },
    audioIsPlaying: function () {
      this.play = true
    },
    audioTime: function () {
      const events = this.current.events
      if (events.length > 0) {
        if (this.$refs.song.currentTime >= events[0].time && events.length > 0) {
          // game event
          Game.explosion();
          // change colors
          this.current.colors.bgTransition = events[0].transition
          this.current.colors.bg = events[0].color
          events.shift()
        }
      }
    },
    nextScene: function () {
      this.loading = true;
      // after loading state finishes
      setTimeout(() => {
        this.index = this.index + 1 === this.scenes.length ? 0 : this.index + 1
        this.navTop = !this.navTop
        this.actionPreview = ''
        this.loading = false
      }, 550); // have some buffer from animation
    },
    setActionPreview: function (e = '') {
      this.actionPreview = typeof e.target === 'undefined' ? e : e.target.innerHTML
    },
    gameState: function () {
      this.gaming = !this.gaming
    },
    onKeyDown: function (e) {
      if (e.keyCode === 32) { // spacebar
        e.preventDefault()
        this.pwrPlay()
      }
    }
  },
  watch: {
    play: function (play) {
      if (play) {
        Game.explosion()
        Game.gravity(0, 0)
      } else {
        Game.gravity(0, 0.25)
      }
    },
    mute: function (val) {
      this.$refs.song.muted = val
    },
    index: function (newVal, oldVal) {
      if (oldVal.length !== -1) {
        this.$set(this.scenes[oldVal], 'colors', Object.assign({}, this.scenes[oldVal]._init.colors))
        this.scenes[oldVal].events = this.scenes[oldVal]._init.events.slice(0)
      }
    }
  },
  created() {
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
</script>



<!-- ==================================================================== -->



<style lang="scss" scoped>
@import '../../style/variables';

nav{
    ul > li{
      display: block;
      position: fixed;
      width:25%;
      bottom:0;
      height:$nav-h;
      cursor: pointer;
      transition: height .5s, background-color .5s;
      z-index: $z-nav;
      color:transparent;
      &:nth-child(1){
          left:0;
      }
      &:nth-child(2){
        left:calc(100%/4);
        transition-delay:.05s;
      }
      &:nth-child(3){
        left:calc(100%/2);
        transition-delay:.1s;
      }
      &:nth-child(4){
        left:calc(100%*3/4);
        transition-delay:.15s;
      }
    }

    > label{
      position: fixed;
      width: 100%;
      font-size:200px;
      height:200px;
      line-height: 1;
      top:calc(50% - 120px);
      text-align: center;
      font-weight: 600;
      letter-spacing: .25em;
      z-index:$z-nav-label;
    }
    
    // hover effect       — use psuedo to scale since li has transition-delay...
    > ul > li:before{
      content:'';
      display: block;
      width:100%; height:100%;
      position:absolute;
      top:0; left:0;
      transition:transform .5s;
      background-color:inherit;
      z-index: -1;
    }
    > ul:hover > li:before{
      transform:scale(1,2);
    }
  
    // states
    .loading > & ul > li{
      height:100%;
    }
    .nav-top > & ul > li{
      // transform:translateY(calc(-100vh + 100%));
      top:0;
      bottom:auto;
    }
}

.text{
  font-size:3em;
  line-height: 2em;
  letter-spacing: 4em;
  word-wrap:break-word;
  position: relative;
  z-index: 30;
}
  
</style>