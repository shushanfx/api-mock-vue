## 基本描述

Mock System 致力于让开发测试尽可能的简单，因此在使用过程中也尽可能的最求简单高效。  
Mock System 以项目为驱动，使用时当然要[新建](/project/list)一个项目，然后为项目增加规则。  
一个映射规则包括如下信息：

- 域名、端口
- 路径
- 过滤器
  - 前置过滤器
  - 内容过滤器
  - 代理过滤器
  - 代理配置器
  - 后置过滤器

## 如何使用

为了简化使用流程，mock 团队也为使用者提供了便利的使用方式，使用时分为 pc 和无线。

### PC 使用

pc 使用只需要配置如下 host 即可:

```javascript
10.145.78.164 mingyi.sogou.com
10.145.78.164 health.sogou.com
10.145.78.164 wap.sogou.com
10.145.78.164 www.sogou.com
10.145.78.164 dlweb.sogoucdn.com
10.145.78.164 dl.web.sogoucdn.com
```

### 无线使用

无线使用更加便利，只需要连接如下 wifi：

```javascript
连接wifi： sogou_open_web，密码: qwertyui
```
