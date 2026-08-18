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

const processQuestions = questionsForCategories([
  '开发模型', '开发方法', '统一过程（RUP）', '开发工具', '软件开发环境'
])
const requirementsQuestions = questionsForCategories(['需求工程'])
const analysisQuestions = questionsForCategories([
  '结构化分析', '面向对象分析', '软件建模', 'UML', '人机界面设计'
])
</script>

# 文档 1：开发过程、需求与分析

## 1. 开发过程、方法与工具

软件开发过程题先判断项目处于什么约束下，再选择适合的生命周期模型或开发方法。需求稳定、风险可控、交付节奏和反馈方式，决定瀑布、原型、增量、螺旋、敏捷等模型的适用性。

| 主题 | 判断重点 |
| --- | --- |
| 生命周期模型 | 需求稳定性、风险、交付方式和反馈时机 |
| 开发方法 | 过程是否迭代、是否强调用户协作、是否持续交付 |
| RUP | 迭代、用例驱动、架构为中心、风险驱动 |
| 开发工具与环境 | 支持编码、构建、版本、配置、测试和团队协作的工具链 |

不要只根据“迭代”两个字判断敏捷或 RUP，要结合题干是否强调统一过程、用例、架构、风险、持续反馈或快速交付。工具题则看它支持的是开发活动、版本管理、构建集成还是测试验证。

<details>
<summary>相关真题：47 题</summary>

<QuestionBank :questions="processQuestions" compact />

</details>

## 2. 需求工程

需求工程回答“系统需要解决什么问题”，包括需求获取、分析、规格说明、验证和管理。题目通常要求区分业务需求、用户需求、功能需求和非功能需求，并判断需求是否完整、一致、可验证、可追踪。

需求变化时，要先判断它影响的是范围、功能、质量属性还是实现约束，再决定如何记录、分析和验证。需求跟踪关系应能关联来源、设计、实现、测试和交付结果。

<details>
<summary>相关真题：4 题</summary>

<QuestionBank :questions="requirementsQuestions" compact />

</details>

## 3. 系统分析与建模

系统分析与建模把业务目标转化为结构、行为、数据和交互模型。结构化分析、面向对象分析、UML 和人机界面设计虽然表达方式不同，但都要从参与者、数据、职责和行为出发建立可验证的模型。

| 主题 | 重点 |
| --- | --- |
| 结构化分析 | 数据流、数据字典、加工和实体关系，逐层分解业务功能 |
| 面向对象分析 | 识别对象、类、职责、关系和协作，建立问题域模型 |
| UML | 用例、类、顺序、活动、状态等图分别表达不同视角 |
| 软件建模 | 根据问题关注点选择结构模型、行为模型或交互模型 |
| 人机界面 | 从用户任务、交互流程和反馈方式判断界面设计是否合理 |

模型题要先判断题目问的是静态结构、动态行为、数据流动还是用户交互，再选择相应模型。不要把“描述业务流程”的模型和“描述对象结构”的模型混用。

<details>
<summary>相关真题：35 题</summary>

<QuestionBank :questions="analysisQuestions" compact />

</details>

## 文档小结

| 章节 | 真题题数 | 分值记录 |
| --- | ---: | ---: |
| 开发过程、方法与工具 | 47 | 61 |
| 需求工程 | 4 | 5 |
| 系统分析与建模 | 35 | 45 |
| **合计** | **86** | **111** |

