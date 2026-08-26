<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions } from '../../../.vitepress/theme/questionBankUtils'
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
</script>

# 新技术架构

## 1. 数据与智能架构

- <strong>Lambda 三层：</strong>批处理层处理全量历史数据；加速层（速度层）处理实时增量数据；服务层合并两类结果并提供查询。
- <strong>知识表示：</strong>谓词逻辑、产生式规则、框架、语义网络和本体是常见形式；数据流程图不是知识表示形式。本体统一描述领域概念、属性、关系和约束。
- <strong>推荐与机器学习：</strong>协同过滤依据用户或项目相似性及群体行为推荐，典型问题是冷启动；无标签数据按相似性分组属于无监督学习中的聚类。
- <strong>Transformer 与自注意力：</strong>Transformer 的关键机制是自注意力，用于建立序列中不同位置之间的关联。
- <strong>工业大模型五层：</strong>从下到上为基础设施层、基座层、模型层、交互层、应用层；算力与基础资源在底部，业务场景在顶部。
- <strong>投毒与模态对齐：</strong>投毒污染训练、检索或上下文数据，导致模型输出错误；多模态融合的关键是不同模态在时空和语义上的对齐。

## 2. 物联与新型计算

- <strong>物联网三层：</strong>感知层采集状态，网络传输层负责连接和传输，应用层面向具体业务；物联网系统的软件架构风格通常按层次型理解。
- <strong>边缘计算：</strong>把计算、存储、缓存或推理能力放到靠近数据源的位置，突出低时延、节省带宽和现场自治；它是云边协同，不是完全不需要云。
- <strong>区块链：</strong>按参与范围分为公有链、私有链和联盟链，分别对应开放参与、组织内部受控和多组织许可参与。
- <strong>数字孪生：</strong>强调物理实体与数字模型的映射、同步和反馈；共性应用包括描述、诊断、预测、决策。

<details>
<summary>真题摘要：20 道独立题 / 20 条记录</summary>

<QuestionBank :questions="newArchitectureQuestions" compact hide-categories />

</details>
