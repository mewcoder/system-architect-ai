<script setup lang="ts">
import { summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/architecture.json'

const architectureTrend = summarizeQuestionBank(questionBank.questions)
</script>

# 系统架构设计

本组知识按<strong>独立文章</strong>重构。先用一篇文章建立架构定义和多视图建模基础，再继续整理架构开发、架构风格、质量属性和架构评估等主题。

> <strong>考试趋势：</strong>整个模块平均每年约<strong>{{ architectureTrend.annualAverageLabel }} 分</strong>。
>
> - 架构风格、软件质量属性和架构评估是长期稳定的传统主线，ABSD 与 DSSA 负责补充架构开发和领域复用方法；复习时先建立这几条主干之间的联系。
> - 近年分布式服务和新技术架构的考查更活跃，重点逐步延伸到微服务、云计算、人工智能、大模型和边缘计算；在掌握传统架构基础后，应结合最新真题跟进这些方向。
> - 整个模块的题目常把<strong>架构结构、质量属性、评估方法和具体技术</strong>放在同一场景中判断，做题时优先分析系统边界、交互方式、质量目标和架构决策，再定位具体术语。

| 文章 | 内容 |
| --- | --- |
| [1 架构基础与 4+1 视图](./1-foundation) | 软件架构定义、数据设计、体系结构设计和多视图建模 |
| [2 基于架构的软件开发（ABSD）](./2-absd) | 架构驱动、递归细化、六个活动和架构演化 |
| [3 软件架构风格](./3-styles) | 经典架构风格及其适用场景 |
| [4 软件质量属性](./4-quality-attributes) | 质量属性、质量场景和架构策略 |
| [5 架构评估](./5-evaluation) | 敏感点、权衡点、风险和评估方法 |
| [6 软件架构复用](./6-reuse) | 架构资产、复用方式与复用过程 |
| [7 特定领域软件架构（DSSA）](./7-dssa) | DSSA、领域活动、参与角色和可复用领域资产 |
| [8 微服务与分布式架构](./8-distributed-service) | SOA、REST、微服务、云计算和中间件 |
| [9 新技术架构](./9-new-architecture) | Lambda、人工智能、物联网、边缘计算和数字孪生 |

以上独立文章已经覆盖原有合并文档的内容，复习时按 1～9 章顺序学习。
