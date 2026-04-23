# nutui-uniapp workspace

这个仓库已经整合为一个 workspace 项目，包含：

- `docs`: VitePress 文档站
- `example`: uni-app 组件示例应用

## 开发

在根目录安装依赖：

```bash
npm install
```

同时启动文档和示例（推荐）：

```bash
npm run dev
```

分别启动：

```bash
npm run dev:docs
npm run dev:example
```

默认地址：

- 文档站：http://localhost:9999
- 示例应用（H5）：http://localhost:5173/ui/#/pages/index/index

## 构建

一体化构建命令：

```bash
npm run build
```

该命令会执行：

1. 构建 `example` 的 H5 产物
2. 构建 `docs` 文档站
3. 将 `example` 的 H5 产物复制到 `docs/.vitepress/dist/ui`

最终可部署目录：

- `docs/.vitepress/dist`

## 其他脚本

```bash
npm run serve:docs
npm run type-check
```

## pnpm 支持

仓库已提供 `pnpm-workspace.yaml`，若你使用 pnpm，可直接执行：

```bash
pnpm install
pnpm dev
```
