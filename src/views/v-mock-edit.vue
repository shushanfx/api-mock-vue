<template>
  <div>
    <Card title="基本信息">
      <Form :model="innerEntity" :label-width="80">
        <FormItem label="接口名称" required>
          <Input v-model="innerEntity.name" placeholder="请输入接口名称"/>
        </FormItem>
        <FormItem label="项目标识">
          <Input v-model="innerEntity.project" readonly/>
        </FormItem>
        <FormItem label="Wiki">
          <Input v-model="innerEntity.wiki" type="text" placeholder="接口的wiki地址"/>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="innerEntity.desription" type="textarea" placeholder="输入接口的描述信息"/>
        </FormItem>
      </Form>
    </Card>
    <Card title="接口信息">
      <Form :model="innerEntity" :label-width="80">
        <FormItem label="Host" required>
          <Input v-model="innerEntity.host" placeholder="请输入域名，如www.sogou.com"/>
        </FormItem>
        <FormItem label="Port" required>
          <label>
            <i-switch
              v-model="innerEntity.isUsePort"
              size="small"
              :true-value="1"
              :false-value="0"
            />
            <span style="margin-left: 10px;">自定义端口</span>
          </label>
          <br>
          <Input v-if="innerEntity.isUsePort" v-model="innerEntity.port" placeholder="端口号，默认80"/>
        </FormItem>
        <FormItem label="Path" required>
          <Input v-model="innerEntity.path" placeholder="路径匹配规则，如/path、/path*、/:id/**等"/>
        </FormItem>
        <FormItem label="Example">
          <Input v-model="innerEntity.example" placeholder="如果path配置了通配符，则需要提供一个样例，如/web"/>
        </FormItem>
        <FormItem label="其他配置">
          <label>
            <i-switch
              v-model="innerEntity.isNotTunnelHeader"
              size="small"
              :true-value="1"
              :false-value="0"
            />
            <span style="margin-left: 10px;">不透传header，默认透传</span>
          </label>
        </FormItem>
        <FormItem>
          <label>
            <i-switch
              v-model="innerEntity.isNotRedirect"
              size="small"
              :true-value="1"
              :false-value="0"
            />
            <span style="margin-left: 10px;">不处理重定向，如302、301、307等，默认处理重定向</span>
          </label>
        </FormItem>
      </Form>
    </Card>
    <Card title="Mock信息">
      <Form :model="innerEntity" :label-width="80">
        <!-- <FormItem label="温馨提示" v-if="isPassThrough">
          <i style="margin-left: 10px;">接口信息将直接返回，系统不会进行任何拦截操作</i>
        </FormItem>-->
        <FormItem label="前置操作" style="position: relative;">
          <i-switch v-model="innerEntity.isBefore" size="small" :true-value="1" :false-value="0"/>
          <i style="margin-left: 10px;">接口抓取之前进行的操作</i>
          <Button
            style="position: absolute; top: 0; right: -6px;"
            type="default"
            size="small"
            icon="ios-information-circle"
            v-if="innerEntity.isBefore"
            @click="isShowBeforeTip = !isShowBeforeTip"
          ></Button>
        </FormItem>
        <FormItem v-if="innerEntity.isBefore && isShowBeforeTip" style="margin-top: -20px;">
          <ui-edit-tip/>
        </FormItem>
        <FormItem v-if="innerEntity.isBefore" style="margin-top: -20px;">
          <ace-editor
            style="border: 1px solid #ccc;"
            v-model="innerEntity.onBefore"
            lang="javascript"
            height="300"
          ></ace-editor>
        </FormItem>
        <FormItem label="自定义数据">
          <i-switch v-model="innerEntity.isContent" :true-value="1" :false-value="0" size="small"/>
          <i style="margin-left: 10px;">是否使用自定义数据</i>
        </FormItem>
        <FormItem v-if="innerEntity.isContent" label="数据类型">
          <Select v-model="innerEntity.type">
            <Option v-for="item in dataTypeList" :value="item.key" :key="item.key">{{ item.text }}</Option>
          </Select>
        </FormItem>
        <FormItem
          style="margin-top: -20px;"
          :label="innerEntity.type === 'file' ? '文件路径' : '文件夹路径'"
          v-if="innerEntity.isContent && (innerEntity.type === 'file' || innerEntity.type === 'directory')"
        >
          <Button type="primary" size="small" @click="onHandlePathChoose">点击选择</Button>
          <span v-if="innerEntity.filePath">{{innerEntity.filePath}}</span>
        </FormItem>
        <FormItem
          v-if="innerEntity.isContent && innerEntity.type === 'javascript'"
          style="margin-top: -20px;"
        >
          <ace-editor
            style="border: 1px solid #ccc;"
            v-model="innerEntity.content"
            lang="javascript"
            height="300"
          ></ace-editor>
        </FormItem>
        <FormItem
          v-if="innerEntity.isContent && innerEntity.type === 'json' "
          style="margin-top: -20px;"
        >
          <ace-editor
            style="border: 1px solid #ccc;"
            v-model="innerEntity.content"
            lang="json"
            height="300"
          ></ace-editor>
        </FormItem>
        <FormItem
          v-if="innerEntity.isContent && innerEntity.type === 'xml' "
          style="margin-top: -20px;"
        >
          <ace-editor
            style="border: 1px solid #ccc;"
            v-model="innerEntity.content"
            lang="xml"
            height="300"
          ></ace-editor>
        </FormItem>
        <FormItem
          v-if="innerEntity.isContent && innerEntity.type === 'html' "
          style="margin-top: -20px;"
        >
          <ace-editor
            style="border: 1px solid #ccc;"
            v-model="innerEntity.content"
            lang="html"
            height="300"
          ></ace-editor>
        </FormItem>
        <FormItem
          v-if="innerEntity.isContent && innerEntity.type === 'text' "
          style="margin-top: -20px;"
        >
          <ace-editor
            style="border: 1px solid #ccc;"
            v-model="innerEntity.content"
            lang="text"
            height="300"
          ></ace-editor>
        </FormItem>
        <FormItem label="抓取代理">
          <i-switch v-model="innerEntity.isProxy" size="small" :true-value="1" :false-value="0"/>
          <i style="margin-left: 10px;">通过代理抓取页面，效果相当于配置host</i>
        </FormItem>
        <FormItem v-if="innerEntity.isProxy" style="margin-top: -20px;">
          <Input type="text" v-model="innerEntity.proxy" placeholder="抓取代理，如：10.129.174.101:8002"/>
        </FormItem>
        <FormItem label="抓取配置">
          <i-switch
            v-model="innerEntity.isBeforeRequest"
            size="small"
            :true-value="1"
            :false-value="0"
          />
          <i style="margin-left: 10px;">抓取配置已生成，但执行抓取，允许修改抓取配置</i>
          <Button
            style="position: absolute; top: 0; right: -6px;"
            type="default"
            size="small"
            icon="ios-information-circle"
            v-if="innerEntity.isBeforeRequest"
            @click="isShowBeforeRequestTip = !isShowBeforeRequestTip"
          ></Button>
        </FormItem>
        <FormItem
          v-if="innerEntity.isBeforeRequest && isShowBeforeRequestTip"
          style="margin-top: -20px;"
        >
          <ui-edit-tip :show-options="true"/>
        </FormItem>
        <FormItem v-if="innerEntity.isBeforeRequest" style="margin-top: -20px;">
          <ace-editor
            style="border: 1px solid #ccc;"
            v-model="innerEntity.onBeforeRequest"
            lang="javascript"
            height="300"
          ></ace-editor>
        </FormItem>
        <FormItem label="后置操作" style="position:relative">
          <i-switch v-model="innerEntity.isFilter" size="small" :true-value="1" :false-value="0"/>
          <i style="margin-left: 10px;">抓取成功之后对数据进行进一步处理</i>
          <Button
            style="position: absolute; top: 0; right: -6px;"
            type="default"
            size="small"
            icon="ios-information-circle"
            v-if="innerEntity.isFilter"
            @click="isShowFilterTip = !isShowFilterTip"
          ></Button>
        </FormItem>
        <FormItem v-if="innerEntity.isFilter && isShowFilterTip" style="margin-top: -20px;">
          <ui-edit-tip/>
        </FormItem>
        <FormItem v-if="innerEntity.isFilter" style="margin-top: -20px;">
          <ace-editor
            style="border: 1px solid #ccc;"
            v-model="innerEntity.filter"
            lang="javascript"
            height="300"
          ></ace-editor>
        </FormItem>
      </Form>
    </Card>
    <Row style="margin-top: 15px; display: flex; flex-direction: row-reverse">
      <Button type="default" style="margin-left: 10px;" @click="onHandleCancel">取消</Button>
      <Button type="primary" style @click="onHandleSave">保存</Button>
    </Row>
  </div>
