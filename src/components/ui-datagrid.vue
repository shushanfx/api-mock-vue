<template>
  <div>
      <Table v-bind="$data"
        :stripe="true"></Table>
      <Page v-if="pageTotal > 1"
          :total="total"
          :page-size="pageSize"
          :current="pageIndex"
          show-total show-sizer
          @on-change="onHandlePageChange"
          @on-page-size-change="onHandleSizeChange">
      </Page>
  </div>
</template>

<script>
export default {
  name: 'ui-datagrid',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageTotal: {
      type: Number,
      default: 0
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  }
};
</script>
