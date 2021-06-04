<template>
  <div class="title">
    <div class="title-left">
      <div class="title-left-line"></div>
      {{listTitle}}
    </div>
    <el-button v-if="showRefresh" type="info" icon="el-icon-refresh" @click="clickRefresh">刷新</el-button>
    <el-button v-else type="info" @click="returnBack">
      返回上一级<i class="el-icon-d-arrow-right"></i>
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    showRefresh: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      listTitle:''
    }
  },
  mounted(){
    this.listTitle = this.$route.meta.title
  },
  methods:{
    clickRefresh(){
      this.$emit('clickRefresh')
    },
    returnBack(){
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $list-title;
  padding: 5px 20px;
  box-sizing: border-box;
  .title-left{
    padding-left: 15px;
    box-sizing: border-box;
    color: $color-999;
    font-size: 16px;
    position: relative;
    .title-left-line{
      width: 5px;
      height: 20px;
      background-color: $border-left;
      position: absolute;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 40px;
    }
  }
}
</style>