</template>

<script>
import AceEditor from "vue2-ace-editor";
import "brace/mode/javascript";
import "brace/mode/xml";
import "brace/mode/html";
import "brace/mode/text";
import "brace/mode/json";
import "brace/theme/chrome";

import UiEditTip from "../components/ui-edit-tip";

import responseHandler from "../utils/responseHandler";

export default {
  name: "v-mock-edit",
  components: {
    AceEditor,
    UiEditTip
  },
  data() {
    return {
      innerEntity: {},
      isShowBeforeTip: false,
      isShowFilterTip: false,
      isShowBeforeRequestTip: false,
      dataTypeList: [
        { key: "json", text: "JSON" },
        { key: "javascript", text: "javascript" },
        { key: "text", text: "text" },
        { key: "html", text: "html" },
        { key: "xml", text: "xml" },
        { key: "file", text: "文件" },
        { key: "directory", text: "文件夹" }
      ]
    };
  },
  props: {
    entityID: {
      type: String
    },
    projectID: {
      type: String
    },
    username: {
      type: String
    }
  },
  computed: {
    isPassThrough() {
      let { isBefore, isContent, isProxy, isFilter } = this.innerEntity;
      return !isBefore && !isContent && !isProxy && !isFilter;
    }
  },
  created() {
    if (this.entityID) {
      this.loadEntity();
    } else {
      this.innerEntity = {
        isBefore: 0,
        isContent: 0,
        isProxy: 0,
        isFilter: 0,
        onBefore: "",
        content: "",
        filePath: "",
        proxy: "",
        filter: "",
        name: "API-" + Date.now(),
        description: "",
        host: "",
        isUsePort: 0,
        port: "80",
        path: "",
        wiki: "",
        example: "",
        project: this.projectID,
        type: "json",
        isNotRedirect: 0,
        isNotTunnelHeader: 0,
        isBeforeRequest: 0,
        onBeforeRequest: ""
      };
    }
  },
  methods: {
    showMessage(message) {
      this.$Message.warning({
        content: message,
        duration: 3
      });
    },
    loadEntity() {
      this.$http
        .get("/mock/be/get.php", {
          params: {
            _id: this.entityID
          }
        })
        .then(
          res => {
            responseHandler.call(this, res.body, json => {
              if (json && json.data) {
                this.innerEntity = json.data;
              }
            });
          },
          () => {
            responseHandler.call(this);
          }
        );
    },
    onHandleSave() {
      let {
        name,
        project,
        host,
        isUsePort,
        port,
        path,
        example
      } = this.innerEntity;
      if (!name || !name.trim()) {
        this.showMessage("接口名称不能为空!");
        return false;
      }
      if (!project || !project.trim()) {
        this.showMessage("项目标识不能为空");
        return false;
      }
      if (!host || !host.trim()) {
        this.showMessage("host不能为空");
        return false;
      }
      if (isUsePort && (!port || !port.trim())) {
        this.showMessage("port不能为空");
        return false;
      }
      if (isUsePort && port >= 1 && port <= 65535) {
        // do nothing
      } else if (isUsePort) {
        this.showMessage("port必须是介于1~65535的数字");
        return false;
      }
      if (!path || !path.trim()) {
        this.showMessage("path不能为空");
        return false;
      } else if (path.indexOf("/") !== 0) {
        this.showMessage("path必须以/开头");
        return false;
      } else {
        let reg = /[():*{}]+/gi;
        if (reg.exec(path) && (!example || !example.trim())) {
          this.showMessage("path包含通配符时，example是必须的");
          return false;
        }
      }
      if (example && example.indexOf("/") !== 0) {
        this.showMessage("example必须以/开头");
        return false;
      }
      this.$http.put("/mock/be/save.php", this.innerEntity).then(
        res => {
          responseHandler.call(this, res.body, json => {
            this.$emit("save", json.data);
          });
        },
        () => {
          responseHandler.call(this);
        }
      );
    },
    onHandleCancel() {
      this.$emit("cancel");
    },
    onHandlePathChoose() {}
  }
};
</script>
