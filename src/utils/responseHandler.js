export default function (json, handler) {
  if (typeof json === "object" && json) {
    if (json.code === -512) {
      // LOGIN 校验
      this.$store.commit('showLogin');
    } else if (json.code < 0) {
      // 操作失败
      this.$Message.error({
        content: json.message
      });
    } else if (json.code === 1) {
      handler && handler(json);
    }
  } else {
    this.$Message.error({
      content: '网络异常，请稍后再试！'
    });
  }
};
