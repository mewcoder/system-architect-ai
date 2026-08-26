<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../../data/question-banks/architecture.json'

function questionsForCategories(categories: string[]) {
  const selected = new Set(categories)
  return questionBank.questions
    .filter((question) => selected.has(question.category))
    .sort((a, b) =>
      b.exam.localeCompare(a.exam) ||
      b.question_no - a.question_no ||
      a.part_no - b.part_no
    )
}

const distributedQuestions = questionsForCategories([
  'REST 与 Web Service', '微服务架构', '面向服务架构', '云计算与虚拟化架构',
  'Lambda 架构', '网格服务架构', '企业应用集成架构', '中间件架构', 'CDN 与反向代理'
])
const qualityQuestions = questionsForCategories(['软件质量属性', '软件架构评估'])
</script>

# 文档 2：分布式服务与质量

## 1. 分布式服务与平台架构

分布式服务题重点是服务如何拆分、暴露、组合、部署和治理。REST、Web Service、SOA、微服务、云计算、虚拟化、中间件、企业应用集成和 CDN 虽然名称不同，但都围绕服务边界、通信方式、资源位置和运行治理展开。

| 方向 | 主要判断点 |
| --- | --- |
| SOA / REST | 服务契约、资源表示、无状态交互、接口复用和约束 |
| 微服务 | 服务自治、独立部署、弹性伸缩、服务发现和分布式治理 |
| 云与虚拟化 | 资源池化、弹性、隔离、虚拟机和基础设施服务 |
| 中间件与集成 | 通信、消息、适配、代理和异构系统协同 |
| Lambda 架构 | 批处理、实时处理和查询视图的组合关系 |
| CDN 与网格服务 | 内容就近分发、资源协同和服务位置透明性 |

分布式架构题不要只背“优点是解耦、缺点是复杂”，要把题干中的<strong>状态放在哪里、数据如何一致、请求如何失败、服务如何发现、部署如何扩展</strong>逐项对应到架构机制。服务拆分越细，治理、监控、容错和数据一致性成本通常越需要显式处理。

<details>
<summary>相关真题：23 题</summary>

<QuestionBank :questions="distributedQuestions" compact hide-categories />

</details>

## 2. 质量属性与架构评估

质量属性题要把抽象目标转成可观察的场景。一个完整的质量属性场景通常包括刺激源、刺激、环境、制品、响应和响应度量；架构策略则是为了让响应达到目标而采取的结构或运行机制。

| 属性 | 常见策略或度量方向 |
| --- | --- |
| 性能 | 并发、缓存、资源池、减少计算开销、响应时间和吞吐量 |
| 可用性 | 冗余、故障检测、恢复、降级、平均修复时间和连续运行能力 |
| 安全性 | 认证、授权、审计、加密、隔离和最小权限 |
| 可修改性 | 封装变化、抽象接口、局部化修改、延迟绑定 |
| 可测试性 | 控制与观察状态、隔离依赖、可替换组件和自动化验证 |
| 互操作性 | 标准接口、协议适配、数据格式转换和服务契约 |

架构评估重点掌握“场景—策略—结果”的关系。ATAM 通过质量属性场景识别敏感点、权衡点、风险和非风险；不同方案之间往往不是简单的优劣关系，而是性能、可用性、安全性、成本和可修改性之间的权衡。

<details>
<summary>相关真题：61 题</summary>

<QuestionBank :questions="qualityQuestions" compact hide-categories />

</details>

## 文档小结

| 章节 | 真题题数 | 分值记录 |
| --- | ---: | ---: |
| 分布式服务与平台架构 | 23 | 27 |
| 质量属性与架构评估 | 61 | 118 |
| **合计** | **84** | **145** |
