<template>
  <Card title="用户信息" icon="ios-options" :padding="0" shadow>
    <CellGroup>
      <Cell name="username">
        <span>用户名： {{user.username}} - {{user.displayName}}</span>
        <a href="/mock/cas/logout.php" style="margin-left: 5px;" type="error" size="small">退出登陆</a>
      </Cell>
      <Cell name="department">
        <span>部门： {{user.department}}</span>
      </Cell>
      <Cell name="email">
        <span>邮箱：{{user.email}}</span>
      </Cell>
    </CellGroup>
  </Card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "v-user",
  computed: {
    ...mapGetters({
      user: "getUser"
    })
  }
};
</script>
