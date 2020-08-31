<template>
  <div>
      <div class="mvs-container">
        <div class="filter-wrap">
          <div class="secitom-wrap">
            <span class="seciton-wrap">地区：</span>
            <ul class="tabs-wrap">
               <li class="tab">
            <span
              class="title"
              :class="{ active: area == '全部' }"
              @click="area = '全部'"
            >
              全部
            </span>
          </li>
              <li class="tab">
                <span
                class="title"
                :class="{active:area=='港台'}"
                @click="area='港台'"
                >
                港台
                </span>
              </li>
              <li class="tab">
            <span
              class="title"
              :class="{ active: area == '欧美' }"
              @click="area = '欧美'"
            >
              欧美
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '日本' }"
              @click="area = '日本'"
            >
              日本
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '韩国' }"
              @click="area = '韩国'"
            >
              韩国
            </span>
          </li>
            </ul>
          </div>
           <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '全部' }"
              @click="type = '全部'"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '官方版' }"
              @click="type = '官方版'"
            >
              官方版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '原声' }"
              @click="type = '原声'"
            >
              原声
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '现场版' }"
              @click="type = '现场版'"
            >
              现场版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '网易出品' }"
              @click="type = '网易出品'"
            >
              网易出品
            </span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '上升最快' }"
              @click="order = '上升最快'"
            >
              上升最快
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最热' }"
              @click="order = '最热'"
            >
              最热
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最新' }"
              @click="order = '最新'"
            >
              最新
            </span>
          </li>
        </ul>
      </div>
        </div>
        <div class="mvs">
          <div class="items">
            <div class="item" v-for="item in mvList" :key="item.id" @click="toMv(item.id)">
              <div class="img-wrap">
                <img :src="item.cover" alt=""/>
                <div class="num-wrap">
                  <div class="iconfont icon-play"></div>
                  <div class="num">{{item.playCount | formatCount}}</div>
                </div>
              </div>
               <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
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
        :page-size="5"
        :limit="limit"
      ></el-pagination>
      </div>
  </div>
</template>

<script>
import { allMvs } from '@/api/mvs';
export default {
  name:'mvs',
  data() {
    return {
      total:0,
      page:1,
      limit:12,
      mvList:[],
      type:'全部',
      area:'全部',
      order:'上升最快'
    }
  },
  created(){
    this.getData()
  },
  watch: {
    area:[
      function(){
        this.page=1
      },
      'getData'
    ],
    type:[
      function(){
        this.page=1
      },
      'getData'
    ],
    order:[
      function(){
        this.page=1
      },
      'getData'
    ],
  },
  
  methods: {
    getData(){
      const{area,type,order}=this;
      allMvs({
        area,type,order,
        offest:(this.page-1)*this.limit
      }).then(res=>{
        this.mvList=res.data;
        if(res.count){
          this.total=res.count
        }
      })
    },
    handleCurrentChange(val){
      this.page=val,
      this.getData()
    },
    toMv(id){
      this.$router.push(`/mv?id=${id}`)
    }
  },
  
}
</script>

<style lang='scss'>

</style>