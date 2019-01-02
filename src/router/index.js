import Vue from 'vue'
import Router from 'vue-router'
import Base from '../views/v-base'
import Home from '../views/v-home'
import store from '../store';

Vue.use(Router)

const handleParent = (list, parent) => {
  for (let i of list) {
    i.key = generateKey()
    if (parent) {
      i.parent = parent;
    }
    if (i.children) {
      handleParent(i.children, i);
    }
  }
}

let KEY_COUNT = 1;
export const generateKey = () => {
  return '_API_MOCK_VUE_' + KEY_COUNT++;
}

export const homeRoute = {
  path: '/',
  name: 'home',
  label: '首页',
  icon: 'md-home',
  component: Home,
  closable: false
}

export const routes = [homeRoute, {
  path: '/project',
  name: 'project',
  label: '项目管理',
  icon: 'logo-octocat',
  component: Base,
  children: [{
    path: 'list',
    name: 'project-list',
    label: '项目列表',
    icon: 'md-tennisball',
    component: () => {
      return import('../views/v-project-list');
    }
  }]
}, {
  path: '/about',
  name: 'about',
  label: '关于我们',
  icon: 'ios-information-circle',
  component: () => {
    return import('../views/v-about.vue');
  }
}]

export const topRoutes = [homeRoute, {
  path: '/usercenter',
  name: 'usercenter',
  label: '个人中心',
  icon: 'md-contact',
  component: () => {
    return import("../views/v-user");
  }
}]

export const allRoutes = [
  ...routes,
  ...topRoutes,
  {
    path: '/console/:projectID',
    name: 'console',
    label: '控制台',
    icon: 'md-contact',
    meta: {
      hideMenu: true
    },
    component: () => {
      return import("../views/v-console");
    }
  }
]

handleParent(routes);
handleParent(topRoutes);
export const findByName = (name, list) => {
  let aList = list || allRoutes;
  for (let aRoute of aList) {
    if (aRoute.name === name) {
      return aRoute
    }
    if (aRoute.children) {
      let child = findByName(name, aRoute.children);
      if (child) {
        return child;
      }
    }
  }
  return null;
}

export const getRouter = (route) => {
  if (typeof route === 'string') {
    return findByName(route);
  } else {
    return route;
  }
}

export const getRouterPath = (route) => {
  let aRouter = getRouter(route);
  if (aRouter) {
    let aPath = aRouter.path;
    while (aRouter.parent) {
      aPath = aRouter.parent.path + '/' + aPath;
      aRouter = aRouter.parent;
    }
    return aPath;
  }
  return homeRoute.path;
}

export const pushRoute = (route) => {
  let aRoute = getRouter(route);
  if (aRoute) {
    const path = getRouterPath(aRoute);
    router.push(path);
  }
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: allRoutes
})
router.beforeEach((to, from, next) => {
  let name = to.name;
  let router = getRouter(name);
  if (router) {
    store.dispatch('guaranteeRoute', name);
  }
  store.commit('setMenuStatus', to && to.meta && to.meta.hideMenu ? 'close' : 'open');
  next();
})

export default router;
