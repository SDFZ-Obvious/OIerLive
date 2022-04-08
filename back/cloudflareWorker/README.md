# Cloudflare Worker 部署教程

1. 安装 Cloudflare CLI。
```
# npm
npm i @cloudflare/wrangler -g
# yarn
yarn global add @cloudflare/wrangler
# cargo
cargo install wrangler
```

2. 注册 [Cloudflare Workers](https://workers.cloudflare.com/) 账号。

3. 注册成功后，会自动跳转至 `dashboard` 界面。

4. 点击左侧的 `Workers` 选项卡的倒三角形按钮，将其展开，点击 `Overview`。

5. 复制界面右侧的 Account ID，然后打开 `/back/cloudflareWorker/wrangler.toml`，把 `account_id = "account_id"` 修改为 `account_id = "你复制下来的字符串"`。

6. 点击左侧的 `Workers` 选项卡的倒三角形按钮，将其展开，点击 `KV`。

7. 点击 `Create namespace`。

8. `Namespace Name` 中填入 `oierlive`。

9. 在下面找到刚创建的命名空间 `oierlive`，点击改栏右侧的 `View`。

10. 复制 `namespace ID`，然后打开 `/back/cloudflareWorker/wrangler.toml`，把 `id = "kv_id"` 修改为 `id = "你复制下来的字符串"`。

11. 修改 `config`，`config` 位于 `/back/cloudflareWorker/index.js` 的最开头。
  ```
  {
      "password": "你的密码（应与前端密码一致）",
      "interval": "更新画面的间隔（单位：ms）",
      "expire": "判定下线的时间（单位：ms）",
      "offline": "断线时的信息"
  }
  ```

12. 打开终端，运行如下命令.
  ```
  > cd back/cloudflareWorker
  > wrangler login
  > wrangler publish
  Successfully published your script to
  https://oierlive.op2.workers.dev
  ```

13. 此时， `Successfully published your script to` 后面的 url **再加上** `/post` 即为前端搭建教程中的 `post 方法地址`，在本例中为 `https://live.op2.workers.dev/post`。