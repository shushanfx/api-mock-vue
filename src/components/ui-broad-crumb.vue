<template>
  <Breadcrumb :style="{margin: '12px 0'}"
    v-if="list && list.length > 1">
      <BreadcrumbItem
        :key="item.name + index"
        v-for="(item,index) in list">
        {{item.label}}
      </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {
  name: 'ui-broad-crumb',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>
