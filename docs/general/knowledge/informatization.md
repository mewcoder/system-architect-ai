<script setup lang="ts">
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/信息化.json'

function questionsFor(keys: string[]) {
  const selected = new Set(keys)
  return questionBank.questions
    .filter((question) => selected.has(`${question.exam}-${question.question_no}`))
    .sort((a, b) =>
      b.exam.localeCompare(a.exam) ||
      b.question_no - a.question_no ||
      a.part_no - b.part_no
    )
}

const enterpriseQuestions = questionsFor(['202111-13', '201311-14'])
const erpQuestions = questionsFor(['202505-18', '201611-15', '201411-13'])
const dataQuestions = questionsFor(['202211-16', '201511-17'])
const intelligentQuestions = questionsFor(['202605-12', '202511-48', '202511-47', '202411-64'])
const integrationQuestions = questionsFor([
  '202511-62', '202411-56', '202411-42', '202411-38', '202405-7', '201411-14'
])
const planningQuestions = questionsFor([
  '202411-60', '202111-14', '201911-15', '201711-15', '201711-14', '201411-12'
])
</script>

# 信息化

这篇不是教材全章，而是根据近几年真题提炼的高频认知。很多题考的是基本概念、系统之间的关系和常见判断，不需要把所有历史题都展开学习。

## 基础认知：系统类型

| 类型 | 名称 | 说明 |
| --- | --- | --- |
| TPS/DPS | 事务处理系统（Transaction Processing System）/ 数据处理系统（Data Processing System） | 记录和处理企业每天发生的业务事务，为统计和管理提供基础数据，例如订单、库存、收付款和生产记录。 |
| MIS | 管理信息系统（Management Information System） | 汇总和加工业务数据，形成报表和管理信息，帮助管理人员了解企业运行情况。 |
| DSS | 决策支持系统（Decision Support System） | 综合利用数据、模型和分析方法，支持查询、预测、方案比较等决策活动，但不直接替代管理者做决定。 |
| ES | 专家系统（Expert System） | 把专家知识和判断规则放入知识库，由推理机进行推理，解决特定专业领域的问题。 |
| OAS | 办公自动化系统（Office Automation System） | 支持公文、文档、邮件、会议、流程和协同办公，减少重复性事务，提高办公效率。 |
| ERP | 企业资源计划（Enterprise Resource Planning） | 统一管理财务、采购、生产、销售、库存和人力等资源，打通企业内部的业务流程和数据。 |

企业中还常见：<strong>WMS（仓库管理系统，Warehouse Management System）</strong>负责仓储，<strong>MES（制造执行系统，Manufacturing Execution System）</strong>负责生产现场，<strong>PDM（产品数据管理，Product Data Management）</strong>负责研发数据。判断系统类型时，主要看它管理的对象和解决的业务问题。

## 高频一：企业集成与数据协同

近几年更值得掌握的是系统之间如何共享数据、协同工作，而不是某个具体平台的组件名称。

- **数据集成**：解决不同系统之间的数据交换、转换和共享。
- **企业应用集成（EAI）**：把多个应用连接起来，支持跨系统协同。
- **事件驱动**：事件源发布消息，中间件或消息代理负责传递，订阅者接收并处理。
- **数据联邦**：数据仍由各系统分别维护，但可以提供统一访问和处理。

<details>
<summary>查看相关真题：2025 年 11 月 - 62 题、2024 年 11 月 - 56 题、2024 年 11 月 - 42 题、2024 年 11 月 - 38 题、2024 年 5 月 - 7 题、2014 年 11 月 - 14 题</summary>

<QuestionBank :questions="integrationQuestions" compact />

</details>

## 高频二：数据与智能

### 专家系统与机器学习

专家系统的核心是**知识库和推理机**。规则系统依靠规则匹配和推理得出结论；监督学习使用标注数据，半监督学习同时使用少量标注数据和大量未标注数据，自监督学习从数据本身构造学习信号。

<details>
<summary>查看相关真题：2026 年 5 月 - 12 题、2025 年 11 月 - 48 题、2025 年 11 月 - 47 题、2024 年 11 月 - 64 题</summary>

<QuestionBank :questions="intelligentQuestions" compact />

</details>

### 商业智能与数据资产

商业智能通常经历：数据预处理 → 数据仓库 → 联机分析或数据挖掘 → 数据展现。数据挖掘常见任务包括分类、聚类和关联规则。数据资产重点关注可增值、可共享、可控制和可量化。

<details>
<summary>查看相关真题：2022 年 11 月 - 16 题、2015 年 11 月 - 17 题</summary>

<QuestionBank :questions="dataQuestions" compact />

</details>

## 高频三：企业信息化

信息化是利用信息技术开发信息资源，并推动组织和运行方式变化的过程。企业信息化就是把信息技术用于生产、管理、决策和商务活动。

核心不是建设多少系统，而是**服务企业战略、改善业务流程、提升企业竞争力**。建设时还需要信息资源、信息产业、政策法规、标准规范、组织和人员共同配合。

<details>
<summary>查看相关真题：2021 年 11 月 - 13 题、2013 年 11 月 - 14 题</summary>

<QuestionBank :questions="enterpriseQuestions" compact />

</details>

## 高频四：ERP 与企业应用

ERP 重点理解为企业资源协同，通常涉及物流、资金流和信息流。物料、生产计划和能力需求计划属于企业资源管理中的具体应用内容。

<details>
<summary>查看相关真题：2025 年 5 月 - 18 题、2016 年 11 月 - 15 题、2014 年 11 月 - 13 题</summary>

<QuestionBank :questions="erpQuestions" compact />

</details>

## 高频五：信息化需求与规划

信息化需求通常分为**战略需求、运作需求和技术需求**。战略需求确定发展方向，运作需求落实到业务策略和人才培养，技术需求关注系统的完善、升级、集成和整合。

规划方法只需先抓住三种：

| 方法 | 核心思路 |
| --- | --- |
| CSF | 找出影响目标的关键成功因素 |
| SST | 把组织战略转化为信息系统战略 |
| BSP | 分析企业过程和数据，统一规划系统 |

<details>
<summary>查看相关真题：2024 年 11 月 - 60 题、2021 年 11 月 - 14 题、2019 年 11 月 - 15 题、2017 年 11 月 - 15 题、2017 年 11 月 - 14 题、2014 年 11 月 - 12 题</summary>

<QuestionBank :questions="planningQuestions" compact />

</details>

## 参考资料

- 《系统架构设计师教程（第 2 版）》第 2、3、12 章（本地教材）。
