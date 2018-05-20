<template>
<div class="left">
  <div class="play_info">
    <div class="play_img">
     <img src="../assets/img/playing.png"/>
    </div>
    <div><router-link to='/' class="history">正在播放</router-link></div>
  </div>
  <div class="play_info">
    <div class="play_img">
      <img src="../assets/img/history.png"/>
    </div>
   <div><router-link to='/playHistory' class="history">播放历史</router-link></div>
  </div>
  <div class="play_info">
    <div class="play_img">
      <img src="../assets/img/collection.png">
    </div>
    <div>我的收藏</div>
  </div>
</div>
</template>
<script>
export default {
  methods:{
    showSongs:function(){

    }
  }
}
</script>
<style>
  .left{
    background-color: white;
    height: 700px;
  }
.play_info{
  width:200px;
  height: 40px;
  line-height: 40px;
}
  .play_img{
    width: 25px;
    height: 25px;
    float: left;
    margin-top: 8px;
    margin-left: 8px;
  }
  .play_img img{
    width: 100%;
    height: 100%;
  }
.play_info :hover{
  height: 40px;
  background-color:gainsboro;
  border-radius: 6px;
}
  .history{
    text-decoration: none;
    color: black;
  }


</style>
