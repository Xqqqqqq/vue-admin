<template>
  <div class="search">
    <el-form :inline="inline" :model="submitForm" :rules="rules" label-position="right" label-width="100px">
      <div class="table-title">
        <div class="table-title-left">筛选查询</div>
        <div class="table-title-right">
          <el-button type="primary" @click="onSubmit">查询结果</el-button>
        </div>
      </div>
      <!-- 循环标签 -->
      <div class="form-box">
        <el-form-item v-for="(item, index) in formLabel" :key="index" :label="item.label" :prop="item.prop ? item.prop : ''">
          <el-input v-model="submitForm[item.model]" :type="item.type" :placeholder="'请输入' + item.label" v-if="item.status=='input'"></el-input>
          <el-select v-model="submitForm[item.model]" placeholder="请选择" v-if="item.status == 'select'">
            <!--如果是select或者checkbox 、Radio就还需要选项信息-->
            <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-date-picker v-model="submitForm[item.model]" :type="item.type" placeholder="选择日期" v-if="item.status=='dataPicker' && item.type == 'date'"></el-date-picker>
          <el-date-picker v-model="submitForm[item.model]" :type="item.type" 
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-if="item.status=='dataPicker' && item.type == 'datetimerange'" format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props:{
    inline: {
      type: Boolean,
      default: true
    }, // 是否是横向行内表单域
    submitForm: {
      type: Object,
      default: () => {}
    }, //表单数据
    formLabel:{
      type: Array,
      default: []
    }, // 标签数据
    rules:{
      type: Object,
      default: () => {}
    }
  },
  data(){
    return {
    }
  },
  methods:{
    onSubmit() {
      this.$emit('onSubmit', this.submitForm)
    },
  }
}
</script>
<style lang="scss" scoped>
.search{
  width: 100%;
  border: thin solid #d4d4d4;
  box-sizing: border-box;
  margin-bottom: 20px;
  .form-box{
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>