<template>
  <div>
    <Card :width="500" title="Mock System">Mock System平台是一个致力于接口测试的统一管理平台，通过它可以对任何接口进行模拟，当然也包括线上接口。</Card>
    <Card :width="500" title="如何使用" style="margin-top: 15px;">
      <p>Mock System致力于让开发测试尽可能的简单，因此在使用过程中也尽可能的最求简单高效。</p>
      <p>
        Mock System以项目为驱动，使用时当然要
        <a href="/project/list">新建</a>一个项目，然后为项目增加映射规则。
      </p>
      <p>隐射规则包括：</p>
      <ul style="margin-left: 30px;">
        <li>域名、端口</li>
        <li>路径</li>
        <li>前置过滤器</li>
        <li>内容过滤器</li>
        <li>代理过滤器</li>
        <li>后置过滤器</li>
      </ul>
      <p>
        <strong>如何使用：</strong>
        <ul style="margin-left: 40px;">
          <li>
            <p>PC，配置如下host即可：</p>
            <pre>
10.145.78.164 mingyi.sogou.com
10.145.78.164 health.sogou.com
10.145.78.164 wap.sogou.com
10.145.78.164 www.sogou.com
10.145.78.164 dlweb.sogoucdn.com
10.145.78.164 dl.web.sogoucdn.com
            </pre>
          </li>
          <li>
            <p>无线，配置如下即可</p>
            <pre>
连接wifi： sogou_open_web，密码: qwertyui
            </pre>
          </li>
        </ul>
      </p>
    </Card>
  </div>
</template>
