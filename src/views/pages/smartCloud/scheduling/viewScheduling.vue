<template>
  <div class="calendar-box">
    <ListTitle :showRefresh="showRefresh"></ListTitle>
    <el-main>
      <div class="main-box">
        <div class="table-title" style="line-height: 40px;margin-bottom:0px">
          <div class="table-title-left">排班日历</div>
        </div>
        <div class="calendar">
          <div class="calendar-left">
            <el-calendar v-model="valueData">
              <template
                slot="dateCell"
                slot-scope="{date, data}">
                <div @click="clickCalendar(data)" slot="reference"
                :class="isArrange.indexOf(data.day) != -1 ? 'calendar-choose' : ''"
                style="width:100%; height: 100%">
                  <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                  </p>
                  <i v-if="isArrange.indexOf(data.day)>0" class="el-icon-alarm-clock"></i>
                </div>
              </template>
            </el-calendar>
          </div>
          <div class="calendar-right">
            <div class="calendar-right-title">{{nowDate}}</div>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="科室"></el-table-column>
              <el-table-column prop="name" label="医生"></el-table-column>
              <el-table-column prop="address" label="时间"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import ListTitle from 'components/listCommon/listTtitle'
export default {
  components:{
    ListTitle,
  },
  data() {
    return {
      showRefresh: false, //是否显示刷新按钮
      valueData: '', // 所选日期
      nowDate: '', //右侧显示的时间(给后台穿的值)
      tableData: [{
        date: '2021-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },],
      isArrange: [
        "2021-05-08",
        "2021-05-09",
        "2021-05-10",
        "2021-05-11",
        "2021-05-17",
        "2021-05-18",
        "2021-05-31",
      ]
    }
  },
  created(){
    this.$nextTick(() => {
      this.valueData = this.dateFormat('YYYY-mm-dd',new Date())
      this.nowDate = this.valueData
      // 点击上个月
      let prevBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(1)');
      prevBtn.addEventListener('click', () => {
        this.valueData = this.dateFormat('YYYY-mm-dd',this.valueData)
        this.nowDate = this.valueData
        // 调接口
      })
      // 点击今天
      let currBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(2)');
      currBtn.addEventListener('click', () => {
        this.valueData = this.dateFormat('YYYY-mm-dd',this.valueData)
        this.nowDate = this.valueData
        // 调接口
      })
      // 点击下个月
      let nextBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(3)');
      nextBtn.addEventListener('click', () => {
        this.valueData = this.dateFormat('YYYY-mm-dd',this.valueData)
        this.nowDate = this.valueData
        // 调接口
      })
    })
  },
  methods:{
    clickCalendar(e){
      this.nowDate = e.day
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
      };
      return fmt;
    },
  }
}
</script>
<style lang="scss" scoped>
.el-main{
  height: calc(100% - 50px);
}
.calendar-choose{
  background-color: yellowgreen;
  width: 100%;
  height: 100%;
}
.calendar-box{
  width: 100%;
  height: 100%;
  .main-box{
    border: 1px solid #d4d4d4;
    width: 100%;
    .calendar{
      width: 100%;
      display: flex;
      .calendar-left{
        flex: 1;
        .is-selected {
          color: #1989FA;
        }
      }
      .calendar-right{
        width: 300px;
        margin-left: 20px;
        background-color: #F2F8FE;
        padding: 20px;
        box-sizing: border-box;
        .calendar-right-title{
          text-align: left;
          font-weight: bold;
          color: $color-333;
          font-size: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>