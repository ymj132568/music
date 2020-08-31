<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home" @click="$router.replace('/')"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift" @click="$router.go(-1)"></span>
        <span class="iconfont icon-arrow-right" @click="$router.go(1)"></span>
      </div>
    </div>
    <div class="right-box">
     <el-input size="small" placeholder="请搜索" @keyup.enter.native='toResult' v-model.trim="query">
       <i slot="prefix" class="el-input__icon el-icon-search"></i>
     </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data() {
      return {
        query: ''
      }
    },
    methods: {
      toResult() {
        if (!this.query) {
          this.$message.warning('请输入内容')
        }else{
          this.$router.push(`/result?keywords=${this.query}`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped></style>
