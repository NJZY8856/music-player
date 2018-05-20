<template>
  <div id="music_content">
    <ul id="list_head">
      <li>歌曲({{historySong.length}})</li>
      <li>演唱者</li>
      <li>专辑</li>
    </ul>
    <div id="list_item">
      <div v-for="(item,index) in historySong">
        <div class="songs">
          <div class="checkBox">
            <input type="checkbox"/>
          </div>
          <div class="sort">
            <em>{{index+1}}</em>
          </div>
          <div>
            <ul id="itemMenu">
              <li>
                ssss
              </li>
              <li>
               ssdd
              </li>
              <li>
               gggg
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data:function(){
      return {
        historySong:this.$store.state.historySongs,
      }
    },
  }
</script>
<style>
  #music_content{
    width: 60%;
    border:1px solid gainsboro;
    margin:0 auto;
    height:700px;
    background-color: white;
  }

  .checkBox {
    width: 15px;
    height: 41px;
    padding: 12px 0;
    padding-left: 10px;
    padding-right: 5px;
    line-height: 0;
    /*background-color: #fd9500;*/
  }

  .sort{
    width: 36px;
    height: 41px;
    margin-left: 30px;
    margin-top: -60px;
    text-align: center;
  }

  #list_head {
    list-style-type: none;
    width: 96%;
    height: 41px;
    line-height: 40px;
    border-bottom: 1px solid gainsboro;
  }

  /*#list_item{*/
  /*list-style-type: none;*/
  /*width: 100%;*/
  /*height: 50px;*/
  /*}*/

  #list_head li,#itemMenu li{
    float: left;
    width: 28%;
    padding-right: .2%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-left: 30px;
  }

  #itemMenu li{
    height: 41px;
    line-height: 41px;
  }


  #itemMenu,#list_item{
    list-style-type: none;
  }

  #list_item{
    height: 640px;
    overflow: scroll;
    margin-top: -16px;
  }

  #itemMenu{
    margin-top: -50px;
    height: 41px;
    /*line-height: 45px;*/
  }
  .songs{
    border: 1px solid #EBEBEB;
    height: 41px;
    line-height: 35px;
    color: #333;

  }
  .songs :hover{
    background-color: gainsboro;
    border-radius: 6px;
  }
</style>
