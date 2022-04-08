# Tencent SCF 部署教程

1. 注册 [腾讯云](https://cloud.tencent.com/) 账号。

2. 安装腾讯云函数依赖。
  ```
  npm install -g serverless
  ```

3. 在搭建前端时 clone 的本仓库目录下，执行如下指令：
  ```
  cd back/tencentSCF/src
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

   此时， `triggers` 的第一项就是 `post` 的 API 网关。它的 `apiList - url` 即为前端搭建教程中的 `post 方法地址`，在本例中为 `http://service-65f7tzkx-1305163805.sh.apigw.tencentcs.com/release/post`。

部署成功。