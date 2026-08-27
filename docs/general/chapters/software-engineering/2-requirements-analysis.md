<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import softwareBank from '../../../data/question-banks/software.json'
import analysisBank from '../../../data/question-banks/analysis.json'

const allQuestions = [...softwareBank.questions, ...analysisBank.questions]
const requirementsQuestions = selectQuestions(allQuestions, [
  '202605-35',
  '202605-29',
  '202511-34',
  '202505-62',
  '202505-48',
  '202505-47',
  '202505-30',
  '202505-28',
  '202505-2',
  '202411-68',
  '202411-43',
  '202411-36',
  '202405-39',
  '202405-3',
  '202311-8',
  '202311-23',
  '202211-30',
  '202211-28',
  '202211-27',
  '202211-22',
  '202211-21',
  '202111-25',
  '202111-19',
  '202111-18',
  '202011-16',
  '201911-18',
  '201811-18',
  '201711-25',
  '201711-18',
  '201611-23',
  '201611-19',
  '201511-23',
  '201511-20',
  '201411-29',
  '201411-24',
  '201411-20',
  '201411-18',
  '201411-17',
  '201411-16',
])

const requirementsTrend = summarizeQuestionBank(requirementsQuestions)
</script>

# 需求工程与分析建模

需求工程回答<strong>系统做什么，以及要做到什么程度</strong>；分析建模把这些要求转换为可讨论、可验证的结构和行为模型。

## 1. 需求工程

需求工程包括<strong>需求获取、分析、定义、验证、管理、变更和跟踪</strong>。需求质量重点看<strong>正确、完整、一致、可行、可验证、可追踪</strong>。

需求管理抓住三件事：

- <strong>基线</strong>：形成经过确认的需求版本；
- <strong>变更控制</strong>：提出变更后评估影响、审批并更新相关工件；
- <strong>双向跟踪</strong>：把需求与来源、设计、实现、测试结果相互关联。

## 2. 结构化分析

结构化分析采用<strong>自顶向下、逐层分解</strong>。数据流图（DFD）的四类基本元素是：

- <strong>外部实体</strong>：系统外部的数据来源或去向；
- <strong>数据流</strong>：数据在实体、处理和存储之间的流动；
- <strong>数据存储</strong>：保存数据的地方；
- <strong>处理</strong>：对输入数据进行变换并产生输出。

分层 DFD 要保持<strong>父图与子图的数据流平衡</strong>，数据字典用于解释数据流、数据项、数据存储和加工。遇到复杂条件与动作关系时，结合<strong>判定表、判定树</strong>检查逻辑是否完整。

## 3. 面向对象分析与 UML

面向对象分析从<strong>问题域</strong>识别对象、类、职责、关系和协作。用例图描述参与者与系统功能边界，用例关系重点辨析：

- <strong>包含（include）</strong>：基础用例必然调用被包含用例；
- <strong>扩展（extend）</strong>：在特定条件下向基础用例增加行为；
- <strong>泛化</strong>：子用例或参与者继承父用例或参与者的共性。

UML 图按题目关注点快速定位：

- <strong>类图</strong>：静态结构、类及其关系；
- <strong>顺序图</strong>：对象之间按时间顺序的交互；
- <strong>活动图</strong>：业务流程、控制流和并发；
- <strong>状态图</strong>：对象状态及状态转移；
- <strong>构件图</strong>：软件构件及其依赖；
- <strong>部署图</strong>：软件构件与物理节点的部署关系。

领域驱动设计（DDD）以<strong>领域模型和业务规则</strong>为核心；SysML 的需求图用于表达需求及其关系。人机界面设计保留三条原则：<strong>让用户拥有控制权、减少用户记忆负担、保持界面一致性</strong>。

## 对应真题

本页覆盖 <strong>{{ requirementsTrend.questionCount }} 道独立题</strong>、<strong>{{ requirementsTrend.recordCount }} 条分值记录</strong>，题目分类已合并展示并隐藏右上角分类。

<QuestionBank :questions="requirementsQuestions" compact hide-categories anchor-prefix="software-requirements" />
