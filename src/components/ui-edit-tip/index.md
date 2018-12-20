## 描述

通过前置后置函数，增加一些自定义处理逻辑

## API

- `ctx`： 当前请求的 ctx 实例，具体内容请参考 koa2 官方文档，列举部分函数
  - ctx.query，url 的参数信息
  - ctx.param，url 匹配的命名字段
- `mock`：传入的 Mock 实例对象，包括一下信息
  - mock.query 同 ctx.query
  - mock.param 同 ctx.param
  - mock.projectID 当前匹配的 projectID
  - mock.host 抓取接口的域名，可读可写，前置过滤器时可修改该值改变抓取的域名。
  - mock.path 抓取接口的路径，可读可写，前置过滤器时可修改该值改变抓取的路径。
  - mock.result 可读可写，修改返回值；
  - mock.status(status, percent)，按照指定 percent 概率返回状态码，如 mock.status(500, 20)
  - mock.delay(delayTime, percent)，按照指定 percent 概率延迟 delayTime ms，必须配合 await 使用，如 await mock.delay(1000, 10), 10%的概率延迟 1000ms
  - mock.run(func, percent)，按照指定 percent 概率执行指定方法
  - mock.tick(list, callback)，依次轮流返回 list 中的某个元素，如果传入了 callback，则调用 callback，传入参数(item, list, tickNumber, list)
- `mockjs`，传入 mockjs 类库，请参阅 mockjs 的用法
- `request`，传入的 request 类库，请参阅 request 的用法
- `merge`，传入的 merge 的类库，用于对象的复制，请参阅 merge 类库的用法
- `返回值`  
  在前置过滤器中`return false`，则不再继续后续流程，其余过滤器不处理返回值。
