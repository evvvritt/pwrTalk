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
            margin: '30vh 0 30vh 25%',
            textAlign: 'center',
            color: 'rgb(113,187,161)',
          },
          colors: {
            btnsOdd: 'rgb(247, 221, 212)',
            btnsEven: 'rgb(255,17,73)',
            bg: 'turquoise', //'rgb(252,67,111)',
            gradient: {
              start: 'rgb(252,67,111)',
              end: 'rgb(113,187,161)',
              opacity: 0.0000001,
              direction: 'right'
            }
          },
          events: [
            { time: 3, color: 'red' },
            { time: 9, color: 'blue' },
            { time: 15, color: 'green' }
          ],
        },
        {
          song: '/static/demo/song2.mp3',
          game: 'something',
          text: 'different text',
          textStyle: {
            margin: '75vh 0 50vh 5%',
            textAlign: 'left',
            color: 'rgb(128,133,150)',
          },
          colors: {
            btnsOdd: '#ddd',
            btnsEven: 'rgb(122, 152, 121)',
            bg: 'transparent',
            gradient: {
              start: 'rgb(128,133,150)',
              end: 'rgb(245,107,150)',
              opacity: 0.65,
              direction: 'right'
            }
          },
          events: [
            { time: 6, color: 'red' },
            { time: 9, color: 'blue' },
            { time: 15, color: 'green' }
          ],
        }
      ],
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


// global 

html{
  font-size:12px //rem
}

body{
  font-family: Source Sans Pro, Helvetica, sans-serif;
  font-weight: 600;
  font-size:18px;
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