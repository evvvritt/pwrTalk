<template lang="pug">
  #app 
    router-view(:scenes="scenes")
</template>

<script>
import Demo from '@/demo/DemoContent'
import Player from '@/components/Player'

export default {
  name: 'App',
  components: {
    Player
  },
  data () {
    return {
      scenes: Demo.scenes
    }
  }
}
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