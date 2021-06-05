import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/pages/login/login.vue'
import Main from '@/views/layout/main.vue'
import BigScreen from '@/views/pages/bigScreen/bigScreen.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: "login",
    component: Login,
    meta: {
      title: "登录",
      requiresAuth: false
    }
  },
  {
    path: '/bigScreen',
    name: "bigScreen",
    component: BigScreen,
    meta: {
      title: "大屏展示",
      requiresAuth: true
    }
  },
  {
    path: '/main',
    component: Main,
    name: 'main',
    meta: {
      requiresAuth: true,
      name: '首页'
    },
    children:[
      {
        path: "/storeText",
        name: "storeText",
        component: () =>import ("../views/pages/storeText.vue"),
        meta: {
          title: "store使用样例",
          requiresAuth: true,
        }
      },
      {
        path: "/cascaderText",
        name: "cascaderText",
        component: () =>import ("../views/pages/cascaderText.vue"),
        meta: {
          title: "cascader使用样例",
          requiresAuth: true,
        }
      },
      {
        path: "/dataCollection",
        name: "dataCollection",
        component: () =>import ("../views/pages/infectiousDiseases/dataCollection.vue"),
        meta: {
          title: "疫情数据列表",
          requiresAuth: true,
        }
      },
      {
        path: "/reportManagement",
        name: "reportManagement",
        component: () =>import ("../views/pages/infectiousDiseases/reportManagement.vue"),
        meta: {
          title: "疫情上报管理",
          requiresAuth: true,
        }
      },
      {
        path: "/leavingMessage",
        name: "leavingMessage",
        component: () =>import ("../views/pages/smartCloud/order/leavingMessage.vue"),
        meta: {
          title: "接诊留言回复",
          requiresAuth: true,
        }
      },
      {
        path: "/videoConnection",
        name: "videoConnection",
        component: () =>import ("../views/pages/smartCloud/order/videoConnection.vue"),
        meta: {
          title: "接诊视频连线",
          requiresAuth: true,
        }
      },
      {
        path: "/viewScheduling",
        name: "viewScheduling",
        component: () =>import ("../views/pages/smartCloud/scheduling/viewScheduling.vue"),
        meta: {
          title: "查看排班整体情况",
          requiresAuth: true,
        }
      },
    ],
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // 跳转路由，重新设置屏幕滚动
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  routes
})

// 登录验证
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  if (to.meta.author) {
    if (token) {
      next();
    } else {
      if (to.path == "/login") {
        next();
      } else {
        next("./login");
      }
    }
  } else {
    next();
  }
});

export default router;
