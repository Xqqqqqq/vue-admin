<template>
  <div class="collect">
    <ListTitle :showRefresh="showRefresh" @clickRefresh="clickRefresh"></ListTitle>
    <el-main>
      <ListSearch :formLabel="formLabel" :submitForm="submitForm" @onSubmit="onSubmit"></ListSearch>
      <div class="table-title">
        <div class="table-title-left">数据列表</div>
        <div class="table-title-right">
          <el-button @click="gotoBigScreen">前往数据大屏</el-button>
        </div>
      </div>
      <ListTable :config="config" :tableData="tableData" :tableLabel="tableLabel"
      @handleSelectionChange="handleSelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"></ListTable>
    </el-main>
  </div>
</template>
<script>
import ListTitle from 'components/listCommon/listTtitle'
import ListSearch from 'components/listCommon/listSearch'
import ListTable from 'components/listCommon/listTable'
export default {
  name: "dataCollection",
  components:{
    ListTitle,
    ListSearch,
    ListTable
  },
  data() {
    return {
      showRefresh: true, //是否显示刷新按钮
      formLabel:[{
        label: '数据类型',
        model: 'a',
        status: 'input',
        type: 'text'
      },{
        label: '数据字段',
        model: 'b',
        status: 'input',
        type: 'text'
      },
      {
        label: '更新时间',
        model: 'd',
        status: 'dataPicker',
        type:'datetimerange'
      }],
      submitForm:{
        a: '',
        b: '',
        c: '',
        d: '',
      }, // 筛选查询
      config:{
        loading: false,
        operation: false,
        total: 100,
        page: 1,
        size: 10
      },
      tableLabel:[{
        label:'数据类型',
        prop: 'date'
      },{
        label:'数据字段',
        prop: 'name'
      },{
        label:'更新时间',
        prop: 'province'
      },{
        label:'更新数据',
        prop: 'city'
      },{
        label:'上次数据',
        prop: 'tag',
      },{
        label:'上次更新时间',
        prop: 'address',
        // width: '180',
      },{
        label:'更新时间间隔',
        prop: 'zip'
      },],
      multipleSelection: [], //多选选择的数据结合
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司'
      }], // 表格信息
    }
  },
  mounted(){
  },
  methods:{
    // 刷新
    clickRefresh(){
    
    },
    // 点击查询结果
    onSubmit(){
      console.log('111',this.submitForm)
    },
    // 点击表格多选
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    // 修改每页查询多少条
    handleSizeChange(val){
      this.config.size = val
    },
    // 修改当前页
    handleCurrentChange(val){
      this.config.page = val
    },
    gotoBigScreen(){
      this.$router.push('/bigScreen')
    }
  }
}
</script>
<style lang="scss" scoped>
.collect{
  width: 100%;
}
</style>