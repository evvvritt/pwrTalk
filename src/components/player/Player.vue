<template lang="jade">

  #player(:class="{ 'loading' : loading, 'nav-top' : navTop }")

    nav
      ul
        li(@click="pwrPlay", @mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : current.colors.btnsOdd }") {{play ? 'pause' : 'play'}}
        li(@click="audioMute", @mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : current.colors.btnsEven }") {{mute ? 'unmute' : 'mute'}}
        li(@mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : current.colors.btnsOdd }") clear
        li(@click="toggleNav", @mouseenter="btnEnter", @mouseleave="btnLeave", :style="{ backgroundColor : current.colors.btnsEven }") next
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
      loading: false,
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
      ],
      navTop: false,
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
    },
    toggleNav: function () {
      this.loading = true;
      setTimeout(() => {
        this.navTop = !this.navTop;
        this.loading = false;
      }, 600); // give some buffer from animation
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables';

nav{

    li{
      display: block;
      position: fixed;
      width:25%;
      bottom:0;
      height:3%;
      cursor: pointer;
      transition: height .5s, background-color .5s;
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
  
    // states
    .loading > & li{
      height:100%;
    }

    .nav-top > & li{
      // transform:translateY(calc(-100vh + 100%));
      top:0;
      bottom:auto;
    }
}
  
</style>