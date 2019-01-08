<template>
  <div style="position:relative; margin: -25px;" ref="elContainer">
    <Row class="btn-area" style="position:absolute; top: 0; right: 0; z-index: 10">
      <Button @click="onHandleClear">清屏</Button>
      <Button @click="onHandleScroll">{{isScroll ? "取消滚屏" : "跟随滚动"}}</Button>
    </Row>
    <ui-console ref="elConsole" :prompt="'Mock ' + projectID + '> '" :list="list"/>
  </div>
</template>

<style scoped>
</style>

<script>
import io from "socket.io-client";
import UiConsole from "../components/ui-console";
import debounce from "debounce";

export default {
  components: {
    UiConsole
  },
  data() {
    return {
      isScroll: true,
      projectID: "",
      list: []
    };
  },
  created() {
    this.$scrollToButtom = debounce(() => {
      this.scrollToButtom();
    }, 100);
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
    this.$nextTick(() => {
      this.handleHeight();
    });
    window.addEventListener("resize", this.$scrollToButtom, false);
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
          // "seq -w 1 100000 | while read line; do echo $line; sleep 0.1; done;"
          "pm2 log mock | grep '" + this.projectID.replace(/'/gi, '"') + "'"
        );
      });
      this.socket.on("disconnect", () => {
        this.list.push("断开连接");
        this.$scrollToButtom();
      });
      this.socket.on("message", msg => {
        this.$nextTick(() => {
          this.list.push(msg);
          // 如果大于10000行，则截取
          if (this.list.length > 1000) {
            this.list = this.list.slice(this.list.length - 1000);
          }
          this.$scrollToButtom();
        });
      });
      this.socket.on("stop", msg => {
        this.list.push("系统执行完毕");
        this.$scrollToButtom();
      });
      this.socket.open();
    },
    onHandleClear() {
      this.list = [""];
    },
    onHandleScroll() {
      this.isScroll = !this.isScroll;
    },
    scrollToButtom() {
      if (!this.isScroll) {
        return true;
      }
      let height = this.$refs.elConsole.$el.scrollHeight;
      this.$refs.elConsole.$el.scrollTo(0, height);
    },
    handleHeight() {
      let parentNode = this.$refs.elContainer.parentNode;
      let height = parentNode.clientHeight || parentNode.offsetHeight;
      if (height > 0) {
        let style = this.$refs.elConsole.$el.style;
        style.height = height + "px";
        style.overflow = "scroll";
      }
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.$scrollToButtom);
    if (this.socket && this.socket.close) {
      this.socket.close();
    }
  }
};
</script>
