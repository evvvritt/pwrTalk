<template lang="jade">
  #app 
    player
</template>

<script>
import Player from './components/player/Player'

export default {
  components: {
    Player,
  },
};
</script>

<style lang="scss">
@import './style/variables';
*{
  margin:0;
  padding:0;
}
  
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