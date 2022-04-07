# OIerLive
某大型线上网络游戏防划水神器（OIer 屏幕分享软件）

# 免责声明
使用本软件即默认您已阅读 [互联网直播服务管理规定](http://www.cac.gov.cn/2016-11/04/c_1119847629.htm)。
本软件仅支持定时上传屏幕截图，不含录音，录屏，打赏互动等功能。
本软件仅供在做题时分享屏幕与做题笔记使用，造成的后果开发者概不负责。

用户群：1025329276

# 搭建教程

需要 **同时搭建** 前端（front）和后端（back），服务才能生效。

## 前端搭建教程

1. 配置 nodejs 环境。

2. 把仓库 `clone` 到本地。

3. 安装依赖。
  ```
  cd front
  yarn
  ```

4. 修改 `config.json`。
  ```
  {
      "password": "你的密码（应与后端密码一致）",
      "interval": "更新画面的间隔（单位：ms）",
      "server": "云函数 post 方法地址（后文会讲到）"
  }
  ```

## 后端搭建教程

为了减少用户开支，我们使用腾讯云函数计算作为后端，每月有 100 万次调用的免费额度。

1. 注册 [腾讯云](https://cloud.tencent.com/) 账号。

2. 安装腾讯云函数依赖。
  ```
  npm install -g serverless
  ```

3. 在搭建前端时 clone 的本仓库目录下，执行如下指令：
  ```
  cd back/src
  yarn
  ```

4. （可选）修改  `serverless.yml`。

   - `region: ap-shanghai` 为云函数部署的目标地区。可修改为 `ap-guangzhou` 等其他地区，详见 [腾讯云官方文档](https://cloud.tencent.com/document/api/583/17238#.E5.9C.B0.E5.9F.9F.E5.88.97.E8.A1.A8)。
   - 其他内容不建议修改，除非你知道自己在做什么。

5. 修改 `config.json`。
  ```
  {
      "password": "你的密码（应与前端密码一致）",
      "interval": "更新画面的间隔（单位：ms）",
      "expire": "判定下线的时间（单位：ms）",
      "offline": "断线时的信息"
  }
  ```

6. 修改并确认无误后，执行如下命令来部署腾讯云函数。
  ```
  > serverless deploy
  serverless ⚡tencent
  Action: "deploy" - Stage: "dev" - App: "live" - Name: "oierlive"
  0s»oierlive» 部署中 ...
  ```

  此时可能会让你登录腾讯云账户，可以扫描二维码登录，也可以访问底下的链接登陆。

  部署成功后，会看到如下信息：

  ```
  type:         event
  functionName: oierlive-dev-live
  code:
    bucket: sls-cloudfunction-ap-shanghai-code
    object: /scf_component_rw6ykyk-1649163434.zip
  description:  This is a function in live application
  namespace:    default
  runtime:      Nodejs12.16
  handler:      index.main_handler
  memorySize:   128
  lastVersion:  $LATEST
  traffic:      1
  triggers:
    -
      NeedCreate:  true
      created:     true
      serviceId:   service-65f7tzkx
      serviceName: serverless
      subDomain:   service-65f7tzkx-1305163805.sh.apigw.tencentcs.com
      protocols:   http
      environment: release
      apiList:
        -
          path:            /post
          method:          POST
          apiName:         index
          created:         true
          authType:        NONE
          businessType:    NORMAL
          isBase64Encoded: false
          apiId:           api-84rbjcx3
          internalDomain:
          url:             http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com/release/post
      url:         http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com
      urls:
        - http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com/release/post
    -
      NeedCreate:  true
      created:     true
      serviceId:   service-65f7tzkx
      serviceName: serverless
      subDomain:   service-65f7tzkx-1305163805.sh.apigw.tencentcs.com
      protocols:   http
      environment: release
      apiList:
        -
          path:            /live
          method:          GET
          apiName:         index
          created:         true
          authType:        NONE
          businessType:    NORMAL
          isBase64Encoded: false
          apiId:           api-dhmqd3ah
          internalDomain:
          url:             http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com/release/live
      url:         http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com
      urls:
        - http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com/release/live
    -
      NeedCreate:  true
      created:     true
      serviceId:   service-65f7tzkx
      serviceName: serverless
      subDomain:   service-65f7tzkx-1305163805.sh.apigw.tencentcs.com
      protocols:   http
      environment: release
      apiList:
        -
          path:            /image
          method:          GET
          apiName:         index
          created:         true
          authType:        NONE
          businessType:    NORMAL
          isBase64Encoded: false
          apiId:           api-3bp3rvvn
          internalDomain:
          url:             http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com/release/image
      url:         http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com
      urls:
        - http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com/release/image
  
  应用控制台: https://serverless.cloud.tencent.com/apps/live/oierlive/dev
  
  33s »oierlive» 执行成功
  ```

   此时， `triggers` 的第一项就是 `post` 的 API 网关。它的 `apiList - url` 即为前端搭建教程中的 `云函数 post 方法地址`，在本例中为 `http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com/release/post`。

# 使用教程

前后端都搭建完成后， 在 `front` 目录内执行如下命令：
```
npm run start
```

若看见如下的运行日志，则说明部署成功。
```
Screenshoting...
Syncing data...
Received response!
```

此时，可以访问 `triggers` 的第二项 `live` 来进入屏幕分享页面，在本例中为 `http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com/release/live`。

通过修改 `front/live/note.txt` 可以同步做题笔记，支持 HTML 语法。

若要停止屏幕分享，关闭执行过 `npm run start` 的终端即可。

# 绑定域名

腾讯云函数的默认域名太长，若要绑定域名，可以在 [腾讯云函数控制台](https://console.cloud.tencent.com/scf/list) 中操作，也可以解析到云函数，未来也可能实现将屏幕分享域名与 [OIerSpace](https://oier.space) 开通了 Pro Plan 的个人博客绑定。

# 问题反馈

加入用户群 1025329276 或使用 Github Issue 反馈。

# 支持我们

根据相关法律法规，本软件完全免费，若真的想支持我们，可以赞助我们的其他项目：[Extend Luogu](https://afdian.net/@extend-luogu) / [OIer Space](https://afdian.net/@bohan)。