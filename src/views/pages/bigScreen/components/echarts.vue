<template>
  <div class="map-chart">
    <div class="map-chart-count">
      <countTo :startVal='startVal' :endVal='endVal' :duration='duration'></countTo>
      <div class="chart-count-title">全球现有确诊</div>
    </div>
    <div id="myMap" ref="myMap" style="width: 100%;flex:1"></div>
    <div class="a">员工总数</div>
  </div>
</template>
 
<script>
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar"); // 引入柱状图组件
require("echarts/lib/chart/pie"); // 引入饼状图组件
// require("echarts/map/js/china.js"); // 引入中国地图组件
require("echarts/map/js/world.js"); // 引入中国地图组件
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/theme/macarons"); //引入主题
require("echarts/theme/shine"); //引入主题
import option from "./map-option";
import countTo from 'vue-count-to';
export default {
  components: { countTo },
  data() {
    return {
      chart: null,
      // 需要滚动的时间
      duration: 3000,
      // 初始值
      startVal: 600,
      // 最终值
      endVal: 10000
    };
  },
  mounted() {
    this.drawChinaMap();
  },
  updated() {
    if (!this.chart) {
      this.initChart();
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    drawChinaMap() {
      this.chart = this.$echarts.init(
        document.getElementById("myMap"),
        "macarons"
      );
      this.chart.setOption(option);
    },
  },
};
</script>
 
<style scoped lang="scss">
.map-chart{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 20px 0;
  box-sizing: border-box;
  .a{
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff;
  }
  .map-chart-count{
    color: #fff;
    font-size: 70px;
    font-weight: bold;
    width: 100%;
    text-align: center;
    .chart-count-title{
      font-size: 24px;
      font-weight: normal;
      margin-top: 20px;
    }
  }
}
</style>