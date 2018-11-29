<template>
  <Card :bordered="false" :dis-hover="true">
    <div slot="title">
      <Form :model="form" :rules="rule" inline :label-width="60">
        <FormItem label="项目：">
          <Input type="text" v-model="form.name"
            placeholder="名称或者ID"
            :clearable="true"
            @on-enter="onHandleSearch"/>
        </FormItem>
        <FormItem label="创建者：">
          <Input type="text" v-model="form.creator"
            placeholder="创建者ID"
            :clearable="true"
            @on-enter="onHandleSearch"/>
        </FormItem>
        <FormItem :label-width="113" label="只显示我关注的">
          <Checkbox v-model="form.owner"></Checkbox>
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
        name: '',
        owner: true,
        creator: ''
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
