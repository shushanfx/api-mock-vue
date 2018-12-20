<template>
  <Card :bordered="false" :dis-hover="true">
    <div slot="title">
      <Form :model="form" inline :label-width="60">
        <FormItem label="项目：">
          <Input
            type="text"
            v-model="form.name"
            placeholder="名称或者ID"
            :clearable="true"
            @on-enter="onHandleSearch"
          />
        </FormItem>
        <FormItem label="创建者：">
          <Input
            type="text"
            v-model="form.creator"
            placeholder="创建者ID"
            :clearable="true"
            @on-enter="onHandleSearch"
          />
        </FormItem>
        <FormItem :label-width="113" label="只显示我关注的">
          <Checkbox v-model="form.owner"></Checkbox>
        </FormItem>
        <FormItem :label-width="5">
          <Button type="primary" @click="onHandleSearch">查询</Button>
          <Button type="primary" @click="onHandleAdd" style="margin-left:10px;">新增</Button>
        </FormItem>
      </Form>
    </div>
    <div>
      <div>
        <Table stripe :columns="columns" :data="list"></Table>
        <Page
          v-if="list && list.length"
          style="margin-top: 10px;"
          :total="pager.total"
          show-total
          :page-size="pager.pageSize"
          :current="pager.current"
          @on-change="onHandlePageChange"
          @on-page-size-change="onHandlePageSizeChange"
        />
      </div>
      <Modal
        v-if="modal"
        v-model="modal"
        :width="modalWidth"
        :mask-closable="false"
        :footer-hide="true"
        :transfer="false"
      >
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>{{entityID ? "编辑项目" : "新建项目"}}</span>
        </p>
        <div>
          <v-project-edit
            :entity-i-d="entityID"
            :project-i-d="projectID"
            :mode="entityMode"
            @save="onHandleSave"
            @cancel="onHandleCancel"
          />
        </div>
        <div slot="footer"></div>
      </Modal>
    </div>
  </Card>
</template>

<script>
import moment from "moment";
import vProjectEdit from "./v-project-edit";

import handleResult from "../utils/responseHandler";
import { mapGetters } from "vuex";

