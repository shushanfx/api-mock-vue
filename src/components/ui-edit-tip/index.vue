<template>
  <div class="ui-edit-tip" v-html="html"></div>
</template>

<script>
import RD from "./index.md";
export default {
  data() {
    return { html: RD };
  }
};
</script>

<style lang="postcss">
.ui-edit-tip {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.8;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.ui-edit-tip ul {
  margin-left: 19px;
}
</style>
