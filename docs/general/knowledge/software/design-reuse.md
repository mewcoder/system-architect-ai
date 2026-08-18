<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import softwareBank from '../../../data/question-banks/software.json'
import analysisBank from '../../../data/question-banks/analysis.json'

const allQuestions = [...softwareBank.questions, ...analysisBank.questions]

function questionsForCategories(categories: string[]) {
  const selected = new Set(categories)
  return allQuestions
    .filter((question) => selected.has(question.category))
    .sort((a, b) =>
      b.exam.localeCompare(a.exam) ||
      b.question_no - a.question_no ||
      a.part_no - b.part_no
    )
}

const designQuestions = questionsForCategories([
  '设计模式', '模块化设计', '面向对象设计', '结构化设计', '模块内聚与耦合'
])
const componentsQuestions = questionsForCategories(['基于构件的软件工程', '软件重用'])
</script>

# 文档 2：设计、模式与构件复用

## 1. 设计方法与模式

软件设计把分析结果转成可实现的结构。高内聚、低耦合是总目标，模块化、结构化设计和面向对象设计则提供不同的分解方式。设计模式解决的是反复出现的设计问题，不能脱离上下文机械套用。

| 主题 | 判断重点 |
| --- | --- |
| 模块化 | 控制模块规模和职责边界，减少变化传播 |
| 内聚与耦合 | 追求职责集中、依赖简单，避免不必要的共享和交叉引用 |
| 面向对象设计 | 关注封装、继承、多态、职责分配和对象协作 |
| 结构化设计 | 从数据流或功能分解出模块和调用关系 |
| 设计模式 | 识别问题场景、参与者关系、变化点和模式带来的代价 |

判断内聚或耦合时不能只背名称，要看模块之间共享什么、依赖什么，以及一个变化会影响多少模块。设计模式题则先找意图，再看类或对象之间的协作关系。

<details>
<summary>相关真题：40 题</summary>

<QuestionBank :questions="designQuestions" compact />

</details>

## 2. 构件化与软件复用

构件化软件工程把可复用构件、接口、装配和运行环境作为设计重点。题目常考构件的粒度、接口契约、构件组装、适配和演化，以及复用带来的开发效率与依赖管理问题。

软件重用不等于简单复制代码。复用对象可以是需求、架构、设计、构件、框架或服务；选择复用资产时，要同时检查功能匹配、质量属性、接口约束、许可和维护成本。

| 判断方向 | 要问的问题 |
| --- | --- |
| 构件接口 | 接口是否稳定，契约是否明确，能否替换和组合 |
| 构件装配 | 依赖、适配、运行环境和配置是否满足 |
| 复用粒度 | 复用的是代码、构件、框架、服务还是参考架构 |
| 复用代价 | 学习、适配、许可、升级和供应商依赖是否可接受 |

<details>
<summary>相关真题：31 题</summary>

<QuestionBank :questions="componentsQuestions" compact />

</details>

## 文档小结

| 章节 | 真题题数 | 分值记录 |
| --- | ---: | ---: |
| 设计方法与模式 | 40 | 66 |
| 构件化与软件复用 | 31 | 41 |
| **合计** | **71** | **107** |

