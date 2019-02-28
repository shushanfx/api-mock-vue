<template>
  <div>
    <Tag
      v-for="item in tagList"
      v-show="!!item"
      :key="item"
      :name="item"
      :closable="!readonly"
      @on-close="onHandleDelete"
    >{{item}}</Tag>
    <Tag v-if="tagList.filter(item => item).length === 0" :key="'none'" :name="'暂无tag'">暂无tag</Tag>
    <input
      v-if="!readonly"
      placeholder="输入tag"
      style="margin-left:5px;border: 1px solid #e8eaec!important; color: #515a6e!important; background: #fff!important; padding: 0 5px; line-height: 26px; height: 24px; border-radius: 5px;"
      type="text"
      v-model="tag"
      @keydown="onHandlePress"
    >
  </div>
</template>

<script>
export default {
  name: "ui-tag",
  data() {
    return {
      tagList: [],
      tag: ""
    };
  },
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.setTagList();
  },
  methods: {
    setTagList() {
      if (this.value && typeof this.value === "string") {
        this.tagList = this.value.split(",");
      } else {
        this.tagList = [];
      }
    },
    onHandlePress(e) {
      this.$nextTick(() => {
        let keyCode = e.keyCode;
        if (keyCode === 8) {
          if (!this.tag && this.tagList.length) {
            this.tagList.pop();
            this.setValue();
          }
        } else if (keyCode === 13) {
          if (this.tag) {
            this.tagList.push(this.tag);
            this.setValue();
          }
          this.tag = "";
        }
      });
    },
    setValue() {
      this.tagList = this.tagList.filter(item => item);
      this.$emit("input", this.tagList.join(","));
    },
    onHandleDelete(event, name) {
      this.tagList = this.tagList.filter(item => item !== name);
    }
  },
  watch: {
    value() {
      this.$nextTick(() => {
        this.setTagList();
      });
    }
  }
};
</script>
