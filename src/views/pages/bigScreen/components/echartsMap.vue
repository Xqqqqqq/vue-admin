<template>
  <div class="map-chart">
    <div class="map-chart-count">
      <countTo :startVal='startVal' :endVal='endVal' :duration='duration'></countTo>
      <div class="chart-count-title">全球现有确诊</div>
    </div>
    <div class='chart' id='chart' style="width: 100%;flex:1"></div>
    <div class="a">员工总数</div>
  </div>
</template>

<script>
import jsons from './world.json'
import countTo from 'vue-count-to';
export default {
  components: { countTo },
  data () {
    return {
      optionsInfo:{
        min:0,
        max: 10000,
      },
      // 需要滚动的时间
      duration: 3000,
      // 初始值
      startVal: 600,
      // 最终值
      endVal: 10000
    }
  },
  mounted () {
    this.getWorld()
  },
  methods: {
    getWorld () {
      var that = this
      // 调接口获取数据
      let namemap = jsons.namemap
      let dataArr = jsons.dataArr
      that.drawChart(namemap, dataArr)
    },
    drawChart (name, data) {
      // 基于准备好的dom，初始化echarts实例
      let chart = this.$echarts.init(document.getElementById('chart'))
      // 监听屏幕变化自动缩放图表
      window.addEventListener('resize', function () {
        chart.resize()
      })
      // 绘制图表
      chart.setOption({
        // 图表主标题
        // title: {
        //   text: '世界地图', // 主标题文本，支持使用 \n 换行
        //   top: 20, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
        //   left: 'center', // 值: 'left', 'center', 'right' 同上
        //   textStyle: { // 文本样式
        //     fontSize: 24,
        //     fontWeight: 600,
        //     color: '#fff'
        //   }
        // },
        // 提示框组件
        tooltip: {
          trigger: 'item', // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
          // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
          // 使用函数模板  传入的数据值 -> value: number | Array
          // formatter: function (val) {
          //   return val.data.name + ': ' + val.data.value
          // }
          formatter: function (params, ticket, callback) {
            return params.seriesName + '<br />' + params.data.name + '：' + params.data.value + '<br />项目二：' + params.data.a
          },
          backgroundColor:"#ff7f50",//提示标签背景颜色
          textStyle:{color:"#fff"} //提示标签字体颜色
        },
        // 视觉映射组件
        visualMap: {
          type: 'piecewise', // continuous 类型为连续型  piecewise 类型为分段型
          show: true, // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
          // 文本样式
          textStyle: {
            fontSize: 14,
            color: '#fff'
          },
          realtime: false, // 拖拽时，是否实时更新
          calculable: true, // 是否显示拖拽用的手柄
          // pieces: [
          //   {gte: 0, lte: 9, label: '1-9人', color: 'blue'}, // (900, 1000]
          //   {gte: 10, lte: 99, label: '10-99人', color: 'green'}, // (500, 900]
          //   {gte: 100, lte: 499, label: '100-499人', color: 'red'}, // (310, 500]
          //   {gte: 500, lte: 999, label: '500-999人', color: 'pink'}, // (200, 300]
          //   {gte: 1000, label: '大于1000人', color: 'orange'} // (10, 200]
          // ],  // 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
          // 定义 在选中范围中 的视觉元素
          inRange: {
            color: ['#9fb5ea', '#e6ac53', '#74e2ca', '#85daef', '#9feaa5', '#5475f5']
          },
          min: this.optionsInfo.min,
          max: this.optionsInfo.max, // 必须设置最大最小值
        },
        series: [
          {
            type: 'map', // 类型
            // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
            name: '新冠疫情展示',
            mapType: 'world', // 地图类型
            // 是否开启鼠标缩放和平移漫游 默认不开启 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
            roam: true,
            // 图形上的文本标签
            label: {
              show: false // 是否显示对应地名
            },
            // 地图区域的多边形 图形样式
            itemStyle: {
              areaColor: '#7B68EE', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
              borderWidth: 0.5, // 描边线宽 为 0 时无描边
              borderColor: '#000', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
              borderType: 'solid' // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
            },
            // 高亮状态下的多边形和标签样式
            emphasis: {
              label: {
                show: true, // 是否显示标签
                color: '#fff' // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
              },
              itemStyle: {
                areaColor: '#FF6347' // 地图区域的颜色
              }
            },
            // 自定义地区的名称映射
            nameMap: name,
            // 地图系列中的数据内容数组 数组项可以为单个数值
            data: data
          }
        ]
      })
      // // 定时显示提示框和高亮效果
      // let index = -1
      // setInterval(function () {
      //   // 隐藏提示框
      //   chart.dispatchAction({
      //     type: 'hideTip',
      //     seriesIndex: 0,
      //     dataIndex: index
      //   })
      //   // 显示提示框
      //   chart.dispatchAction({
      //     type: 'showTip',
      //     seriesIndex: 0,
      //     dataIndex: index + 1
      //   })
      //   // 取消高亮指定的数据图形
      //   chart.dispatchAction({
      //     type: 'downplay',
      //     seriesIndex: 0,
      //     dataIndex: index
      //   })
      //   // 高亮指定的数据图形
      //   chart.dispatchAction({
      //     type: 'highlight',
      //     seriesIndex: 0,
      //     dataIndex: index + 1
      //   })
      //   index++
      //   if (index > data.length - 1) {
      //     index = -1
      //   }
      // }, 2000)
    }
  }
}
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