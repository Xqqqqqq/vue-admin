<template>
  <div class="screen">
    <div class="screen-top">
      <h1 class="screen-top-left">传染病监控预警平台</h1>
      <ul class="screen-top-right">
        <li :class="['top-right-li', { 'top-right-li-check':currentTab === index}]"
        v-for="(item, index) in tabList" 
        :key="index" @click="tabClick(item.tabName, index)">
          <!-- <img src="" alt=""> -->{{item.name}}
        </li>
      </ul>
    </div>
    <div class="screen-bottom">
      <div class="screen-bottom-left"></div>
      <div class="screen-bottom-content">
        <echartsMap></echartsMap>
      </div>
      <div class="screen-bottom-right"></div>
    </div>
  </div>
</template>
<script>
// import maps from './components/echarts' // 显示英文名称
import echartsMap from './components/echartsMap' // 显示中文名称，带定时器的
export default {
  components: {
    echartsMap
  },
  data() {
    return {
      tabList: [
        {
          id: 1,
          name: "新冠疫情",
        },
        {
          id: 2,
          name: "蚊霉病",
        },
        {
          id: 3,
          name: "疟疾",
        },
        {
          id: 4,
          name: "其他寄生虫病",
        },
      ],
      currentTab: 0
    }
  },
  methods:{
    tabClick(item, index) {
      this.currentTab = index
    }
  }
}
</script>
<style lang="scss" scoped>
.screen{
  width: 100%;
  height: 100%;
  background: url('../../../../static/img/background.png') no-repeat;
  background-size: 100% 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  .screen-top{
    width: 100%;
    background-color: rgba(255,255,255,0.2);
    display: flex;
    line-height: 80px;
    .screen-top-left{
      color: #fff;
      padding-left: 20px;
      box-sizing: border-box;
      font-size: 30px;
    }
    .screen-top-right{
      display: flex;
      margin: auto;
      .top-right-li{
        color: #fff;
        font-size: 24px;
        margin-right: 30px;
        cursor: pointer;
        &-check{
          color: yellow;
          border-bottom: 1px solid yellow;
        }
      }
    }
  }
  .screen-bottom{
    width: 100%;
    flex: 1;
    display: flex;
    .screen-bottom-left{
      width: 200px;
      height: 100%;
      background-color: red;
    }
    .screen-bottom-content{
      flex: 1;
    }
    .screen-bottom-right{
      width: 400px;
      height: 100%;
      background-color: green;
    }
  }
}
</style>