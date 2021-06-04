<template>
  <el-dialog
    :modal-append-to-body='false'
    :visible.sync="dialogInfo.dialogVisible"
    :before-close="handleClose"
    :width="dialogInfo.width"
    top="25vh">
    <div slot="title" class="dialog-title">
      <div class="dialog-title-name">{{dialogInfo.title}}</div>
      <div class="dialog-title-tip" v-if="dialogInfo.titleTip">{{dialogInfo.titleTip}}</div>
    </div>
    <div class="dialog-content">
      <slot></slot>
    </div>
    <span slot="footer" class="dialog-footer" v-if="dialogInfo.footer == true">
      <el-button @click="dialogInfo.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogChoose">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogInfo:{
      type: Object,
      default: () => {}
    },
  },
  data() {
    return {

    }
  },
  methods:{
    handleClose(){
      this.dialogInfo.dialogVisible = false
    },
    dialogChoose(){
      this.$emit('dialogChoose')
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-title{
  line-height: 20px;
  .dialog-title-name{
    font-size: 18px;
    font-weight: bold;
  }
  .dialog-title-tip{
    font-size: 14px;
    opacity: 0.7;
  }
}
.dialog-content{
  text-align: left;
}
</style>