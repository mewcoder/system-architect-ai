<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/reliability.json'

const reliabilityQuestions = selectQuestions(questionBank.questions, [
  '202605-64',
  '202605-57',
  '202605-34',
  '202511-22',
  '202511-20',
  '202511-19',
  '202411-51',
  '202411-13',
  '202405-15',
  '202211-50',
  '202211-15',
])

const reliabilityTrend = summarizeQuestionBank(reliabilityQuestions)
</script>

# 软件可靠性

软件可靠性题围绕三条线展开：<strong>可靠性定义与指标、可靠性设计与测试、可靠性计算与模型</strong>。

## 1. 概念与指标

软件可靠性是软件在<strong>规定条件、规定时间</strong>内<strong>完成规定功能</strong>的能力。可靠度 <strong>R(t) = 1 − F(t)</strong>，其中 F(t) 是失效分布函数。

常用指标按时间区间辨析：

- <strong>MTTF</strong>：从开始运行到首次失效的平均时间；
- <strong>MTBF</strong>：两次相邻故障之间的平均运行时间；
- <strong>MTTR</strong>：故障后修复或恢复的平均时间；
- <strong>MTTA</strong>：从告警到确认的平均时间；
- <strong>MTTD</strong>：从故障发生到被检测的平均时间。

失效率是单位时间内发生失效的速率，不是被限制在 0 到 1 之间的概率。题目给出失效率和运行时间时，<strong>期望失效次数 ≈ 失效率 × 运行时间</strong>。可用性还要结合修复能力，不能与可靠性完全等同。

## 2. 可靠性设计、管理与测试

可靠性设计常用<strong>容错、检错、降低复杂度、冗余和合理系统配置</strong>。关闭一台机器后观察服务是否继续，考查的是<strong>容错/故障转移能力</strong>。

可靠性管理从需求阶段就开始：先确定可靠性目标和验收标准，再定义运行剖面、设计测试用例、执行测试、收集数据并评价。可靠性测试的重点是<strong>模拟规定操作剖面并评价可靠性</strong>，不等同于普通缺陷测试。

<strong>N 版本程序设计</strong>通过多个相异版本和表决机制降低共模故障风险，常考新增阶段：<strong>相异成分规范评审、相异性确认、背对背测试</strong>。

## 3. 计算与系统模型

McCabe 环形复杂度：

- <strong>V(G) = E − N + 2</strong>；
- 或 <strong>V(G) = P + 1</strong>。

其中 E 为边数，N 为结点数，P 为判定结点数。复杂度越高，独立路径越多，测试与维护难度通常越大。

系统可靠性计算：

- <strong>串联系统</strong>：整体可靠性为各构件可靠性的乘积；
- <strong>并联系统</strong>：整体可靠性为 1 减去所有构件同时失效的概率。

## 对应真题

本页覆盖 <strong>{{ reliabilityTrend.questionCount }} 道独立题</strong>、<strong>{{ reliabilityTrend.recordCount }} 条分值记录</strong>，题目分类已合并展示并隐藏右上角分类。

<QuestionBank :questions="reliabilityQuestions" compact hide-categories anchor-prefix="software-reliability" />
