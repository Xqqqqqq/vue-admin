<template>
  <div class="table">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" 
    stripe v-loading="config.loading"
    @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="showSelect"></el-table-column>
      <el-table-column show-overflow-tooltip v-for="(item,index) in tableLabel" :key="index" :label="item.label" :width="item.width ? item.width : ''">
        <!--其实可以在上面:prop="item.prop"就可以显示表单数据 这里设置插槽的方式话更加灵活 我们可以写样式-->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column label="操作" min-width="180" v-if="config.operation == true">
        <template slot-scope="scope">
          <el-button size="min" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="min" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="config.total" :current-page.sync="config.page" :page-size="config.size"
    class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    showSelect:{
      type: Boolean,
      default: true
    },// 是否显示多选图片
    tableData:{
      type: Array,
      default: () => {}
    },// 表格数据
    tableLabel: {
      type: Array,
      default: () => {}
    }, // 表头
    config:{
      type: Object,
      default: () => {}
    },
  },
  data() {
    return{
    }
  },
  methods:{
    // 选择table数据
    handleSelectionChange(val){
      this.$emit('handleSelectionChange', val)
    },
    handleSizeChange(val){
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val){
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.table{
  width: 100%;
  .pagination{
    float: right;
    margin-top: 30px;
  }
}
</style>