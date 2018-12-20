<template>
  <div>
    <ul>
      <li v-for="(index,item) in list" :key="index" v-html="item"></li>
    </ul>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      list: []
    };
  }
};
</script>
