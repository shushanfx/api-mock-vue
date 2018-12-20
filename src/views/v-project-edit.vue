<template>
  <div>
    <Form :model="innerEntity" :label-width="80">
      <FormItem label="项目标识">
        <Input
          v-model="innerEntity.projectID"
          placeholder="请输入项目ID"
          :readonly="isEdit ? true: false"
        />
      </FormItem>
      <FormItem label="项目名称">
        <Input v-model="innerEntity.name" placeholder="项目名称"/>
      </FormItem>
      <FormItem label="项目描述">
        <Input v-model="innerEntity.description" placeholder="项目描述" type="textarea"/>
      </FormItem>
    </Form>
    <Row style="margin-bottom: 10px; display: flex; flex-direction: row-reverse">
      <Button type="default" style="margin-left: 10px;" @click="onHandleCancel">取消</Button>
      <Button type="primary" style @click="onHandleSave">保存</Button>
    </Row>
    <Card v-if="isEdit">
      <Row>
        <Button type="primary" @click="onHandleAdd">添加</Button>
        <Button type="default" @click="onHandleDebug">调试</Button>
      </Row>
      <Table style="margin-top: 15px; " border :columns="columns" :data="list"></Table>
    </Card>
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
        <span>{{mockID ? "编辑Mock" : "新建Mock"}}</span>
      </p>
      <div>
        <v-mock-edit
          :entity-i-d="mockID"
          :project-i-d="projectID"
          @save="onHandleMockSave"
          @cancel="onHandleMockCancel"
        />
      </div>
      <div slot="footer"></div>
    </Modal>
    <a href="javascript:void(0);" target="_blank" style="display:none;" ref="url">A link</a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VMockEdit from "./v-mock-edit";
import handleResult from "../utils/responseHandler";

