## 快速开始

### 运行示例

默认加载 dev 配置，此文件 git 上并没有上传，请复制 config.default.ts 并命名为 config.dev.ts
如果需修改环境，修改 config/env 即可。  
目前仅用到了 `devApiConfig`（微信公众号开发环境配置）

```bash
$ nvm use
$ npm i
$ npm run dev
```

Don't tsc compile at development mode, if you had run `build` then you need to `npm run clean` before `npm run dev`.

### 部署

```bash
$ npm run build
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 10.22.0
- Typescript 2.8+
