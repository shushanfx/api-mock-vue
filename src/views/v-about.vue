<template>
  <Card title="关于我们">
    <div>
      <p>复合搜索研发部-网页搜索前端组是一个专门从事前端开发的部门</p>
      <p>如有问题请联系:
        <a href="mailto:open_front_vr@sogou-inc.com">open_front_vr</a>
      </p>
    </div>
  </Card>
</template>

<script>
export default {
  name: "v-about",
  data() {
    let date = new Date();
    return {
      date
    };
  }
};
</script>
