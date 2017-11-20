<template lang="pug">
  #player(:class="{'loading' : loading, 'nav-top' : navTop}")
    nav(@mouseleave="activeBtnKey = null")
      ul
        li(@click="pwrPlay", @mouseenter="activeBtnKey = 'play'", :style="{ backgroundColor : scene.colors.btnsOdd }", :aria-label="buttons.play") 
        li(@click="mute = !mute", @mouseenter="activeBtnKey = 'mute'", :style="{ backgroundColor : scene.colors.btnsEven }", :aria-label="buttons.mute") 
        li(@click="gameState", @mouseenter="activeBtnKey = 'gaming'", :style="{ backgroundColor : scene.colors.btnsOdd }", :aria-label="buttons.gaming") 
        li(@click="nextScene", @mouseenter="activeBtnKey = 'next'", :style="{ backgroundColor : scene.colors.btnsEven }", :aria-label="buttons.next")
      label(:style="{ color: scene.colors.btnsOdd }") 
        span(v-for="(value, key) in buttons", v-show="activeBtnKey === key") {{value}}
    article
      .text(v-html="scene.text", :style="scene.textStyle") 
      //- song(:song="scene.song",:play="play",:mute="mute",v-on:ended="nextScene")
      audio(ref="song", :src="scene.song", @canplay="audioCanPlay", @playing="play = true",@timeupdate="setEventIndex", @ended="nextScene")
    background(:main="bgColor", :mainTransition="bgColorTransition", :gradient="scene.colors.gradient")
    gameboard(:play="play", :gaming="gaming", :current="scene", :event="eventIndex") 
</template>

<script>
// import Game from '@/plugins/game.js'
import _throttle from 'lodash/throttle'
import tinycolor from 'tinycolor2'
import Background from '@/components/player/Background'
import Gameboard from '@/components/player/Game'
export default {
  props: ['scenes'],
  components: {
    Background,
    Gameboard
  },
  data () {
    return {
      play: false,
      mute: false,
      gaming: true,
      loading: false,
      activeBtnKey: 'logo',
      sceneIndex: 0,
      eventIndex: 0,
      navTop: false,
      bgColor: null
    }
  },
  computed: {
    scene () {
      return this.scenes[this.sceneIndex]
    },
    event () {
      if (this.scene.events) return this.scene.events[this.eventIndex]
    },
    buttons () {
      return {
        logo: '_pwrTalk',
        play: this.play ? 'pause' : 'play',
        mute: this.mute ? 'unmute' : 'mute',
        gaming: this.gaming ? 'clean' : 'messy',
        next: 'next'
      }
    },
    bgColorTransition () {
      return this.event.transition
    }
  },
  watch: {
    mute (val) {
      this.$refs.song.muted = val
    },
    scene (scene) {
      this.eventIndex = 0
      this.bgColor = scene.colors.bg.color
    },
    eventIndex (index) {
      if (index > 0) this.bgColor = tinycolor(this.bgColor)[this.event.action](this.event.value).toString()
    }
  },
  methods: {
    pwrPlay (label) {
      const audio = this.$refs.song
      if (!audio.paused && audio.duration > 0) {
        audio.pause()
        this.play = false
      } else {
        audio.play()
        this.mute = false
      }
    },
    audioCanPlay () {
      return this.play ? this.$refs.song.play() : null
    },
    setEventIndex: _throttle(function (e) {
      const currentTime = e.target.currentTime
      const events = this.scene.events
      for (var i = events.length - 1; i >= 0; i--) {
        if (currentTime >= events[i].time) {
          this.eventIndex = i
          break
        }
      }
    }, 100),
    nextScene () {
      this.loading = true
      // after loading state finishes
      setTimeout(() => {
        this.sceneIndex = this.sceneIndex + 1 === this.scenes.length ? 0 : this.sceneIndex + 1
        this.navTop = !this.navTop
        this.activeBtn = null
        this.loading = false
      }, 550) // have some buffer from animation
    },
    gameState () {
      this.gaming = !this.gaming
    },
    onKeyDown (e) {
      // spacebar
      if (e.keyCode === 32) {
        e.preventDefault()
        this.pwrPlay()
      }
    }
  },
  created () {
    if (this.scene) this.bgColor = this.scene.colors.bg.color
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.onKeyDown)
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

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
      font-size:12vw;
      height:12vw;
      line-height: 1;
      top:calc(50% - 6vw);
      text-align: center;
      font-weight: 700;
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

article{
  width:95%;
  margin:0 auto;
}

.text{
  font-size:3em;
  line-height: 2em;
  letter-spacing: 4em;
  word-wrap:break-word;
  position: relative;
  z-index: 30;
  @media screen and (max-width:$bkpt-m){
    font-size:1.5em;
    margin-left:10% !important;
    margin-right:0 !important;
  }
}
  
</style>