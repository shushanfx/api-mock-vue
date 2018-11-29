<template>
<div class="layout">
        <Layout style="height:100%;">
            <Header>
                <Menu mode="horizontal"
                  theme="dark"
                  active-name="1"
                  @on-select="onHandleMenu">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                      <MenuItem
                        v-for="(item,index) in tops"
                        :key="index" :name="item.name">
                        <Icon :type="item.icon"></Icon>
                        {{item.label}}
                      </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu
                      theme="light"
                      width="auto"
                      @on-select="onHandleMenu">
                        <template v-for="(item,index) in menus">
                          <Submenu :key="index" v-if="item.children && item.children.length"
                            :name="item.name">
                            <template slot="title">
                              <Icon type="ios-navigate"></Icon>{{item.label}}
                            </template>
                            <MenuItem
                              :key="jndex"
                              v-for="(jtem,jndex) in item.children"
                              @select="onHandleMenu(item)"
                              :name="jtem.name">
                              <Icon v-if="jtem.icon" :type="jtem.icon"></Icon>{{jtem.label}}
                            </MenuItem>
                          </Submenu>
                          <MenuItem
                            v-else
                            :name="item.name"
                            :key="index"
                            @select="onHandleMenu(item)">
                            <Icon :key="index" v-if="item.icon" :type="item.icon"></Icon>{{item.label}}
                          </MenuItem>
                        </template>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 0'}">
                    <ui-tab
                      :list="tabList"
                      :current="tabCurrent"
                      @refresh="onHandleTabRefresh"
                      @select="onHandleTabChange"
                      @remove="onHandleTabRemove">
                    </ui-tab>
                    <ui-bread-crumb :list="breadCrumb" />
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                      <keep-alive>
                        <router-view :key="tabCurrent.key"/>
                      </keep-alive>
                    </Content>
                </Layout>
            </Layout>
            <Footer class="layout-footer-center">{{year}} &copy; Mock API</Footer>
        </Layout>
    </div>
</template>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.layout-logo {
  width: 200px;
  height: 30px;
  float: left;
  position: relative;
  top: 15px;
  left: -10px;
}
.layout-logo:after {
  content: 'Mock System';
  position: absolute;
  top: 0;
  left: 8px;
  color: whitesmoke;
  font-size: 30px;
  line-height: 30px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>

<script>
import { mapGetters } from 'vuex';

import '@assets/css/base.css';
import { routes, topRoutes, findByName } from './router';
import UiTab from './components/ui-tab';
import UiBreadCrumb from './components/ui-broad-crumb';

export default {
  components: {
    UiTab,
    UiBreadCrumb
  },
  data() {
    let date = new Date();
    return {
      year: date.getFullYear(),
      menus: routes,
      tops: topRoutes,
      routeID: 0
    };
  },
  computed: {
    ...mapGetters({
      tabList: 'getRoutes',
      tabCurrent: 'getCurrentRoute',
      breadCrumb: 'getCurrentCrumb'
    })
  },
  methods: {
    onHandleMenu(item) {
      let router = findByName(item);
      if (router) {
        this.$store.commit('pushRoute', router);
      }
    },
    onHandleTabChange(item) {
      this.$store.commit('pushRoute', item);
    },
    onHandleTabRemove(item) {
      this.$store.commit('removeRoute', item);
    },
    onHandleTabRefresh(item) {
      this.$store.commit('refreshRoute', item);
    }
  }
};
</script>
