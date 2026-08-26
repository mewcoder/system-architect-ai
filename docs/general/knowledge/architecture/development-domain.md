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

const developmentQuestions = questionsForCategories(['基于架构的软件开发', '软件架构复用'])
const domainQuestions = questionsForCategories([
  '特定领域软件架构', '大模型与工业智能架构', '人工智能知识表示',
  '推荐系统与机器学习架构', '物联网架构', '边缘计算架构', '区块链架构',
  '数字孪生架构'
])
</script>

# 文档 3：架构开发与领域架构

## 1. 架构开发与软件复用

基于架构的软件开发把架构作为需求、设计、实现和演化之间的共同约束：先识别关键质量属性和变化点，再形成稳定的架构骨架，最后把组件和实现逐步装配到架构中。

软件架构复用关注复用对象的粒度和适用边界，既可以复用设计经验、模式和框架，也可以复用组件、服务和参考架构。判断题要区分“直接复制代码”和“在约束、接口、质量属性明确的前提下复用架构资产”。

<details>
<summary>相关真题：21 题</summary>

<QuestionBank :questions="developmentQuestions" compact hide-categories />

</details>

## 2. 特定领域与智能架构

特定领域架构先从领域共性需求出发，再通过参考架构、领域组件和可配置变化点支持多个系统。智能架构题则把人工智能、数据处理和具体业务场景结合起来，重点判断数据流、模型能力、计算位置和系统边界。

| 方向 | 关注点 |
| --- | --- |
| AI 与知识表示 | 知识组织、推理、学习模型和应用决策链路 |
| 推荐与机器学习 | 数据采集、特征处理、模型训练、推理和反馈闭环 |
| 大模型与工业智能 | 模型、数据、算力、业务流程和安全约束的协同 |
| 物联网与边缘计算 | 感知、连接、边缘处理、云端协同和实时性 |
| 区块链与数字孪生 | 多方可信、状态同步、实体映射和运行反馈 |

这类题不要只记技术名称，要先画出“数据从哪里来、在哪里处理、结果交给谁、故障影响到哪里”的链路，再判断架构技术解决的是连接、计算、存储、可信还是决策问题。

<details>
<summary>相关真题：32 题</summary>

<QuestionBank :questions="domainQuestions" compact hide-categories />

</details>

## 文档小结

| 章节 | 真题题数 | 分值记录 |
| --- | ---: | ---: |
| 架构开发与软件复用 | 21 | 37 |
| 特定领域与智能架构 | 32 | 40 |
| **合计** | **53** | **77** |
