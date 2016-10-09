<template lang="jade">

  #player(:class="{ 'loading' : loading, 'nav-top' : navTop }")

    nav
      ul
        li(@click="pwrPlay", @mouseenter="setActionPreview($event)", @mouseleave="setActionPreview()", :style="{ backgroundColor : current.colors.btnsOdd }") {{play ? 'pause' : 'play'}}
        li(@click="audioMute", @mouseenter="setActionPreview($event)", @mouseleave="setActionPreview()", :style="{ backgroundColor : current.colors.btnsEven }") {{mute ? 'unmute' : 'mute'}}
        li(@mouseenter="setActionPreview($event)", @mouseleave="setActionPreview()", :style="{ backgroundColor : current.colors.btnsOdd }") clear
        li(@click="nextScene", @mouseenter="setActionPreview($event)", @mouseleave="setActionPreview()", :style="{ backgroundColor : current.colors.btnsEven }") next
      label(:style="{ color: current.colors.btnsOdd }") {{actionPreview}}
    
    song(:song="current.song",:play="play",:mute="mute")
    
    .text(v-html="current.text",:style="current.textStyle") 
    
    background(:colors="current.colors")
    
    #matterjs(:data-scene="current.game")

</template>

<!-- ==================================================================== -->

<script>
import Song from './Song'
import Background from './Background'

export default {
  props: ['scenes'],
  components: {
    Song,
    Background
  },
  data() {
    return {
      play: false,
      mute: false,
      loading: false,
      actionPreview: '',
      index: 0,
      navTop: false,
    }
  },
  computed: {
    current() {
      return this.scenes[this.index]
    },
  },
  methods: {
    pwrPlay: function (e) {
      this.play = !this.play
      this.mute = this.play ? false : this.mute
      setTimeout(() => { this.setActionPreview(e.target.innerHTML) }, 10);
    },
    audioMute: function (e) {
      this.mute = !this.mute
      setTimeout(() => { this.setActionPreview(e.target.innerHTML) }, 10);
    },
    setActionPreview: function (e = '') {
      this.actionPreview = typeof e.target === 'undefined' ? e : e.target.innerHTML
    },
    nextScene: function () {
      this.loading = true;
      // after loading animation
      setTimeout(() => {
        this.index = this.index + 1 === this.scenes.length ? 0 : this.index + 1
        this.navTop = !this.navTop
        this.actionPreview = ''
        this.loading = false
      }, 550); // give some buffer from animation
    }
  },
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
      height:3%;
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
}
  
</style>