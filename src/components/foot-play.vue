<template>
<div id="player">
<div id="play_bar">
  <img src="../assets/img/pre.png" @click="preSong"/>
  <img src="../assets/img/play.png" @click="audioState" v-if="!isplay"/>
  <img src="../assets/img/pause.png" @click="audioState" v-if="isplay"/>
  <img src="../assets/img/next.png" @click="nextSong"/>
</div>
  <span id="songTitle">{{this.$store.state.playSongName}} - {{this.$store.state.playSinger}}</span>
  <span id="played">{{playedTime}}</span>
  <div class="progress" ref="totalbar" @click="playMusic" >
    <div class="progress-bar" ref="playedbar">
      <span class="contorl" draggable="true"></span>
    </div>
  </div>
  <span id="total">{{totalTime}}</span>
  <div id="voice">
    <div @click="staticVoice" id="voiceImg">
      <img src="../assets/img/voice.png" v-if="isstatic"/>
      <img src="../assets/img/staticvoice.png" v-if="!isstatic"/>
    </div>
    <div id="totalVoiceBar" ref="voicebar" @click="clickVoice">
      <div id="voiceBar" ref="currVoice"></div>
    </div>
</div>
  <audio ref="playSongs" autoplay>
    <source v-bind:src="currSrc" type="audio/mpeg"/>
  </audio>
</div>
</template>
<script>
  export default {
    data: function () {
      return {
        src: "",
        currSongId: "",  //当前播放歌曲的Id
        playedTime: '00:00',//已播放时间
        totalTime: '00:00',//总播放时间
        isplay: false,   //播放暂停按钮
        isstatic: true,  //是否静音
        lyric: "",
      }
    },
    beforeUpdate() {   //在audio标签的src改变之后用load（）重新加载资源，达到切换歌曲的目的
      if (this.$store.state.playSongId != this.currSongId) {
        this.currSongId = this.$store.state.playSongId;
        this.$refs.playSongs.load();
        this.$store.dispatch('getLyrc');
        this.$store.dispatch('savePlay');
        //sessionStorage.setItem(songId,this.currSongId)
      }
    },
    computed: {
      currSrc: function () {
        this.src = "http://music.163.com/song/media/outer/url?id=" + this.$store.state.playSongId + ".mp3";
        return this.src
      },
    },
    mounted() {
      const music = this.$refs.playSongs;  //音频所在对象
      const musicbar = this.$refs.playedbar;  //已播放进度条所在对象
      const musictotalbar = this.$refs.totalbar; //总进度条
      const voice = this.$refs.voicebar;  //音量所在的对象
      this.$store.dispatch('getLyrc');
    //  this.lyric=this.printLrc();

      // 获得音频加载完成可播放时的处理
      music.addEventListener('canplay', () => {
        const musicTime = music.duration // 获得音频时长
        const branch = Math.floor(musicTime / 60) // 计算音频分钟
        const second = Math.ceil(musicTime % 60) // 计算音频秒
        if (branch < 10 && second < 10) { // 四种情况判断音频总时间
          this.totalTime = `0${branch}:0${second}`
        } else if (branch < 10) {
          this.totalTime = `0${branch}:${second}`
        } else if (second < 10) {
          this.totalTime = `${branch}:0${second}`
        } else {
          this.totalTime = `${branch}:${second}`
        }
      });

      // 获得音频正在播放时的处理

      music.addEventListener('timeupdate', () => {
        var currTime = 0;
        //  console.log(music.currentTime)
        const musicTime = music.duration // 获得音频时长
        const perpxTime = 1200 / musicTime // 计算总长度占据时长的比例
        const stopTime = music.currentTime // 获得已播放的音频时长
        musicbar.style.width = `${stopTime * perpxTime}px` // 计算进度条所在比例宽度
        const branch = Math.floor(stopTime / 60) // 计算已播放的音频分钟
        const second = Math.floor(stopTime % 60) // 计算已播放的音频秒
        if (branch < 10 && second < 10) { // 四种情况判断显示音频以播放时间
          currTime = `0${branch}:0${second}`
        } else if (branch < 10) {
          currTime = `0${branch}:${second}`
        } else if (second < 10) {
          currTime = `${branch}:0${second}`
        } else {
          currTime = `${branch}:${second}`
        }
        this.playedTime = currTime;
        let obj =this.$store.state.timeLrc[Math.floor(music.currentTime)];
        this.$store.state.currTime=music.currentTime;
        this.$store.state.formatLrc= obj;
        console.log(obj);

        var deg=(this.$store.state.deg+45)%360;  //唱片旋转长度
      //  alert(deg)
        this.$store.commit('updateDeg',deg);


      });

      //当前歌曲播放完时自动播放下一首
      music.addEventListener('ended', () => {
        this.nextSong();
      })

      //触发拖动进度条事件
      musicbar.addEventListener('drag', (e) => {
        this.playMusic(e);
      });

      musicbar.addEventListener('dragend', (e) => {
        this.playMusic(e);
      });

      //触发拖动音量条事件
      voice.addEventListener('drag', (e) => {
        this.playMusic(e);
      });

      voice.addEventListener('dragend', (e) => {
        this.playMusic(e);
      });


    },
    methods: {
      // 点击进度条事件
      playMusic(e) {
        const music = this.$refs.playSongs // 音频所在对象
        const barWidth = e.offsetX // 计算点击位置相对父元素总宽的比例
        this.$refs.playedbar.style.width = `${barWidth}px` // 进度条应所在的比例总宽
        music.currentTime = (music.duration / 1200) * barWidth // 计算点击时应播放所在的时间
        music.play() // 播放音频
        this.isplay = true // 更改播放暂停按钮为播放
      },

      // 点击播放暂停按钮时间
      audioState() {
        this.isplay = !this.isplay // 更改播放暂停按钮状态
        const music = this.$refs.playSongs// 音频所在对象
        if (this.isplay) {
          music.play() // 播放音乐
        } else {
          music.pause() // 暂停音乐
        }
      },

      preSong() {
        const song = this.$store.state;
        this.$store.commit('updateSongId', song.songList[((song.playIndex - 1) % 100 + 100) % 100].songId);
        this.$store.commit('updateSongName', song.songList[((song.playIndex - 1) % 100 + 100) % 100].songName);
        this.$store.commit('updateSinger', song.songList[((song.playIndex - 1) % 100 + 100) % 100].singer);
        this.$store.commit('updateImg', song.songList[((song.playIndex - 1) % 100 + 100) % 100].backgroundImg);
        this.$store.commit('updateIndex', ((song.playIndex - 1) % 100 + 100) % 100);
      },
      nextSong() {
        const song = this.$store.state;
        this.$store.commit('updateSongId', song.songList[(song.playIndex + 1) % 100].songId);
        this.$store.commit('updateSongName', song.songList[(song.playIndex + 1) % 100].songName);
        this.$store.commit('updateSinger', song.songList[(song.playIndex + 1) % 100].singer);
        this.$store.commit('updateImg', song.songList[(song.playIndex + 1) % 100].backgroundImg);
        this.$store.commit('updateIndex', (song.playIndex + 1) % 100);
      },

      clickVoice(e) {
        const voice = this.$refs.voicebar;// 音量所在对象
        const music = this.$refs.playSongs; //音频所在对象
        const barWidth = e.offsetX; // 计算点击位置相对父元素总宽的比例
        this.$refs.currVoice.style.width = `${barWidth}px`; // 进度条应所在的总宽
        music.volume = (1 / 150) * barWidth; // 计算点击时应播放的音量
      },

      //点击声量图标触发事件
      staticVoice() {
        //alert("kk")
        const music = this.$refs.playSongs; //音频所在对象
        if (this.isstatic == true) {
          music.volume = 0;
          this.isstatic = false;
        }
        else {
          music.volume = (1 / 150) * this.$refs.currVoice.offsetWidth; ///音量变回原来的音量
          this.isstatic = true;
        }
      },


    }
  }
