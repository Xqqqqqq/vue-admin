<template>
  <div class="collect">
    <ListTitle :showRefresh="showRefresh" @clickRefresh="clickRefresh"></ListTitle>
    <div class="collect-box">
      <div>mapState的json格式：（{{userDetail.nickname}}:{{userDetail.age}}）</div>
      <div>mapGetters：{{realname}}---{{getMomentMoney}}---{{userInfo.a}}</div>
      <div>使用getter计算值：{{momentMoney}}</div>
      <button @click="addMoney">点击mutations</button>
      <div>{{count}}</div>
      <button @click="changeCount">点击actions</button>
      <button @click="changeMomentMoney">点击actions传值</button>
    </div>
  </div>
</template>
<script>
import ListTitle from 'components/listCommon/listTtitle'
import { mapState, mapGetters } from 'vuex'
// mapState/mapGetters，相当于改变data中的参数
export default {
  name: "storeText",
  components:{
    ListTitle,
  },
  data() {
    return {
      showRefresh: true, //是否显示刷新按钮
    }
  },
  mounted(){
  },
  methods:{
    // 刷新
    clickRefresh(){
    },
    addMoney(){
      // 调用mutations
      this.$store.commit('INDEX_MONEYTOTAL', 10)
    },
    changeCount(){
      // 调用actions
      this.$store.dispatch('addCount')
    },
    changeMomentMoney() {
      this.$store.dispatch('addMomentMoney', 10)
    }
  },
  computed:{
    // realname(){
    //   console.log(this.$store.getters.realname)
    // },
    ...mapState({
      userDetail: state => state.index.userDetail,
      momentMoney: state => state.index.momentMoney,
      count: state => state.index.count,
      userInfo: state => state.login.userInfo,
    }),
    ...mapGetters(['realname', 'getMomentMoney', 'userInfo'])
  },
}
</script>
<style lang="scss" scoped>
.collect-box{
  line-height: 50px;
}
</style>