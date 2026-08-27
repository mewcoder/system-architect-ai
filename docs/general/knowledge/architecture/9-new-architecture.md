<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
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

const newArchitectureQuestions = questionsForCategories([
  'Lambda 架构',
  '大模型与工业智能架构',
  '人工智能知识表示',
  '推荐系统与机器学习架构',
  '物联网架构',
  '边缘计算架构',
  '区块链架构',
  '数字孪生架构',
])

// 该题在题库分类中误归入“面向服务架构”，题干实际考查工业大模型。
newArchitectureQuestions.push(
  ...selectQuestions(questionBank.questions, [
    'architecture-c03-s22-2025-05-q42-p1',
  ])
)
newArchitectureQuestions.sort((a, b) =>
  b.exam.localeCompare(a.exam) ||
  b.question_no - a.question_no ||
  a.part_no - b.part_no
)

const newArchitectureTrend = summarizeQuestionBank(newArchitectureQuestions)
</script>

# 新技术架构

> <strong>考试趋势：</strong>本章平均每年约<strong>{{ newArchitectureTrend.annualAverageLabel }} 分</strong>。
>
> - 新技术架构在 2024 年之后明显活跃，最近的考查重点集中在人工智能知识表示、机器学习、大模型与工业智能、边缘计算等方向；物联网、区块链和数字孪生相对分散。
> - 复习不要只记新名词，优先掌握<strong>分层结构、数据流向、计算位置、模型或服务边界及典型应用</strong>，并结合题干判断技术解决的问题。

## 1. 数据与智能架构

- <strong>Lambda 三层：</strong>批处理层处理全量历史数据；加速层（速度层）处理实时增量数据；服务层合并两类结果并提供查询。
- <strong>知识表示：</strong>谓词逻辑、产生式规则、框架、语义网络和本体是常见形式；数据流程图不是知识表示形式。本体统一描述领域概念、属性、关系和约束。
- <strong>推荐与机器学习：</strong>协同过滤依据用户或项目相似性及群体行为推荐，典型问题是冷启动；无标签数据按相似性分组属于无监督学习中的聚类。
- <strong>Transformer 与自注意力：</strong>Transformer 的关键机制是自注意力，用于建立序列中不同位置之间的关联。
- <strong>工业大模型五层：</strong>从下到上为基础设施层、基座层、模型层、交互层、应用层；算力与基础资源在底部，业务场景在顶部。
- <strong>投毒与模态对齐：</strong>投毒污染训练、检索或上下文数据，导致模型输出错误；多模态融合的关键是不同模态在时空和语义上的对齐。

对应真题：<a class="question-ref" href="#q-new-architecture-202505-23">#2025.05-23</a><a class="question-ref" href="#q-new-architecture-202505-42">#2025.05-42</a><a class="question-ref" href="#q-new-architecture-202605-10">#2026.05-10</a><a class="question-ref" href="#q-new-architecture-202605-11">#2026.05-11</a><a class="question-ref" href="#q-new-architecture-202605-13">#2026.05-13</a><a class="question-ref" href="#q-new-architecture-202605-37">#2026.05-37</a><a class="question-ref" href="#q-new-architecture-202605-38">#2026.05-38</a><a class="question-ref" href="#q-new-architecture-202605-39">#2026.05-39</a><a class="question-ref" href="#q-new-architecture-202605-40">#2026.05-40</a><a class="question-ref" href="#q-new-architecture-202605-41">#2026.05-41</a><a class="question-ref" href="#q-new-architecture-202511-49">#2025.11-49</a><a class="question-ref" href="#q-new-architecture-202511-58">#2025.11-58</a><a class="question-ref" href="#q-new-architecture-202505-57">#2025.05-57</a><a class="question-ref" href="#q-new-architecture-202411-63">#2024.11-63</a>

## 2. 物联与新型计算

- <strong>物联网三层：</strong>感知层采集状态，网络传输层负责连接和传输，应用层面向具体业务；物联网系统的软件架构风格通常按层次型理解。
- <strong>边缘计算：</strong>把计算、存储、缓存或推理能力放到靠近数据源的位置，突出低时延、节省带宽和现场自治；它是云边协同，不是完全不需要云。
- <strong>区块链：</strong>按参与范围分为公有链、私有链和联盟链，分别对应开放参与、组织内部受控和多组织许可参与。
- <strong>数字孪生：</strong>强调物理实体与数字模型的映射、同步和反馈；共性应用包括描述、诊断、预测、决策。

对应真题：<a class="question-ref" href="#q-new-architecture-202405-5">#2024.05-5</a><a class="question-ref" href="#q-new-architecture-202405-6">#2024.05-6</a><a class="question-ref" href="#q-new-architecture-202111-33">#2021.11-33</a><a class="question-ref" href="#q-new-architecture-202311-47">#2023.11-47</a><a class="question-ref" href="#q-new-architecture-202505-44">#2025.05-44</a><a class="question-ref" href="#q-new-architecture-202605-14">#2026.05-14</a>

<details>
<summary>对应真题</summary>

<QuestionBank :questions="newArchitectureQuestions" anchor-prefix="new-architecture" compact hide-categories />

</details>
