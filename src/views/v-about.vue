<template>
  <div>
    This is an about page. {{date}}
  </div>
</template>

<script>
export default {
  name: 'v-about',
  data() {
    let date = new Date();
    return {
      date
    };
  }
};
</script>
