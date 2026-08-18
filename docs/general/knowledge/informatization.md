<script setup lang="ts">
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/informatization.json'

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

const integrationQuestions = questionsFor([
  '202511-62', '202511-30', '202411-56', '202411-42', '202411-38',
  '202405-7', '201411-14', '201311-15'
])
const analysisQuestions = questionsFor([
  '202605-12', '202511-48', '202511-47', '202411-64',
  '202211-16', '201511-17', '201411-15', '201311-16'
])
const enterpriseQuestions = questionsFor([
  '202505-18', '202111-13', '202111-12', '201411-13', '201311-14', '201511-14'
])
const eGovernmentQuestions = questionsFor([
  '202011-15', '201611-14', '201511-15', '201311-13'
])
const planningQuestions = questionsFor([
  '202411-60', '202111-14', '201911-15', '201711-15', '201711-14', '201411-12'
])
</script>

# 信息化

信息化可以按一条主线理解：<strong>信息系统</strong>负责处理业务，<strong>系统集成</strong>负责打通系统，<strong>数据分析与智能</strong>负责利用数据，<strong>企业信息化</strong>负责把这些能力落到组织和业务中。

## 1. 信息系统

判断一个系统属于哪一类，先看它管理的对象和解决的业务问题。

| 类型 | 中文名称 | 英文名称 | 说明 |
| --- | --- | --- | --- |
| TPS/DPS | 事务处理系统/数据处理系统 | Transaction Processing System / Data Processing System | 记录和处理订单、库存、收付款等日常业务，为其他系统提供基础数据。 |
| MIS | 管理信息系统 | Management Information System | 汇总、加工业务数据，形成报表和管理信息，帮助管理人员掌握运行情况。 |
| DSS | 决策支持系统 | Decision Support System | 利用数据、模型和分析结果进行预测、比较和评价，辅助管理者决策。 |
| ES | 专家系统 | Expert System | 用知识库保存领域知识，由推理机根据规则分析问题并给出结论。 |
| OAS | 办公自动化系统 | Office Automation System | 支持公文、文档、邮件、会议和流程协同等日常办公活动。 |
| ERP | 企业资源计划 | Enterprise Resource Planning | 集成管理财务、采购、生产、销售、库存等企业资源和业务流程。 |

企业中还常见：<strong>WMS</strong>管理仓储，<strong>MES</strong>管理生产现场，<strong>PDM</strong>管理产品研发数据。不要只看系统是否使用了数据，关键要看它管理什么、服务谁、解决什么问题。

## 2. 系统集成

多个系统需要协同，通常要解决三类问题：

- <strong>数据集成</strong>：解决数据交换、格式转换、共享和一致性问题。
- <strong>应用集成</strong>：让不同应用通过接口、中间件或服务互相调用。
- <strong>业务集成</strong>：把分散在不同系统中的业务环节串成完整流程。

题目中的集成层次名称可能不同，但基本都是从网络或技术基础开始，逐步上升到数据、应用和业务流程。<strong>EAI</strong>主要解决企业内部应用之间的协同；<strong>EDI</strong>则通过标准化电子报文支持企业之间进行业务数据交换。

数据集成常见方式可以这样区分：

- <strong>数据仓库</strong>：通过 ETL 把数据集中保存，适合统一分析。
- <strong>数据联邦</strong>：不集中搬运数据，提供统一视图，由各系统继续维护自己的数据。
- <strong>数据复制</strong>：把数据复制到其他节点并保持同步，常用于备份、容灾或分布式访问。
- <strong>接口集成</strong>：通过 API 或适配器按业务需要交换数据。

事件驱动架构中，事件源发布消息，中间件或消息代理负责传递，订阅者按需接收。因此模块之间<strong>不直接依赖彼此的执行过程</strong>，更容易独立扩展。

<details>
<summary>相关真题：2025 年 11 月 - 62 题、2025 年 11 月 - 30 题、2024 年 11 月 - 56 题、2024 年 11 月 - 42 题、2024 年 11 月 - 38 题、2024 年 5 月 - 7 题、2014 年 11 月 - 14 题、2013 年 11 月 - 15 题</summary>

<QuestionBank :questions="integrationQuestions" compact />

</details>

## 3. 数据与智能

