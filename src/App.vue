<template>
  <div id="app">
    <div class="back" :style="`background-image:url(${this.$store.state.backgroundImg})`"></div>
  <header-head></header-head>
    <middle></middle>
    <footplay></footplay>
    <!--<footer-foot v-on:header-change="updateHeader($event)"></footer-foot>-->
  </div>
</template>

<script>
  import header from './components/header'
  import footer from './components/footer'
  import middle from './components/middle'
  import footplay from './components/foot-play'
export default {
  name: 'App',
  data:function(){
    return {
      menus:['我的','现场','音乐','推荐','演出'],
      title:'我的'
    }
  },
  components:{
    "footer-foot":footer,
    "header-head":header,
    "middle":middle,
    "footplay":footplay
  },
  methods:{
    updateHeader:function(title){
      this.title=title;
    }
  }
}
</script>

<style>

#app {
  width: 100%;
  font-family: "sans-serif";
  font-size: 13pt;

}
  .back{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(20px);
    z-index: -1;

  }

</style>
