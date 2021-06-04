<template>
  <div class="collect">
    <ListTitle :showRefresh="showRefresh" @clickRefresh="clickRefresh"></ListTitle>
     <el-main>
      <ListSearch :formLabel="formLabel" :submitForm="submitForm" @onSubmit="onSubmit"></ListSearch>
      <div class="table-title">
        <div class="table-title-left">数据列表</div>
        <div class="table-title-right">
          <el-button @click="goUpstairs">提交上级</el-button>
          <el-button @click="batchSubmit">批量提交上级</el-button>
          <el-button>查看详情</el-button>
        </div>
      </div>
      <ListTable :config="config" :tableData="tableData" :tableLabel="tableLabel" height="auto"
      @handleSelectionChange="handleSelectionChange"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"></ListTable>
    </el-main>
    <ListDialog :dialogInfo="dialogInfo" @dialogChoose="dialogChoose">
      <div v-if="dialogType == 1" class="dialog-text">确定要提交员工编号为<span>21QW11</span>姓名为<span>张伟</span>的疫情上报数据吗？</div>
      <div v-if="dialogType == 2" class="dialog-text">确定要提交<span>10</span>条疫情上报数据吗？</div>
    </ListDialog>
  </div>
</template>
<script>
import ListTitle from 'components/listCommon/listTtitle'
import ListSearch from 'components/listCommon/listSearch'
import ListTable from 'components/listCommon/listTable'
import ListDialog from 'components/listCommon/listDialog'
export default {
  name: "dataCollection",
  components:{
    ListTitle,
    ListSearch,
    ListTable,
    ListDialog,
  },
  data() {
    return {
      showRefresh: true, //是否显示刷新按钮
      formLabel:[{
        label: '职工编号',
        model: 'a',
        status: 'input',
        type: 'text'
      },{
        label: '姓名',
        model: 'b',
        status: 'input',
        type: 'text'
      },{
        label: '我的提交状态',
        model: 'e',
        status: 'select',
        options:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
        }]
      },{
        label: '上传时间',
        model: 'c',
        status: 'dataPicker',
        type:'date'
      },{
        label: '下级提交时间',
        model: 'd',
        status: 'dataPicker',
        type:'date'
      },{
        label: '我的提交时间',
        model: 'f',
        status: 'dataPicker',
        type:'date'
      }],
      submitForm:{
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: ''
      }, // 筛选查询
      config:{
        loading: false,
        operation: false,
        total: 100,
        page: 1,
        size: 10
      },
      tableLabel:[{
        label:'职工编号',
        prop: 'date'
      },{
        label:'姓名',
        prop: 'name'
      },{
        label:'身份证号',
        prop: 'province',
        width: '200'
      },{
        label:'今日体温',
        prop: 'city',
      },{
        label:'近14天是否接触过确诊和疑似病例',
        prop: 'tag',
        width: '200'
      },{
        label:'当前身体是否有异常情况',
        prop: 'address',
      },{
        label:'14天内是否曾经居住过到过高风险、中风险地区',
        prop: 'zip',
        width: '200'
      },{
        label:'上传时间',
        prop: 'zip'
      },{
        label:'下级提交人员',
        prop: 'zip'
      },{
        label:'下级提交时间',
        prop: 'zip'
      },{
        label:'下级备注',
        prop: 'zip'
      },{
        label:'我的提交状态',
        prop: 'zip'
      },{
        label:'我的提交时间',
        prop: 'zip'
      }],
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
      dialogInfo:{
        title: '提交上级确认',
        dialogVisible: false,
        width: '30%',
        footer: true
      },
      dialogType: 1, // 1:提交上级  2:批量提交
    }
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
    // 点击弹窗确定按钮
    dialogChoose(){
      this.dialogInfo.dialogVisible = false
    },
    // 提交上级
    goUpstairs(){
      this.dialogType = 1
      this.dialogInfo.dialogVisible = true
    },
    // 批量提交
    batchSubmit(){
      this.dialogType = 2
      this.dialogInfo.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.collect{
  width: 100%;
  height: 100%;
  .dialog-text{
    font-size: 14px;
    color: $color-666;
    span{
      color: $border-left;
    }
  }
}
</style>