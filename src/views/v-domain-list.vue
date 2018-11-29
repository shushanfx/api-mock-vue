<template>
  <Card :bordered="false" :dis-hover="true">
    <div slot="title">
      <Form :model="form" :rules="rule" inline :label-width="80">
        <FormItem label="域名：">
          <Input type="text" v-model="form.name" placeholder="模糊搜索">
            <Icon type="ios-search" slot="prepend"/>
          </Input>
        </FormItem>
        <FormItem
          :label-width="5">
          <Button type="primary" @click="onHandleSearch">查询</Button>
          <Button type="primary" @click="onHandleAdd" style="margin-left:10px;">新增</Button>
        </FormItem>
      </Form>
    </div>
    <div>
      <Modal v-model="modal">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>新增域名</span>
        </p>
        <div>
          <Form>
            <FormItem>

            </FormItem>
          </Form>
        </div>
      </Modal>
    </div>
  </Card>
</template>

<script>
export default {
  name: 'v-domain-list',
  data() {
    return {
      form: {
        name: ''
      },
      rule: {},
      modal: false,
      entity: {}
    };
  },
  methods: {
    onHandleSearch() {
      console.info(this.form.name);
    },
    onHandleAdd() {
      this.modal = true;
    }
  }
};
</script>
