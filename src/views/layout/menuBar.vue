<template>
  <div class="menu">
    <el-menu
      :default-active="$route.path"
      router
      :collapse="isCollapse"
      class="left-menu"
      background-color="#2d3a4b"
      text-color="#fff"
      active-text-color="#fff"
    >
      <template v-for="(item,index) in menuList">
        <el-menu-item v-if="!item.childlist" :key="index" :index="item.route_path">
          <i :class="['iconfont',item.icon]"></i>
          <span slot="title">{{item.menu_name}}</span>
        </el-menu-item>
        <el-submenu v-else :key="item.menu_id" :index="item.menu_id">
          <template slot="title">
            <i :class="['iconfont',item.icon]"></i>
            <span>{{item.menu_name}}</span>
          </template>
          <template v-for="second in item.childlist">
            <el-menu-item
              v-if="!second.childlist"
              :key="second.menu_id"
              :index="second.route_path"
            >{{second.menu_name}}</el-menu-item>
            <el-submenu v-else :key="second.menu_id" :index="second.route_path">
              <template slot="title">{{second.menu_name}}</template>
              <el-menu-item
                :index="third.route_path"
                v-for="third in second"
                :key="third.menu_id"
              >{{third.menu_name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data(){
    return {
      menuList:[{
        menu_name: '传染病监控预警平台',
        route_path: '',
        icon: 'el-icon-alarm-clock',
        menu_id:'1',
        childlist:[{
          menu_name: '疫情数据搜集',
          route_path: '/dataCollection',
        },{
          menu_name: '疫情上报管理',
          route_path: '/reportManagement',
        },{
          menu_name: 'store使用样例',
          route_path: '/storeText',
        },
      ]},{
        menu_name: '智能云问诊平台',
        route_path: '',
        icon: 'el-icon-heavy-rain',
        menu_id:'2',
        childlist:[{
          menu_name: 'cascader使用样例',
          route_path: '/cascaderText',
        },{
          menu_name: '会诊信息管理',
          route_path: '/main',
        },{
          menu_name: '医生排班管理',
          route_path: '/main',
        },]
      },{
        menu_name: '卫生健康知识库',
        route_path: '/main',
        icon: 'el-icon-potato-strips',
        menu_id:'3',
        childlist:[{
          menu_name: '知识库管理',
          route_path: '/main',
        },{
          menu_name: '知识推送管理',
          route_path: '/main',
        }]
      },{
        menu_name: '培训管理平台',
        route_path: '/main',
        icon: 'el-icon-dish',
        menu_id:'4',
        childlist:[{
          menu_name: '培训情况查看',
          route_path: '/main',
        },{
          menu_name: '学习资料管理',
          route_path: '/main',
        }]
      },{
        menu_name: '综合管理平台',
        route_path: '/main',
        icon: 'el-icon-basketball',
        menu_id:'5',
        childlist:[{
          menu_name: '职工基本信息管理',
          route_path: '/main',
        },{
          menu_name: '职工健康信息管理',
          route_path: '/main',
        },]
      }]
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.index.isCollapse;
    }
  },
  methods:{
  }
}
</script>
<style lang="scss" scoped>
.menu{
  width: 100%;
  height: 100%;
  .left-menu{
    width: 220px;
  }
  .el-menu--collapse {
    width: 64px;
  }
}
</style>