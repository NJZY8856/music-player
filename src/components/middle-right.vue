<template>
<div id="midright">
  <div class="headImg">
    <img v-bind:src="this.backgroundImg" v-bind:style="`transform: rotate(${this.deg}deg)`">
  </div>
  <div class="lrcContent">
    <!--{{timeLrc[Math.floor(currTime)]}}-->
    <li v-for="(lrc,index) in timeLrc" v-bind:class="{lineHight:iscurrLyric(index)}">{{lrc}}</li>
    <!--{{Math.floor(this.$store.state.currTime)}}+{{this.$store.state.timeLrc[16]}}-->
  </div>
</div>
</template>
<script>
export default {
  data:function(){
    return {
      lastIndex:0,
    }
 },

  computed:{
    currTime(){  //当前时间
      return Math.floor(this.$store.state.currTime);
    },
    timeLrc(){
    //  console.log(this.$store.state.timeLrc)
      return this.$store.state.timeLrc;
    },
    backgroundImg(){   //当前背景图片
      return this.$store.state.backgroundImg;
    },
    deg(){
      return this.$store.state.deg;
    }
  },

  methods: {
    iscurrLyric: function (index) {
         if (index== this.currTime) {;
           return true;
         }
         else {
           return false;
         }
      }
    },

}
</script>
<style>
  #midright{
    width: 550px;
    height: 700px;
    background-color: white;
    font-size: 12pt;
  }

  .headImg img {
    position: relative;
    width: 150px;
    height: 150px;
    margin-left: 210px;
    border-radius: 150px;
    transform: rotate(45deg);
    background-image: radial-gradient(5em 30em ellipse, #fff, #000);
    border: 2px solid #131313;
    box-shadow: 0 0 0 10px #343935;
    opacity: 0.7;

  }

  .lrcContent{
    margin-left:50px;
    height: 550px;
    overflow: auto;
  }

  .lrcContent li{
    list-style-type: none;
    height: 30px;
  }

  .lineHight{
    color: darkorange;
    font-size: 20px;

  }

  .lrcContent::-webkit-scrollbar {
    display: none;
  }


</style>