- <strong>商业智能（BI）</strong>：先通过 ETL 处理业务数据，放入数据仓库，再用 OLAP 和数据挖掘进行分析，最后以报表或可视化方式呈现结果。OLTP 面向日常事务处理，不属于 BI 的分析环节。
- <strong>数据挖掘</strong>：分类是根据已有类别判断新对象，聚类是按相似性自动分组，关联规则是发现不同事物之间经常同时出现的关系。
- <strong>数据资产</strong>：重点记住<strong>可增值、可共享、可控制、可量化</strong>，可测试、可维护不是它的核心固有特征。
- <strong>专家系统</strong>：它是典型的规则系统，核心是知识库和推理机；知识库存知识，推理机根据事实和规则推导结论。
- <strong>机器学习</strong>：监督学习使用标注数据，半监督学习同时使用少量标注和大量未标注数据，自监督学习从数据本身构造学习信号。

<details>
<summary>相关真题：2026 年 5 月 - 12 题、2025 年 11 月 - 48 题、2025 年 11 月 - 47 题、2024 年 11 月 - 64 题、2022 年 11 月 - 16 题、2015 年 11 月 - 17 题、2014 年 11 月 - 15 题、2013 年 11 月 - 16 题</summary>

<QuestionBank :questions="analysisQuestions" compact />

</details>

## 4. 企业信息化

企业信息化不是简单购买或部署系统，而是围绕企业战略调整业务流程、管理方式和信息资源。其发展通常从局部应用开始，逐步扩展到业务单元、生产流程、产业网络，最后形成客户、供应链和合作伙伴共同参与的生态协同。题目中的阶段名称不必孤立死记，重点看信息化覆盖范围和协同程度逐步扩大。

建设时可以抓住几个关键词：

- <strong>信息资源</strong>：开发、利用和治理数据及信息。
- <strong>信息产业</strong>：提供软硬件、平台和信息服务等技术支撑。
- <strong>制度保障</strong>：政策法规和标准规范，保证信息化建设有序推进。
- <strong>业务应用</strong>：ERP 管理企业资源，CRM 面向客户，SCM 面向供应链。
- <strong>企业协同</strong>：ERP 常考的“三流”是<strong>物流、资金流、信息流</strong>，重点是让企业内部资源和业务流程协同起来。供应链中，需求信息通常由下游向上游传递，供应信息通常由上游向下游反馈。

ERP 的计划包括五个层次，按经营目标逐级细化为：经营计划 → 生产计划大纲 → 主生产计划 → 物料需求计划 → 能力需求计划。车间作业计划属于执行层，负责把生产任务下达到具体车间。

信息化需求分为<strong>战略需求、运作需求、技术需求</strong>：战略需求明确方向，运作需求落实业务，技术需求提供系统和平台支撑。信息化规划从企业战略规划出发，形成企业管理模式和战略数据模型；信息系统架构还需要结合业务运作模型。CSF 通过“目标 → 关键成功因素 → 关键信息集合”确定建设重点，并帮助确定系统开发优先次序；<strong>SST</strong>把组织战略转化为信息系统战略，<strong>BSP</strong>从企业过程和数据出发进行总体规划。

电子政务的基本主体是政府、企事业单位和居民。常见互动方向包括 G2G、G2B、G2C、B2G 和 C2G，分别表示政府之间、政府对企业、政府对居民、企业对政府和居民对政府。判断时主要看互动双方和方向，不必扩展记忆所有应用清单。

<details>
<summary>企业信息化相关真题：2025 年 5 月 - 18 题、2021 年 11 月 - 13 题、2021 年 11 月 - 12 题、2014 年 11 月 - 13 题、2013 年 11 月 - 14 题、2015 年 11 月 - 14 题</summary>

<QuestionBank :questions="enterpriseQuestions" compact />

</details>

<details>
<summary>电子政务相关真题：2020 年 11 月 - 15 题、2016 年 11 月 - 14 题、2015 年 11 月 - 15 题、2013 年 11 月 - 13 题</summary>

<QuestionBank :questions="eGovernmentQuestions" compact />

</details>

<details>
<summary>需求与规划相关真题：2024 年 11 月 - 60 题、2021 年 11 月 - 14 题、2019 年 11 月 - 15 题、2017 年 11 月 - 15 题、2017 年 11 月 - 14 题、2014 年 11 月 - 12 题</summary>

<QuestionBank :questions="planningQuestions" compact />

</details>

## 参考资料

- 《系统架构设计师教程（第 2 版）》第 2、3、12 章（本地教材）。
