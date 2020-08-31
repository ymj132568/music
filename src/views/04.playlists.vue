<template>
  <div class="playlists-container">
   
    <div class="top-card" v-if='listName'>
      <div class="icon-wrap">
 
        <img :src="listCover" alt="" />
      </div>
      <div class="content-wrap">
        <div class="cat">精品歌单</div>
 
        <div class="title">
          {{ listName }}
        </div>
 
        <div class="info">
          {{ listDesc }}
        </div>
      </div>

      <img :src="listCover" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: cat == '全部' }"
          @click="cat = '全部'"
        >
          全部
        </span>
        <span
          class="item"
          :class="{ active: cat == '欧美' }"
          @click="cat = '欧美'"
        >
          欧美
        </span>
        <span
          class="item"
          :class="{ active: cat == '华语' }"
          @click="cat = '华语'"
        >
          华语
        </span>
        <span
          class="item"
          :class="{ active: cat == '流行' }"
          @click="cat = '流行'"
        >
          流行
        </span>
        <span
          class="item"
          :class="{ active: cat == '说唱' }"
          @click="cat = '说唱'"
        >
          说唱
        </span>
        <span
          class="item"
          :class="{ active: cat == '摇滚' }"
          @click="cat = '摇滚'"
        >
          摇滚
        </span>
        <span
          class="item"
          :class="{ active: cat == '民谣' }"
          @click="cat = '民谣'"
        >
          民谣
        </span>
        <span
          class="item"
          :class="{ active: cat == '电子' }"
          @click="cat = '电子'"
        >
          电子
        </span>
        <span
          class="item"
          :class="{ active: cat == '轻音乐' }"
          @click="cat = '轻音乐'"
        >
          轻音乐
        </span>
        <span
          class="item"
          :class="{ active: cat == '影视原声' }"
          @click="cat = '影视原声'"
        >
          影视原声
        </span>
        <span
          class="item"
          :class="{ active: cat == 'ACG' }"
          @click="cat = 'ACG'"
        >
          ACG
        </span>
        <span
          class="item"
          :class="{ active: cat == '怀旧' }"
          @click="cat = '怀旧'"
        >
          怀旧
        </span>
        <span
          class="item"
          :class="{ active: cat == '治愈' }"
          @click="cat = '治愈'"
        >
          治愈
        </span>
        <span
          class="item"
          :class="{ active: cat == '旅行' }"
          @click="cat = '旅行'"
        >
          旅行
        </span>
      </div>
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in playList" :key="index" @click="toPlayList(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount|formatCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    ></el-pagination>
  </div>
</template>

<script>
import { highquality, topList} from '@/api/playlists'
export default {
 name: 'recommend',
    data() {
      return {
   
        total: 0,
     
        listDesc:'',
     
        listCover:'',
   
        listName:'',
 
        cat: '全部',

        page:1,

        playList:[]
      }
    },
    // 侦听器
    watch: {
      cat() {
        this.getData()
      }
    },
    created() {
     this.getData()
    },
    methods: {
      toPlayList(id){
        this.$router.push(`playlist?id=${id}`)
      },
      getData(){
         highquality({cat:this.cat}).then(res=>{
           if(res.playlists.length!=0){
             this.listName = res.playlists[0].name;
          this.listDesc = res.playlists[0].description;
          this.listCover = res.playlists[0].coverImgUrl;
           }else{
             this.listName=''
           }
         });
         topList({cat:this.cat,offest:(this.page-1)*10}).then(res=>{
           this.total=res.total;
           this.playList=res.playlists
         })
      },
      handleCurrentChange(val) {
        this.page = val
        this.getData()
      }
    }
}
</script>

<style lang='scss'>

</style>