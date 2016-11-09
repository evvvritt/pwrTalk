<template lang="jade">
  #app 
    player(:scenes="scenes")
</template>

<script>
import Player from './components/player/Player'

export default {
  components: {
    Player,
  },
  data() {
    return {
      scenes: [
        {
          song: '/static/demo/song1.mp3',
          game: 'gravity',
          text: 'pwrTalk is a consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          textStyle: {
            margin: '50vh 0 30vh 25%',
            textAlign: 'center',
            color: 'rgb(113,187,161)',
          },
          colors: {
            btnsOdd: 'rgb(247, 221, 212)',
            btnsEven: 'rgb(255,17,73)',
            bg: {
              color: 'rgb(252,67,111)',
              transition: '750ms',
            },
            gradient: {
              start: 'rgb(252,67,111)',
              end: 'rgb(113,187,161)',
              opacity: 0,
              direction: 'right'
            },
            shapes: 'rgb(255,0,98)',
          },
          events: [
            { time: 1, transition: '1200ms', action: 'spin', value: 20 },
            { time: 3, transition: '300ms', action: 'spin', value: 180 },
            { time: 6, transition: '1200ms', action: 'spin', value: 90 },
            { time: 11, transition: '1200ms', action: 'spin', value: -248 },
            { time: 13, transition: '300ms', action: 'spin', value: -80 },
            { time: 16, transition: '1200ms', action: 'spin', value: 34 },
            { time: 21, transition: '1200ms', action: 'spin', value: 317 },
            { time: 23, transition: '300ms', action: 'spin', value: -68 },
            { time: 26, transition: '1200ms', action: 'spin', value: -128 },
          ],
        },
        {
          song: '/static/demo/song2.mp3',
          game: 'gravity',
          text: 'different text',
          textStyle: {
            margin: '75vh 0 50vh 5%',
            textAlign: 'left',
            color: 'rgb(128,133,150)',
          },
          colors: {
            btnsOdd: '#BBD5ED',
            btnsEven: '#CCFFCB',
            bg: {
              color: '#CEFDFF',
              transition: '500ms',
            },
            gradient: {
              start: '#BBD5ED',
              end: 'transparent',
              opacity: 0.5,
              direction: 'right'
            },
            shapes: '#5BD8BD',
          },
          events: [
            { time: 6, transition: '1200ms', action: 'spin', value: 40 },
            { time: 9, transition: '300ms', action: 'spin', value: -20 },
            { time: 15, transition: '1200ms', action: 'spin', value: -60 }
          ],
        }
      ],
    }
  },
  created() {
    for (let i = this.scenes.length - 1; i >= 0; i--) {
      this.scenes[i]._init = {}
      this.scenes[i]._init.events = this.scenes[i].events.slice(0)
      this.scenes[i]._init.bg = Object.assign({}, this.scenes[i].colors.bg)
    }
  }
};
</script>

<style lang="scss">
@import './style/variables';
// reset
*{
  margin:0;
  padding:0;
}
button{ 
  border:none
}

// fonts

@font-face {
  font-family: 'Input';
  src: url('/static/fonts/InputSansCondensed-Regular.ttf')  format('truetype');
  font-weight: normal;
}
@font-face {
  font-family: 'Input';
  src: url('/static/fonts/InputSansCondensed-Medium.ttf')  format('truetype');
  font-weight: bold;
}


// global 

html{
  font-size:12px //rem
}

body{
  font-family: 'Miriam Libre', Source Sans Pro, Helvetica, sans-serif;
  font-weight: normal;
  font-size:16px;
}

// helpers

.background{
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
</style>