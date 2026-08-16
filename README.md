# 系统架构师备考

基于 AI Agent 的软考高级「系统架构设计师」备考学习站，使用 VitePress 构建并通过 GitHub Pages 发布。

## 本地开发

```bash
npm install
npm run docs:dev
```

构建和预览：

```bash
npm run docs:build
npm run docs:preview
```

## 内容结构

- 考试介绍与考情分析
- 综合知识考点地图
- 案例分析与论文写作
- 历年真题复盘
- AI Agent 学习方法实验

## 部署

推送到 `main` 分支后，GitHub Actions 会构建 `docs/.vitepress/dist` 并发布到 GitHub Pages。