export default {
  name: "v-project-edit",
  data() {
    let me = this;
    return {
      innerEntity: {},
      columns: [
        {
          title: "域名",
          key: "host",
          fixed: true,
          render(h, params) {
            let str = params.row["host"];
            if (params.row["isUsePort"]) {
              str += ":" + params.row["port"];
            }
            return h("span", null, str);
          }
        },
        {
          title: "URI",
          key: "path"
        },
        {
          title: "数据类型",
          key: "type",
          width: 120
        },
        {
          title: "过滤器",
          key: "isBefore",
          render(h, params) {
            return h("div", null, [
              h(
                "Tag",
                {
                  style: {
                    display: params.row.isBefore ? "" : "none"
                  },
                  props: {
                    color: "success"
                  }
                },
                "前置"
              ),
              h(
                "Tag",
                {
                  style: {
                    display: params.row.isContent ? "" : "none"
                  },
                  props: {
                    color: "success"
                  }
                },
                "数据"
              ),
              h(
                "Tag",
                {
                  style: {
                    display: params.row.isProxy ? "" : "none"
                  },
                  props: {
                    color: "success"
                  }
                },
                "代理"
              ),
              h(
                "Tag",
                {
                  style: {
                    display: params.row.isFilter ? "" : "none"
                  },
                  props: {
                    color: "success"
                  }
                },
                "后置"
              )
            ]);
          }
        },
        {
          title: "备注",
          key: "isProxy",
          render(h, params) {
            let type = params.row.type;
            let arr = [];
            if (type === "file" || type === "directory") {
              arr.push(
                h("p", null, [h("span", "位置："), h("Tag", params.row.path)])
              );
            }
            if (params.row.isProxy) {
              arr.push(h("p"), null, [
                h("span", "代理："),
                h("Tag", params.row.proxy)
              ]);
            }
            arr.push(h("p"), null, [
              h("span", "创建者："),
              h("Tag", params.row.creator)
            ]);
            return h("div", null, arr);
          }
        },
        {
          title: "操作",
          key: "isFilter",
          render(h, params) {
            let creator = params.row.creator;
            let rowPrev = me.list[params.index - 1];
            let rowNext = me.list[params.index + 1];
            return h("div", null, [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    display: creator === me.username ? "" : "none"
                  },
                  on: {
                    click() {
                      let path = params.row.host;
                      if (params.row.isUsePort && params.row.port) {
                        path = path + ":" + params.row.port;
                      }
                      path = path + params.row.path;
                      me.onHandleMockDelete(params.row._id, path);
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
                      me.onHandleMockEdit(params.row._id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "md-arrow-round-up",
                    shape: "circle"
                  },
                  style: {
                    display: me.canUp(params.row, rowPrev) ? "" : "none"
                  },
                  on: {
                    click() {
                      if (rowPrev) {
                        me.onHandleMockRank(params.row, rowPrev);
                      }
                    }
                  }
                },
                null
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    icon: "md-arrow-round-down",
                    shape: "circle"
                  },
                  style: {
                    display: me.canDown(params.row, rowNext) ? "" : "none"
                  },
                  on: {
                    click() {
                      if (rowNext) {
                        me.onHandleMockRank(params.row, rowNext);
                      }
                    }
                  }
                },
                null
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click() {
                      me.onHandleMockTest(params.row);
                    }
                  }
                },
                "代理测试"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click() {
                      me.onHandleMockTest(params.row, true);
                    }
                  }
                },
                "域名测试"
              )
            ]);
          }
        }
      ],
      list: [],
      mockID: "",
      modal: false
    };
  },
  components: {
    VMockEdit
  },
  props: {
    entityID: {
      type: String
    },
    projectID: {
      type: String
    }
  },
  mounted() {
    if (this.entityID) {
      this.loadProject();
      this.loadRoute();
    }
  },
  computed: {
    isEdit() {
      return !!this.entityID;
    },
    modalWidth() {
      return window.innerWidth - 100;
    },
    ...mapGetters({
      username: "getUsername"
    })
  },
  methods: {
    canUp(row, rowPrev) {
      if (row && rowPrev) {
        return row.host === rowPrev.host;
      }
      return false;
    },
    canDown(row, rowNext) {
      return this.canUp(rowNext, row);
    },
    onHandleCancel() {
      this.$emit("cancel");
    },
    onHandleSave() {
      let id = this.innerEntity.projectID;
      let name = this.innerEntity.name;
      if (id && name) {
        this.$http.put(`/mock/project/save.php`, this.innerEntity).then(
          res => {
            handleResult.call(this, res.data, json => {
              this.$emit("save", json);
            });
          },
          () => {
            handleResult.call(this);
          }
        );
      } else {
        this.$Message.warning("项目名称的标识不能为空");
      }
    },
    onHandleAdd() {
      this.mockID = "";
      this.modal = true;
    },
    onHandleMockSave() {
      this.modal = false;
      this.loadRoute();
    },
    onHandleMockCancel() {
      this.modal = false;
    },
    onHandleMockDelete(_id, path) {
      this.$Modal.confirm({
        title: "删除",
        content: `您确定要删除该接口{path}`
      });
      this.$http
        .delete("/mock/be/del.php", {
          params: {
            _id
          }
        })
        .then(
          res => {
            handleResult.call(this, res.body, data => {
              this.loadRoute();
            });
          },
          () => {
            this.$Message.warning({
              content: "操作失败"
            });
          }
        );
    },
    onHandleMockEdit(_id) {
      this.mockID = _id;
      this.modal = true;
    },
    onHandleMockRank(row1, row2) {
      this.$http
        .post("/mock/be/rank.php", {
          _id1: row1._id,
          _id2: row2._id,
          rank1: row2.rank,
          rank2: row1.rank
        })
        .then(
          res => {
            handleResult.call(this, res.body, () => {
              this.loadRoute();
            });
          },
          () => {
            handleResult.call(this);
          }
        );
    },
    onHandleDebug() {
      this.$refs.url.href =
        "/mock/console.php?__pid=" + encodeURIComponent(this.projectID || "");
      this.$refs.url.click();
    },
    onHandleMockTest(row, isHost) {
      let url = "";
      let path = row.example || row.path;
      let port = row.isUsePort ? (row.port ? ":" + row.port : "") : "";
      if (isHost) {
        url = `http://${row.host}${port}${path}`;
      } else {
        url = `/mock/test.php?mock-host=${encodeURIComponent(
          row.host || ""
        )}&mock-path=${encodeURIComponent(path)}`;
        if (port) {
          url += `&mock-port=${encodeURIComponent(row.port)}`;
        }
      }
      if (url.indexOf("?") !== -1) {
        url = url + "&";
      } else {
        url = url + "?";
      }
      url = url + "__pid=" + encodeURIComponent(row.project || "");
      this.$refs.url.href = url;
      this.$refs.url.click();
    },
    loadProject() {
      this.$http.get(`/mock/project/get.php?_id=${this.entityID}`).then(
        res => {
          handleResult.call(this, res.body, json => {
            this.innerEntity = json.data;
          });
        },
        () => {
          handleResult.call(this);
        }
      );
    },
    loadRoute() {
      this.$http
        .get(`/mock/be/list.php?projectID=${this.projectID}&pageSize=1000`)
        .then(
          res => {
            handleResult.call(this, res.body, json => {
              if (json && json.data && json.data.list) {
                this.list = json.data.list;
              }
            });
          },
          () => {
            handleResult.call(this);
          }
        );
    }
  }
};
</script>