export default {
  name: "v-domain-list",
  data() {
    let me = this;
    return {
      form: {
        name: "",
        owner: true,
        creator: ""
      },
      pager: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      modal: false,
      entity: {},
      editEntity: {},
      entityMode: "",
      entityID: "",
      projectID: "",
      copyProjectID: "",
      list: [],
      columns: [
        {
          title: "序号",
          key: "_id",
          width: 80,
          render: (h, params) => {
            return h(
              "span",
              null,
              (this.pager.pageIndex - 1) * this.pager.pageSize +
                params.index +
                1
            );
          }
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "项目标识",
          key: "projectID"
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "修改者",
          key: "modifier"
        },
        {
          title: "修改时间",
          key: "modifiedTime",
          render(h, params) {
            let value = params.row["modifiedTime"];
            let str = "-";
            if (value > 0) {
              str = moment(new Date(value)).format("YYYY-MM-DD HH:mm:ss");
            }
            return h("span", null, str);
          }
        },
        {
          title: "操作",
          key: "modifiedTime",
          render(h, params) {
            return h("div", null, [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click() {
                      me.doGetEntity(
                        params.row["_id"],
                        params.row["projectID"]
                      );
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    display: me.isMine(params.row) ? "" : "none"
                  },
                  on: {
                    click() {
                      me.$Modal.confirm({
                        title: "删除确认",
                        content: `您确定要删除项目[${params.row["name"]}(${
                          params.row["projectID"]
                        })]？`,
                        onOk() {
                          me.doRemoveEntity(params.row["_id"]);
                        }
                      });
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click() {
                      me.doCopyEntity(params.row);
                    }
                  }
                },
                "复制"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    display: me.isMine(params.row) ? "none" : ""
                  },
                  on: {
                    click() {
                      me.doFollow(params.row);
                    }
                  }
                },
                me.isFollow(params.row) ? "取消关注" : "关注"
              )
            ]);
          }
        }
      ]
    };
  },
  mounted() {
    this.onHandleSearch();
  },
  methods: {
    onHandleSearch() {
      let obj = Object.assign({}, this.form, this.pager);
      this.$http
        .get("/mock/project/list.php", {
          params: obj
        })
        .then(
          res => {
            if (res && res.ok) {
              handleResult.call(this, res.data, data => {
                if (data && data.code === 1) {
                  this.pager.pageIndex = data.data.pageIndex;
                  this.pager.pageSize = data.data.pageSize;
                  this.pager.total = data.data.total;
                  this.list = data.data.list;
                }
              });
            } else {
              this.$Message.warning("网络异常，请稍后再试！");
            }
          },
          () => {
            this.$Message.warning("网络异常，请稍后再试！");
          }
        );
    },
    onHandleAdd() {
      this.entityMode = "edit";
      this.projectID = "";
      this.entityID = "";
      this.modal = true;
    },
    onHandleCancel() {
      this.modal = false;
    },
    doGetEntity(_id, projectID) {
      this.entityMode = "edit";
      this.projectID = projectID;
      this.entityID = _id;
      this.modal = true;
    },
    doRemoveEntity(_id) {
      this.$http
        .delete("/mock/project/del.php", {
          params: {
            _id
          }
        })
        .then(
          res => {
            handleResult.call(this, res.body, data => {
              this.onHandleSearch();
            });
          },
          () => {
            this.$Message.warning({
              content: "操作失败"
            });
          }
        );
    },
    onHandleSave() {
      this.modal = false;
      if (!this.entityID) {
        // edit
        this.pager.index = 0;
      }
      this.onHandleSearch();
    },
    onHandleCacel() {
      this.modal = false;
    },
    onHandlePageChange(index) {
      this.pager.pageIndex = index;
      this.onHandleSearch();
    },
    onHandlePageSizeChange(size) {
      this.pager.pageSize = size;
      this.onHandleSearch();
    },
    isMine(row) {
      return this.username === row.creator;
    },
    isFollow(row) {
      if (row && row.follows) {
        let follows = row.follows;
        return follows.indexOf(this.username) !== -1;
      }
      return false;
    },
    doFollow(row) {
      if (row) {
        this.$http
          .post("/mock/project/follow.php", {
            _id: row._id,
            username: this.username,
            action: this.isFollow(row) ? "remove" : "add"
          })
          .then(
            res => {
              handleResult.call(this, res.body, () => {
                this.onHandleSearch();
              });
            },
            () => {
              handleResult.call(this);
            }
          );
      }
    },
    doCopyEntity(row) {
      let me = this;
      this.copyProjectID = `${row.projectID}_copy`;
      this.$Modal.confirm({
        render(h) {
          return h("div", null, [
            h(
              "p",
              {
                style: {
                  "margin-bottom": "10px"
                }
              },
              "请输入新的项目标识："
            ),
            h("p", null, [
              h("Input", {
                props: {
                  value: me.copyProjectID,
                  autofocus: true,
                  placeholder: "输入新的项目标识，如：" + row.projectID
                },
                on: {
                  input: val => {
                    me.copyProjectID = val;
                  }
                }
              })
            ])
          ]);
        },
        onOk: () => {
          let newProjectID = me.copyProjectID.trim();
          if (newProjectID) {
            me.$http
              .post("/mock/project/copy.php", {
                name: `${row.name}_copy`,
                projectID: newProjectID,
                _id: row._id
              })
              .then(
                res => {
                  handleResult.call(me, res.body, () => {
                    me.onHandleSearch();
                  });
                },
                () => {
                  handleResult.call(me);
                }
              );
          } else {
            this.$Message.warning({
              content: "请输入正确的项目标识"
            });
          }
        }
      });
    }
  },
  computed: {
    modalWidth() {
      let width = window.innerWidth - 100;
      return this.entityID ? width : 520;
    },
    ...mapGetters({
      username: "getUsername"
    })
  },
  components: {
    vProjectEdit
  }
};
</script>
