<template>
  <div style="position:relative" ref="container">
    <Row class="btn-area" style="position:absolute; top: 0; right: 0;">
      <Button @click="onHandleClear">清屏</Button>
      <Button @click="onHandleScroll">{{isScroll ? "取消滚屏" : "跟随滚动"}}</Button>
    </Row>
    <ui-console style="min-height: 100px;" :prompt="'Mock ' + projectID + '> '" :list="list"/>
  </div>
</template>

<style scoped>
</style>

<script>
import io from "socket.io-client";
import UiConsole from "../components/ui-console";

export default {
  components: {
    UiConsole
  },
  data() {
    return {
      isScroll: "",
      projectID: "",
      list: []
    };
  },
  mounted() {
    let projectID =
      this.$route && this.$route.params ? this.$route.params.projectID : null;
    if (projectID) {
      this.projectID = projectID;
      this.start();
    } else {
      this.list.push("参数识别异常，未发现projectID");
    }
  },
  methods: {
    start() {
      this.socket = io("/", {
        autoConnect: true
      });
      this.socket.on("connect", () => {
        this.list.push("连接成功");
        this.socket.emit(
          "run",
          "pm2 log mock | grep '" + this.projectID.replace(/'/gi, '"') + "'"
        );
      });
      this.socket.on("disconnect", () => {
        this.list.push("断开连接");
      });
      this.socket.on("message", msg => {
        this.list.push(msg);
      });
      this.socket.on("stop", msg => {
        this.list.push("系统执行完毕");
      });
      this.socket.open();
    },
    onHandleClear() {
      this.list = [""];
    },
    onHandleScroll() {
      this.isScroll = !this.isScroll;
    },
    scrollToButtom() {}
  },
  watch: {
    list() {
      if (this.isScroll) {
        this.srollToButtom();
      }
    }
  },
  destroyed() {
    if (this.socket && this.socket.close) {
      this.socket.close();
    }
  }
};
</script>
