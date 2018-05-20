<template>
  <div id="music_content">
    <ul id="list_head">
        <li>歌曲({{songList.length}})</li>
        <li>演唱者</li>
        <li>专辑</li>
      </ul>
    <div id="list_item">
      <div v-for="(item,index) in songList">
        <div class="songs" @click="playSong(item.songId,index,item.songName,item.singer,item.backgroundImg,item.album)">
            <div class="checkBox">
              <input type="checkbox"/>
            </div>
            <div class="sort">
              <em>{{index+1}}</em>
            </div>
            <div>
            <ul id="itemMenu">
              <li>
                {{item.songName}}
              </li>
              <li>
                {{item.singer}}
              </li>
              <li>
                {{item.album}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data:function(){
      return{
      }
    },
    created(){
      this.$http.get('/api/api/playlist/detail?id=19723756')
        .then((response)=>{     // 这里是处理正确的回调
          var data=response.data.result.tracks;
          var items=[];
          for(var i=0;i<data.length;i++){
              items.push({"songName":data[i].name,"singer":data[i].artists[0].name,"album":data[i].album.name,"songId":data[i].id,"backgroundImg":data[i].album.blurPicUrl});
            }
            this.$store.commit('updateList',items);
            console.log(items[i])
        })
        .catch((response)=>{             // 这里是处理错误的回调
          console.log(response);
        });
  },
    //http://music.163.com/api/playlist/detail?id=19723756
    //http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=15&offset=0
    methods:{
      //改变当前播放歌曲的Id
      playSong:function (songId,index,songName,singer,backgroundImg,album) {
        if(songId!=this.$store.state.playSongId){
          this.$store.commit('updateSongId',songId);
          this.$store.commit('updateIndex',index);
          this.$store.commit('updateSongName',songName);
          this.$store.commit('updateSinger',singer);
          this.$store.commit('updateImg',backgroundImg);
          this.$store.commit('updateAlbum',album);
        }
      }
    },

    computed:{
      songList(){
        return this.$store.state.songList;
      }
    }

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
