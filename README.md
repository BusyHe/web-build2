# web-build2

vue2 + koa2 搭建前端PC页面模板

## 技术栈

### 前端

- 框架：[vue2](https://cn.vuejs.org/v2/guide/)
- 前端路由管理： [vue-router](https://router.vuejs.org/zh-cn/)
- UI框架： [Element-ui](http://element.eleme.io/1.4/#/zh-CN/component/installation)
- 网络请求： [axios](https://github.com/axios/axios)
- css预处理： [stylu中文文档](http://www.zhangxinxu.com/jq/stylus/)

### 后端

- 框架：koa2
- 后端路由：koa-router
- mongodb：mongoose
- 命令行工具：commander

## 启动服务

Element-ui 主题配置

```
npm install element-theme -g
```

修改 element-variables.css，执行以下命令编辑css，生成theme文件夹`引入方式为按需引入`

```
et
```

进入根目录执行以下命令安装所需模块

```bash
npm install
```

### 后端服务

```bash
node server --port=**** # 自定端口
node server --port=**** --build #生产模式
```

### 前端服务

- 开发环境

    ```bash
    npm run dev
    ```

    如后端无数据，可利用webpack的dev服务测试

    ```js
    # /build/webpack.dev.conf.js

    devServer: {
        before(app) {
            app.post('/api/main', function (req, res) {
                res.json({custom: 'response'});
            })
        }
    ```

- 生产模式

    生产模式，会利用webpack打包生成/dist最终代码

    ```bash
    npm run build
    ```






