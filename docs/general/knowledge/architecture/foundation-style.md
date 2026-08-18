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

const foundationQuestions = questionsForCategories([
  '软件架构基础', '4+1视图', '架构描述语言', '基本概念'
])
const styleQuestions = questionsForCategories(['软件架构风格'])
</script>

# 文档 1：架构基础与风格

## 1. 架构基础与表达

架构基础题先回答三个问题：系统由哪些结构元素组成，元素之间如何连接和协作，以及这些决策受到哪些约束。架构描述语言（ADL）则进一步把组件、连接件、配置和约束用形式化方式表达出来。

| 主题 | 重点 |
| --- | --- |
| 架构基础 | 组件、连接件、配置、约束和架构决策 |
| 4+1 视图 | 逻辑视图、开发视图、进程视图、物理视图和场景视图 |
| 架构表达 | 用视图从不同关注点描述系统，避免一张图承载所有信息 |
| ADL | 描述组件、连接件、接口和约束，支持架构分析与交流 |

4+1 视图题要先看题干关注对象：功能和职责通常落在逻辑视图，代码和模块组织落在开发视图，并发与通信落在进程视图，节点部署落在物理视图；场景视图用于串联和验证其他视图。

<details>
<summary>相关真题：14 题</summary>

<QuestionBank :questions="foundationQuestions" compact />

</details>

## 2. 软件架构风格

架构风格题的核心不是背名称，而是根据业务约束判断结构、通信方式、状态位置、扩展方式和故障边界。常见风格可以这样抓主线：

| 风格方向 | 主要判断点 |
| --- | --- |
| 分层 | 职责隔离、层间依赖、替换边界和跨层调用代价 |
| 管道过滤器 | 数据流经过多个处理阶段，过滤器可组合和复用 |
| 事件驱动 | 发布订阅、异步解耦、消息可靠性和一致性代价 |
| 数据中心 | 围绕共享数据存储和访问组织组件，重点看数据一致性与并发 |
| 客户端/服务器 | 服务提供者与请求方的职责、部署和通信关系 |
| 面向对象与解释器 | 对象协作、封装变化，或通过解释执行抽象规则和行为 |

题目出现“职责是否隔离”“模块能否独立替换”“数据是否共享”“请求是否异步”“处理步骤能否组合”等关键词时，先定位风格的结构特征，再判断优缺点。风格选择必须结合性能、可用性、安全性、可修改性和部署约束。

<details>
<summary>相关真题：45 题</summary>

<QuestionBank :questions="styleQuestions" compact />

</details>

## 文档小结

| 章节 | 真题题数 | 分值记录 |
| --- | ---: | ---: |
| 架构基础与表达 | 14 | 23 |
| 软件架构风格 | 45 | 62 |
| **合计** | **59** | **85** |

