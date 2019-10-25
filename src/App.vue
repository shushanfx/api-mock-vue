<template>
  <div class="layout">
    <Layout style="height:100%;">
      <Header ref="header">
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="onHandleMenu">
          <div class="layout-logo">
            <span>{{title}}</span>
            <span class="subtitle" v-if="subtitle">{{subtitle}}</span>
          </div>
          <div class="layout-nav">
            <MenuItem name="user">
              <Icon type="md-contact" style="margin-left:20px;" />
              <Dropdown @on-click="onHandleDropdown">
                <span>{{username}}</span>
                <DropdownMenu slot="list" v-if="isLogin">
                  <DropdownItem name="logout">
                    <Icon type="md-exit" />登出
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout ref="content" :style="contentStyle">
        <Sider hide-trigger :style="{background: '#fff'}" v-if="menuStatus === 'open'">
          <Menu
            ref="leftMenu"
            theme="light"
            width="auto"
            @on-select="onHandleMenu"
            :active-name="activeName"
            :open-names="openNames"
          >
            <template v-for="(item,index) in menus">
              <Submenu :key="index" v-if="item.children && item.children.length" :name="item.name">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  <Badge class="my-menu-badge">
                    <a class="my-menu-item">{{item.label}}</a>
                  </Badge>
                </template>
                <MenuItem
                  :key="jndex"
                  v-for="(jtem,jndex) in item.children"
                  @select="onHandleMenu(jtem)"
                  :name="jtem.name"
                >
                  <Icon v-if="jtem.icon" :type="jtem.icon"></Icon>
                  <Badge :count="jtem.count" class="my-menu-badge">
                    <a class="my-menu-item">{{item.label}}</a>
                  </Badge>
                </MenuItem>
              </Submenu>
              <MenuItem v-else :name="item.name" :key="index" @select="onHandleMenu(item)">
                <Icon :key="index" v-if="item.icon" :type="item.icon"></Icon>
                <Badge class="my-menu-badge">
                  <a class="my-menu-item">{{item.label}}</a>
                </Badge>
              </MenuItem>
            </template>
          </Menu>
        </Sider>
        <Layout
          :style="{padding: '0 0 0 24px', position: 'relative', height: '100%', overflow: 'hidden'}"
        >
          <div>
            <ui-tab
              :list="tabList"
              :current="tabCurrent"
              @refresh="onHandleTabRefresh"
              @select="onHandleTabChange"
              @remove="onHandleTabRemove"
            ></ui-tab>
            <ui-bread-crumb :list="breadCrumb" />
          </div>
          <Content
            :style="{padding: '10px 24px 20px 24px', height: '100%', background: '#fff', overflow: 'scroll'}"
          >
            <router-view :key="tabCurrent.key" />
          </Content>
        </Layout>
      </Layout>
      <Footer ref="footer" class="layout-footer-center my-footer-class" v-html="footer"></Footer>
    </Layout>
    <Modal
      ref="formLogin"
      title="用户登陆"
      :value="isShowLogin"
      :z-index="9999"
      @on-cancel="onHandleLoginCancel"
    >
      <Form :model="user" label-position="right">
        <FormItem label="用户名" required :label-width="80">
          <Input v-model="user.username" autocomplete="on" />
        </FormItem>
        <FormItem label="密码" required :label-width="80">
          <Input v-model="user.password" type="password" />
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

<script>
import { mapGetters } from "vuex";

import "@assets/css/base.css";
import { routes, topRoutes, findByName } from "./router";
import UiTab from "./components/ui-tab";
import UiBreadCrumb from "./components/ui-broad-crumb";
import config from "@/../config/default";
import { vueReplace } from "./utils/stringUtils";
import { throttle } from "lodash";

export default {
  components: {
    UiTab,
    UiBreadCrumb
  },
  data() {
    let date = new Date();
    return {
      year: date.getFullYear(),
      title: config.title,
      footer: config.footer,
      subtitle: config.subtitle,
      menus: routes,
      tops: topRoutes,
      routeID: 0,
      user: {
        username: "",
        password: "",
        message: ""
      },
      contentStyle: {}
    };
  },
  computed: {
    ...mapGetters({
      username: "getUsername",
      isLogin: "isLogin",
      isShowLogin: "isShowLogin",
      tabList: "getRoutes",
      tabCurrent: "getCurrentRoute",
      breadCrumb: "getCurrentCrumb",
      menuStatus: "getMenuStatus"
    }),
    activeName() {
      return this.$route.name;
    },
    openNames() {
      if (
        this.$route &&
        this.$route.matched &&
        this.$route.matched.length > 0
      ) {
        return this.$route.matched.map(item => {
          return item.name;
        });
      }
      return [];
    }
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
      if (this.$refs.leftMenu) {
        this.$nextTick(() => {
          this.$refs.leftMenu.updateOpened();
        });
      }
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
    onHandleDropdown(name) {
      if (name === "logout") {
        this.onHandleLogout();
      }
    },
    onHandleLogout() {
      this.$http.post("/mock/cas/logout.php").then(
        res => {
          if (res && res.ok) {
            let data = res.body;
            if (data && data.code === 1) {
              location.reload(true);
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
  created() {
    if (this.title) {
      // 对title进行替换
      this.title = vueReplace(this.title, this.$data);
    }
    if (this.footer) {
      // 对footer进行替换
      this.footer = vueReplace(this.footer, this.$data);
    }
    if (this.subtitle) {
      this.subtitle = vueReplace(this.subtitle, this.$data);
    }
  },
  mounted() {
    document.title = config.title;
    this.$store.dispatch("getUser");
    this.onHandleResize = throttle(() => {
      let header = this.$refs.header;
      let content = this.$refs.content;
      let footer = this.$refs.footer;
      if (header && content && footer) {
        let height = window.innerHeight || window.clientHeight;
        let height1 = header.$el.clientHeight || header.$el.height || 0;
        let height2 = footer.$el.clientHeight || footer.$el.height || 0;
        this.contentStyle = {
          height: `${height - height1 - height2}px`,
          overflow: "hidden"
        };
      }
    }, 200);
    this.onHandleResize();
    window.addEventListener("resize", this.onHandleResize, false);
  },
  destroyed() {
    window.removeEventListener("resize", this.onHandleResize);
  }
};
</script>
