<template>
  <div>
    <div>

    </div>
    <ul id="foot_menu">
       <li v-for="menu in this.$parent.menus" v-on:click="changeHeader(menu)">
         {{menu}}
       </li>

     </ul>
  </div>
</template>
<script>
  export default{
    data:function(){
      return {
     //   menus:['我的','现场','音乐','推荐','演出'],

      }
    },
    methods:{
      changeHeader:function(menu){
         // this.menuItem=menu;
          this.$emit('header-change',menu);
      }
    },
//    props:{
//      menuItem:{
//        type:String,
//        require:true
//      }
//    }
  }
</script>
<style>
#foot_menu {
  width: 100%;
  height: 80px;
  line-height: 80px;
  list-style-type: none;
  background-color: gainsboro;
}
#foot_menu  li{
    width: 120px;
    float: left;
    margin-left: 60px;
  }
</style>
