<template>
  <div>
    <Tabs
      :value="current ? current.name : ''"
      type="card" v-if="list && list.length"
      @on-click="onHandleClick"
      @on-tab-remove="onHandleRemove">
      <TabPane
        :key="item.name"
        :label="item.label"
        :name="item.name"
        :icon="item.icon"
        :closable="item.closable === false ? false : true"
        v-for="item in list"></TabPane>
      <div slot="extra">
        <Icon
          type="md-refresh-circle"
          style="font-size: 28px; cursor: pointer;"
          @click="onHandleRefresh"
          size="large"/>
      </div>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'ui-tab',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    current: {
      type: Object
    }
  },
  methods: {
    onHandleRefresh() {
      this.$emit('refresh', this.current.name);
    },
    onHandleClick(name) {
      this.$emit('select', name);
    },
    onHandleRemove(name) {
      this.$emit('remove', name);
    }
  }
};
</script>
