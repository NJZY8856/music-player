<template>
  <div id="content">
    <middleleft class="left"></middleleft>
    <router-view class="middle"></router-view>
    <middleright class="right"></middleright>
  </div>
</template>
<script>
import middlemuisc from './middle-music'
import middleleft from './middle-left'
import middleright from './middle-right'
export default {
  components:{
    "middlemusic":middlemuisc,
    "middleleft":middleleft,
    "middleright":middleright
  }
}
</script>
<style>
#content {
  width: 100%;
  height: 700px;
}
  /*#midmusic{*/
    /*float: left;*/
  /*}*/
  .left,.middle,.right{
    float: left;
  }
</style>
