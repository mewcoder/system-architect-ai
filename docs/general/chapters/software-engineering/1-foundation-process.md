<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/software.json'

const processQuestions = selectQuestions(questionBank.questions, [
  '202605-46',
  '202605-45',
  '202605-32',
  '202605-31',
  '202511-55',
  '202511-37',
  '202505-5',
  '202505-38',
  '202505-35',
  '202505-31',
  '202505-20',
  '202411-58',
  '202411-41',
  '202411-16',
  '202405-29',
  '202405-27',
  '202311-9',
  '202311-30',
  '202311-24',
  '202311-12',
  '202311-10',
  '202211-26',
  '202211-25',
  '202211-23',
  '202211-20',
  '202211-19',
  '202211-17',
  '202111-22',
  '202111-21',
  '202111-20',
  '202111-16',
  '202011-22',
  '202011-18',
  '202011-17',
  '201911-20',
  '201911-19',
  '201911-17',
  '201811-22',
  '201811-21',
  '201811-20',
  '201711-30',
  '201711-27',
  '201711-23',
  '201711-22',
  '201711-21',
  '201711-20',
  '201611-22',
  '201611-21',
  '201611-20',
  '201611-18',
  '201511-25',
  '201411-19',
  '201311-25',
  '201311-23',
])

const processTrend = summarizeQuestionBank(processQuestions)
</script>

# 软件工程基础与过程管理

软件工程基础题的主线是：先识别项目的<strong>需求、风险、反馈和交付方式</strong>，再判断适合的开发过程与管理模型。

## 1. 软件工程与软件过程

软件工程是把<strong>系统化、严格约束、可量化</strong>的方法应用于软件的开发、运行和维护，并研究这些方法。

软件过程可用 <strong>PDCA</strong> 记忆：

- <strong>P（规格说明）</strong>：明确系统要做什么；
- <strong>D（软件开发）</strong>：设计、实现软件；
- <strong>C（软件确认）</strong>：检查软件是否满足要求；
- <strong>A（软件演进）</strong>：根据环境和需求变化持续修改。

## 2. 生命周期模型与开发方法

判断过程模型时，重点看<strong>需求是否稳定、风险是否突出、反馈是否及时、是否分批交付</strong>：

- <strong>瀑布模型</strong>：阶段顺序清晰，适合需求稳定、变更较少的项目；
- <strong>原型模型</strong>：先做可运行样品澄清需求，分为抛弃型和演化型；
- <strong>螺旋模型</strong>：以<strong>风险分析</strong>为核心，每轮经历目标设定、风险分析、开发与验证、评审；
- <strong>V 模型</strong>：开发阶段与测试阶段相对应，强调测试尽早规划；
- <strong>增量模型</strong>：分批交付可运行的功能增量，便于持续获得反馈；
- <strong>喷泉模型</strong>：面向对象开发中允许各阶段迭代、重叠；
- <strong>变换模型</strong>：从形式化规格说明逐步变换为可执行程序。

开发方法还常按<strong>自顶向下/自底向上、形式化/非形式化、整体性/局部性</strong>分类。题目出现“风险驱动”优先考虑螺旋，出现“需求不清”优先考虑原型，出现“阶段对应测试”优先考虑 V 模型。

## 3. 敏捷、RUP 与过程管理

<strong>敏捷</strong>强调适应变化、快速反馈和频繁交付。敏捷宣言的四组价值是：<strong>个体和交互、可工作的软件、客户合作、响应变化</strong>，前者优先于后者。Scrum 重点记住三类角色：<strong>产品负责人、Scrum Master、开发团队</strong>；三个工件：<strong>Product Backlog、Sprint Backlog、Increment</strong>。

<strong>RUP</strong>是<strong>用例驱动、以体系结构为中心、迭代和增量</strong>的软件开发过程，采用二维生命周期。四个阶段依次为<strong>初始、细化、构造、移交</strong>，其中细化阶段重点处理高风险问题并建立基线架构。九个核心工作流为：业务建模、需求、分析与设计、实现、测试、部署、配置与变更管理、项目管理、环境。

<strong>CMM</strong>五级为：初始、可重复、已定义、已管理、优化；<strong>CMMI</strong>五级为：初始、已管理、已定义、量化管理、优化。开发工具题看它支持的活动；开发环境题看<strong>信息集成、过程集成和控制集成</strong>。

<strong>净室软件工程</strong>以函数理论和抽样理论为基础，强调正确性验证与统计测试；它是一种特殊的开发方法，不等同于普通的软件测试模型。

## 对应真题

本页覆盖 <strong>{{ processTrend.questionCount }} 道独立题</strong>、<strong>{{ processTrend.recordCount }} 条分值记录</strong>，题目分类已合并展示并隐藏右上角分类。

<QuestionBank :questions="processQuestions" compact hide-categories anchor-prefix="software-process" />
