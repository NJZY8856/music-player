<template>
  <div id="head">
    <span>音乐盒子</span>
    <input type="text" class="searchText"/>
    <img id="search" src="../assets/img/search.png"/>
    <img id="list" src="../assets/img/list_shou.png"/>

  </div>
</template>
<script>
  export default{
    data:function(){
      return{
        showSearchText:false
      }
    },
    methods:{
      serchSong:function () {

      }
    }


  }
</script>
<style>
#head {
  width: 100%;
  height:90px;
}
  #head span{
   position:absolute;
    top: 30px;
    left:10%;
    font-size: 20px;

  }
 .searchText{
    width:200px;
    height: 30px;
    position:absolute;
    left: 68%;
    top:20px;
   border-radius: 6px;
  }
  #search {
    position: absolute;
    width: 40px;
    top:20px;
    left: 83%;
  }
  #list{
    position: absolute;
    width: 40px;
    top:20px;
    left: 90%;
  }
</style>