</script>
<style>
#player{
  position: absolute;
  width: 100%;
  height: 100px;
  background-image: url("http://p1.music.126.net/aavuUhd_pcdPMYCsTtX9uQ==/109951163001207622.jpg");
}

  #play_bar img{
    width: 25px;
    margin-left: 25px;
    margin-top: 30px;
  }

.progress {
  display: flex;
  justify-content: space-between;
  height:5px;
  width: 1200px;
  margin-left: 250px;
  margin-top: -30px;
  border-radius: 3px;
  border: 1px solid gray;

}

.progress-bar {
  width: 0px;
  height: 5px;
  background-color: white;
  border-radius: 3px;
  cursor: pointer;
}

#songTitle{
  position: absolute;
  color: white;
  margin-top: -40px;
  margin-left: 200px;
  display: block;
}

#played{
  color: white;
  margin-left: 200px;
}

#total{
  color: white;
  margin-left: 1460px;
}

#voice{
  margin-left: 1600px;
  margin-top: -25px;
}

  #voice img,#voiceImg {
    width: 25px;
  }

  #totalVoiceBar{
    width: 150px;
    height: 5px;
    border: 1px solid gray;
    border-radius: 3px;
    margin-left: 50px;
    margin-top: -20px;
  }

  #voiceBar {
    width: 150px;
    height: 5px;
    border-radius: 3px;
    background-color: white;
  }

</style>
