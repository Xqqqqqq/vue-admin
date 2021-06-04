<template>
  <div class="container">
    <el-container style="width:100%; height:100%">
      <el-header>
        <Header ref="header"></Header>
      </el-header>
      <el-container style="width:100%; height:calc(100% - 60px)">
        <el-aside :style="{width:'auto'}" class="side-bar">
          <el-scrollbar style="height:100%">
            <MenuBar></MenuBar>
          </el-scrollbar>
        </el-aside>
        <div class="container-main">
          <router-view></router-view>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from './header'
import MenuBar from './menuBar'
export default {
  name: "Main",
  components: {
    Header,
    MenuBar
  },
  data(){
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  height: 60px !important;
}
.el-aside {
  height: 100%;
  background-color: #2d3a4b;
}
.el-main{
  padding: 0;
  width: 100%;
  height: 100%;
}
.side-bar {
  overflow: hidden;
  transition: width 800ms;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .is-horizontal {
    display: none;
  }
}
.container{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
  .container-main{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>