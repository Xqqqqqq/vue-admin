<template>
  <div class="collect">
    <ListTitle
      :showRefresh="showRefresh"
      @clickRefresh="clickRefresh"
    ></ListTitle>
    <el-form ref="form" :model="form" label-width="80px">
       <div class="block">
          <span class="demonstration">选择门牌号</span>
          <el-cascader
            placeholder="试试搜索：2-11"
            v-model="form.houseId"
            :options="cascaderList"
            filterable  @change="handleChange"
            :props="{ value: 'value', label: 'label', checkStrictly: true}"></el-cascader>
        </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// https://blog.csdn.net/yummry/article/details/95612601 链接
import ListTitle from "components/listCommon/listTtitle";
import { regroupCascaderData } from './formData';
export default {
  name: "storeText",
  components: {
    ListTitle,
  },
  data() {
    return {
      showRefresh: true, //是否显示刷新按钮
      form: {
        houseId: '67e63d89c4e611ebb1390242ac110002',
      },
      cascaderList: [
        {
          value: "87ec0495c4e411ebb1390242ac110002",
          label: "沈阳好旺角小区",
          children: [
            { value: "67e63d89c4e611ebb1390242ac110002", label: "233" },
          ],
        },
        {
          value: "1",
          label: "dfs",
          children: [
            { value: "2", label: "sadfsda" },
            { value: "9ac5c65ab91711ebb1390242ac110002", label: "asfdsdf" },
            { value: "9adf1a52b91711ebb1390242ac110002", label: "sadfdfsaads" },
            { value: "1", label: "1号楼2-2-2" },
          ],
        },
      ],
    };
  },
  mounted() {
    const arr = regroupCascaderData(
      '67e63d89c4e611ebb1390242ac110002',
      this.cascaderList
    )
    console.log(arr)
  },
  methods: {
    onSubmit(){
      console.log(this.form)
    },
    handleChange(value) {
      this.form.houseId = value[value.length-1]
    },
    // 刷新
    clickRefresh() {},
  },
};
</script>
<style lang="scss" scoped>
</style>