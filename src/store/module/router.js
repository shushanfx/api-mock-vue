import * as router from '../../router';
import {
  List as StorageList
} from '../../utils/storage';

const ROUTE_CACHE = '__mock_api_route_cache';
const ROUTE_LIST = new StorageList(ROUTE_CACHE);
ROUTE_LIST.map = (item) => {
  return item.name;
}

const hasRouter = function hasRouter(state, route) {
  let routes = state.routes;
  for (let aRoute of routes) {
    if (route.name === aRoute.name) {
      return true;
    }
  }
  return false;
}

const findRouter = function (state, route) {
  let routes = state.routes;
  for (let i = 0; i < routes.length; i++) {
    let aRoute = routes[i];
    if (route.name === aRoute.name) {
      return i;
    }
  }
  return -1;
}

export default {
  state: {
    currentRoute: {},
    routes: []
  },
  getters: {
    getCurrentRoute(state) {
      return state.currentRoute;
    },
    getCurrentCrumb(state) {
      let current = state.currentRoute;
      let crumbs = [];
      while (current) {
        if (current.label) {
          crumbs.push(current)
        }
        current = current.parent;
      }
      return crumbs;
    },
    getRoutes(state) {
      return state.routes;
    }
  },
  mutations: {
    pushRoute(state, route) {
      let aRoute = router.getRouter(route);
      if (!aRoute || aRoute.name === state.currentRoute.name) {
        return false;
      }
      let has = hasRouter(state, aRoute);
      if (!has) {
        state.routes.push(aRoute);
        ROUTE_LIST.list = state.routes;
      }
      state.currentRoute = aRoute;
      router.pushRoute(aRoute);
    },
    removeRoute(state, route) {
      let aRoute = router.getRouter(route);
      if (!aRoute || aRoute.name !== state.currentRoute.name) {
        return false;
      }
      let index = findRouter(state, aRoute);
      if (index >= 0) {
        state.routes.splice(index, 1);
        router.default.back();
        ROUTE_LIST.list = state.routes;
      }
    },
    refreshRoute(state, route) {
      route = router.getRouter(route || state.currentRoute);
      if (route) {
        route.key = router.generateKey();
      }
    },
    setCurrentRoute(state, route) {
      let aRoute = router.getRouter(route);
      if (aRoute) {
        state.currentRoute = route;
      }
    }
  },
  actions: {
    guaranteeRoute({
      state
    }, route) {
      let aRoute = router.getRouter(route);
      if (aRoute) {
        if (!hasRouter(state, aRoute)) {
          aRoute.key = route.generateKey();
          state.routes.push(aRoute);
          ROUTE_LIST.list = state.routes;
        }
        state.currentRoute = aRoute;
      }
    },
    initRoute({
      state
    }) {
      let list = ROUTE_LIST.list;
      if (list.length === 0) {
        ROUTE_LIST.list = list = [router.homeRoute.name];
      }
      state.routes.push(...list.map(name => router.findByName(name)));
    }
  }
};
