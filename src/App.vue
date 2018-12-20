<template>
  <div class="layout">
    <Layout style="height:100%;">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="onHandleMenu">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem v-for="(item,index) in tops" :key="index" :name="item.name">
              <Icon :type="item.icon"></Icon>
              {{getTopLabel(item)}}
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu theme="light" width="auto" @on-select="onHandleMenu">
            <template v-for="(item,index) in menus">
              <Submenu :key="index" v-if="item.children && item.children.length" :name="item.name">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  {{item.label}}
                </template>
                <MenuItem
                  :key="jndex"
                  v-for="(jtem,jndex) in item.children"
                  @select="onHandleMenu(item)"
                  :name="jtem.name"
                >
                  <Icon v-if="jtem.icon" :type="jtem.icon"></Icon>
                  {{jtem.label}}
                </MenuItem>
              </Submenu>
              <MenuItem v-else :name="item.name" :key="index" @select="onHandleMenu(item)">
                <Icon :key="index" v-if="item.icon" :type="item.icon"></Icon>
                {{item.label}}
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
            @remove="onHandleTabRemove"
          ></ui-tab>
          <ui-bread-crumb :list="breadCrumb"/>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view :key="tabCurrent.key"/>
          </Content>
        </Layout>
      </Layout>
      <Footer class="layout-footer-center">{{year}} &copy; Mock API</Footer>
    </Layout>
    <Modal
      ref="formLogin"
      title="用户登陆"
      v-model="isShowLogin"
      :z-index="9999"
      @on-cancel="onHandleLoginCancel"
    >
      <Form :model="user" label-position="right">
        <FormItem label="用户名" required :label-width="80">
          <Input v-model="user.username" autocomplete="on"/>
        </FormItem>
        <FormItem label="密码" required :label-width="80">
          <Input v-model="user.password" type="password"/>
        </FormItem>
        <div>{{user.message}}</div>
      </Form>
      <Row slot="footer" style="display: flex; flex-direction: row-reverse">
        <Button type="default" style="margin-left: 10px;" @click="onHandleLoginCancel">取消</Button>
        <Button type="primary" style @click="onHandleLoginSubmit">登陆</Button>
      </Row>
    </Modal>
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
  content: "Mock System";
  position: absolute;
  top: 0;
  left: 8px;
  color: whitesmoke;
  font-size: 30px;
  line-height: 30px;
}
.layout-nav {
  margin-right: -30px;
  position: absolute;
  right: 0px;
}
.layout-footer-center {
  text-align: center;
}
</style>

<script>
import { mapGetters } from "vuex";

import "@assets/css/base.css";
import { routes, topRoutes, findByName } from "./router";
import UiTab from "./components/ui-tab";
import UiBreadCrumb from "./components/ui-broad-crumb";

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
      routeID: 0,
      user: {
        username: "",
        password: "",
        message: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      username: "getUsername",
      isShowLogin: "isShowLogin",
      tabList: "getRoutes",
      tabCurrent: "getCurrentRoute",
      breadCrumb: "getCurrentCrumb"
    })
  },
  methods: {
    onHandleMenu(item) {
      let router = findByName(item);
      if (router) {
        this.$store.commit("pushRoute", router);
      }
    },
    onHandleTabChange(item) {
      this.$store.commit("pushRoute", item);
    },
    onHandleTabRemove(item) {
      this.$store.commit("removeRoute", item);
    },
    onHandleTabRefresh(item) {
      this.$store.commit("refreshRoute", item);
    },
    onHandleLoginSubmit() {
      let username = this.user.username;
      let password = this.user.password;
      if (!username) {
        this.message = "用户名不能为空！";
      } else if (!password) {
        this.message = "密码不能为空";
      } else {
        this.$http
          .post("/mock/cas/login.php", {
            username,
            password
          })
          .then(
            res => {
              if (res && res.ok) {
                let data = res.body;
                if (data && data.code === 1) {
                  this.user.message = data.message;
                  setTimeout(() => {
                    this.$store.commit("setUser", data.data.entity);
                    this.$store.commit("hideLogin");
                  }, 500);
                } else {
                  this.user.message = data.message;
                }
              } else {
                this.user.message = "网络异常！";
              }
            },
            () => {
              this.user.message = "网络异常！";
            }
          );
      }
      return false;
    },
    onHandleLoginCancel() {
      this.user.username = "";
      this.user.password = "";
      this.user.message = "";
      this.$store.commit("hideLogin");
    },
    getTopLabel(item) {
      if (item.label === "个人中心") {
        return this.username;
      }
      return item.label;
    }
  },
  mounted() {
    this.$store.dispatch("getUser");
  }
};
</script>
