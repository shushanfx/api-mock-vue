<template>
  <div>
    <Card :width="500" title="Mock System">Mock System平台是一个致力于接口测试的统一管理平台，通过它可以对任何接口进行模拟，当然也包括线上接口。</Card>
    <Card :width="500" title="如何使用" style="margin-top: 15px;">
      <ui-marked :html="howToUse"/>
    </Card>
  </div>
</template>

<script>
import HowToUse from "./how-to-use.md";
import UiMarked from "../../components/ui-marked";
export default {
  data() {
    return {
      howToUse: HowToUse
    };
  },
  components: {
    UiMarked
  }
};
</script>
