<template>
  <div class="header">
    <div class="header-left">
      <svg-icon icon-class="cat" class="cat"/>电建康后台管理系统
      <div
        class="collapse"
        @click="handleChangeCollapse"
      >
        <i v-show="isCollapse" class="el-icon-s-unfold"></i>
        <i v-show="!isCollapse" class="el-icon-s-fold"></i>
      </div>
    </div>
    <div class="header-right"></div>
  </div>
</template>
<script>
export default {
  data(){
    return {
    }
  },
  computed:{
    isCollapse(){
      return this.$store.state.index.isCollapse
    }
  },
  methods:{
    /**
     * 收起还是展开
     */
    handleChangeCollapse() {
      this.$store.commit("INDEX_COLLAPSE", this.isCollapse)
    },
  }
}
</script>
<style lang="scss" scoped>
.header{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #2d3a4b;
  padding: 0 30px;
  box-sizing: border-box;
  .header-left{
    color: #fff;
    font-size: 20px;
    line-height: 60px;
    display: flex;
    align-items: center;
    .cat{
      font-size: 40px;
      margin-right: 10px;
    }
  }
}
</style>