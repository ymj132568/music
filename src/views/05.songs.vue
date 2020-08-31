<template>
  <div class="songs-container">
      <div class="tab-bar">
        <span class="item" @click="type=0" :class="{active:type==0}">全部</span>
        <span class="item" @click="type=7" :class="{active:type==7}">华语</span>
        <span class="item" @click="type=96" :class="{active:type==96}">欧美</span>
        <span class="item" @click="type=8" :class="{active:type==8}">日本</span>
        <span class="item" @click="type=16" :class="{active:type==16}">韩国</span>
      </div>
      <table class="el-table playlit-table">
        <thead>
          <th></th>
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData" :key="item.id" class="el-table_row">
            <td>{{index+1}}</td>
            <td>
              <div class="img-wrap" @click="playMusic(item.id)">
                <img :src="item.album.picUrl" alt=""/>
                <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
              </div>
            </td>
            <td>
              <div class="song-wrap">
                <div class="name-wrap">
                  <span>{{item.name}}</span>
                  <span class="iconfont icon-mv" v-if="item.mvid!=0" @click="toMv(item.mvid)"></span>
                </div>
                <span>{{ item.subTitle }}</span>
              </div>
            </td>
            <td>{{item.album.artists[0].name}}</td>
            <td>{{item.album.name}}</td>
            <td>{{item.duration | formatDuration}}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { topSongs } from '@/api/songs';
import { songUrl } from '@/api/discovery';
export default {
  name:'songs',
  data() {
    return {
      tableData:[],
      type:'0'
    }
  },
   watch: {
      type() {
        this.getData()
      }
    },
    created() {
      this.getData()
    },
    methods: {
      toMv(id){
        this.$router.push(`/mv?id=${id}`)
      },
      getData() {
        topSongs({type:this.type}).then(res=>{
          this.tableData=res.data
        })
    },
    playMusic(id){
      songUrl({
        id:id
      }).then(res=>{
        this.$parent.url=res.data[0].url
      })
    }
}
}
</script>

<style lang='scss'>

</style>