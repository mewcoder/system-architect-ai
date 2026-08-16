# AGENTS.md

系统架构设计师备考学习站（VitePress + GitHub Pages）。

## 规则

### 项目资料目录

- `local/`：个人学习资料、本地数据和本地化处理工具。该目录不提交到仓库，也不作为线上页面资源。
- `local/script/`：只供本地使用的 PDF 导入、结构化和 JSON 导出脚本。
- `local/skills/`：只供本地使用的题库处理 Skill 和工作流说明。
- `local/docs/`：本地工作笔记和处理方案，不作为网站页面发布。
- `temp/`：临时处理中间结果。放置 PDF 转换、调试、渲染和验证过程中的临时文件；任务完成后可以清理，不作为正式数据源。
- `share/`：确认拥有分享或再分发权限的公共资料。目录名称不代表资料自动拥有公开授权。

### 本地 Skill 使用规则

- `local/skills/` 下的 Skill 是本项目的本地化处理工作流，只供本地整理和处理 PDF 使用。
- Skill 只负责指导和编排本地处理，不是网站运行依赖，也不参与 VitePress 构建。
- Skill 必须配合 `local/script/` 中的脚本使用，处理链路为“本地 PDF -> 本地 SQLite -> 可公开的 JSON”。
- Skill 本身、处理脚本、原始 PDF、SQLite 和中间结果都保留在本地；线上仓库只保留页面、JSON 和静态资源。

### 题库数据流

- PDF 只作为一次性录入来源，不作为网站构建时的数据源。
- 本地结构化数据库固定为 `local/structured/question-bank.sqlite`，使用一个业务表 `questions` 保存题目数据。
- JSON 是线上页面的数据源，统一放在 `docs/data/`；其中题库 JSON 固定放在 `docs/data/question-banks/`，按题库来源拆分文件。
- 页面通过导入 `docs/data/question-banks/*.json` 使用题库；VitePress 构建后会将这些 JSON 打包进静态页面，因此线上不需要后端服务。
- 题目中的图片作为线上资源放在 `docs/public/assets/` 下，并按大模块使用 `general/`、`case/`、`thesis/` 分类。
- `local/script/` 中的脚本负责“PDF -> SQLite”和“SQLite -> JSON”；正常构建不应重新读取 PDF。

### 变更约束

- 新增题库时，先明确 PDF 路径、科目名称、题目分类和考试批次，再执行导入和导出。
- 不把 `local/` 或 `temp/` 中的文件复制到线上目录；只有经过确认可以公开的 JSON、页面和图片才进入 `docs/`。
- 修改题库后需要检查 SQLite 完整性、JSON 校验结果和 `npm run docs:build` 构建结果。
- Markdown 中需要强调的内容，如果加粗标记后直接接中文，优先使用 `<strong>...</strong>`，避免使用容易解析不稳定的 `**...**中文`。
- AI 只基于项目中提供的笔记和资料工作，不把模型自身知识直接当作学习站答案来源。
