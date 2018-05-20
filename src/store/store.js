import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

let store=new Vuex.Store({
  // 1. state
  state:{
    songList:"",   //歌曲列表
    playSongId:"557584888",   //当前播放歌曲Id
    playIndex:"",  //当前播放歌曲号数
    playSongName:"" ,  //当前播放歌曲名字
    playSinger:"",    //当前播放歌曲的歌手名
    playLyric:"",     //当前播放歌曲歌词
    playAlbum:"",     //当前歌曲专辑
    timeLrc:"",        //时间处理后的歌词
    notimeLrc:[],     //不含时间的歌词
    formatLrc:"",     //格式处理后的歌词
    currTime:"",      //当前时间
    backgroundImg:"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg", //当前的背景图片
    historySongs:[],  //播放历史
    deg:0,
  },

  // // 2. getters
  getters:{
    // 参数列表state指的是state数据
    getSongList(state){
      return state.songList;
    },
    getSongId(state){
      return state.playSongId;
    },
    getSongIndex(state){
      return state.playIndex;
    },
    getSongNmae(state){
      return state.playSongName;
    },
    getSonger(state){
      return state.playSinger;
    },
    getAlbum(state){
    return state.playAlbum;
  },
    getPlayLyric(state){
      return state.playLyric;
    },
    getnotimeLrc(state){
      return state.notimeLrc;
    }
  },
  // 3. actions
  // 通常跟api接口打交道
  actions: {
    //获取歌词
    getLyrc(commit, state) {
      axios.get("/api/api/song/lyric?os=pc&id=" + this.state.playSongId + "&lv=-1")
        .then((response) => {
          var lyric = response.data.lrc.lyric;
          console.log("action" + "/api/api/song/lyric?os=pc&id=" + this.state.playSongId + "&lv=-1")
          this.commit("updateLyric", lyric)
        }).then(() => {
        //  console.log('lkl' + this.state.playSongId + this.state.playLyric)
        var lyrics = this.state.playLyric.split("\n");
        var lrcObj = {};
        var lrcArry = [];
        for (var i = 0; i < lyrics.length; i++) {
          var lyric = decodeURIComponent(lyrics[i]);
          var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          var timeRegExpArr = lyric.match(timeReg);
          if (!timeRegExpArr)
            continue;
          var clause = lyric.replace(timeReg, '');
          lrcArry.push(clause);
          for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
            var t = timeRegExpArr[k];
            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
              sec = Number(String(t.match(/\:\d*/i)).slice(1));
            var time = min * 60 + sec;
            lrcObj[time] = clause;
          }
        }
        this.commit("updateNotimeLrc", lrcArry);
        lrcArry = [];
        this.state.timeLrc = lrcObj;
        // console.log("timecc"+this.state.timeLrc)
      }).catch((response) => {             // 这里是处理错误的回调
        console.log(response);
      });
    },


    //播放历史
    savePlay(commit, state) {
      let songs = {"songName": this.playSongName, "singer": this.playSinger, "album": this.playAlbum};
      var storage=sessionStorage.setItem(this.playSongId,songs);
     this.state.historySongs.push(storage);

    },
  },
  mutations:{
    // state指的是state的数据
    //更新数据
    updateList(state,items){
      // 4. mutations
      state.songList=items;
    },

    updateSongId(state,songId){
      state.playSongId=songId;
    //  alert("new"+state.playSongId)
    },
    updateIndex(state,index){
      state.playIndex=index;
    },
    updateSongName(state,songName){
      state.playSongName=songName;
    },
    updateSinger(state,singerName){
      state.playSinger=singerName;
    },
    updateLyric(state,lyric){
      state.playLyric=lyric;
    },
    updateNotimeLrc(state,notimeLrc){
      state.notimeLrc=notimeLrc;
    },
    updateImg(state,backgroundImg){
      state.backgroundImg=backgroundImg;
    },
    updateHistory(state,Song){
      state.historySongs=song;
    },
    updateAlbum(state,album){
      state.playAlbum=album;
    },
    updateDeg(state,deg){
      state.deg=deg;
    }
  }
});
export default store;
