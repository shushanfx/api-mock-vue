<template>
  <div class="ui-console">
    <ul>
      <li v-for="(item,index) in list" :key="index" v-html="getItem(item)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    prompt: {
      type: String,
      default: "Mock> "
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getItem(item) {
      return `${this.prompt}${item}`;
    }
  }
};
</script>

<style>
.ui-console {
  margin: 0px 0 10px 0;
  background: black;
  color: wheat;
  padding-top: 10px;
  font-size: 16px;
}
.ui-console ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
