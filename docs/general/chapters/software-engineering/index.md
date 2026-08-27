<script setup lang="ts">
import softwareBank from '../../../data/question-banks/software.json'
import analysisBank from '../../../data/question-banks/analysis.json'
import testingBank from '../../../data/question-banks/testing.json'
import reliabilityBank from '../../../data/question-banks/reliability.json'
import maintenanceBank from '../../../data/question-banks/maintenance.json'

const allQuestions = [
  ...softwareBank.questions,
  ...analysisBank.questions,
  ...testingBank.questions,
  ...reliabilityBank.questions,
  ...maintenanceBank.questions,
]

const examKeys = [...new Set(allQuestions.map((question) => question.exam))]
  .sort()
  .reverse()
const recentExamKeys = examKeys.slice(0, 6)
const recentQuestions = allQuestions.filter((question) => recentExamKeys.includes(question.exam))
</script>

# 软件工程考点总览

软件工程在综合知识中不是一个单一考点，而是围绕<strong>软件生命周期、工程过程和软件质量</strong>展开的一组知识。总览只负责回答三个问题：考什么、哪些重要、每个考点应该到哪里学习。

## 一、考点主线

```text
需求 → 分析建模 → 系统设计 → 构件复用 / 实现 → 测试 → 运行维护
```

这条线用于定位知识，不代表所有考点都是线性阶段：

- <strong>软件过程与过程管理</strong>横向贯穿开发全过程，解决“怎样组织开发”；
- <strong>软件可靠性</strong>横向贯穿设计、测试和运行，解决“能否稳定运行”；
- <strong>构件化与软件复用</strong>是实现系统的一种开发策略；
- <strong>软件运行与维护</strong>主要处理交付后的监控、维护和演化。

## 二、考点分布与重点

题库共覆盖<strong>{{ allQuestions.length }} 分</strong>；近 6 场考试（{{ recentExamKeys.join('、') }}）共<strong>{{ recentQuestions.length }} 分</strong>。

| 知识块 | 历年分值 | 近 6 场分值 |
| --- | ---: | ---: |
| [1. 软件工程基础与过程管理](./1-foundation-process) | 68 分 | 21 分 |
| [2. 需求工程与分析建模](./2-requirements-analysis) | 50 分 | 18 分 |
| [3. 系统设计与设计模式](./3-design-patterns) | 66 分 | 16 分 |
| [4. 构件化与软件复用](./4-components-reuse) | 41 分 | 15 分 |
| [5. 软件测试](./5-testing) | 50 分 | 29 分 |
| [6. 软件可靠性](./6-reliability) | 12 分 | 9 分 |
| [7. 软件运行与维护](./7-maintenance) | 32 分 | 3 分 |

## 三、复习优先级

按近 6 场题量，优先顺序大致是：<strong>软件测试 → 基础与过程管理 → 需求工程与分析建模、系统设计与设计模式 → 构件化与软件复用 → 软件可靠性 → 软件运行与维护</strong>。

具体复习时分三层：

- <strong>第一层：先拿稳定分</strong>。完成第 1、2、3、5 页，建立开发模型、需求分析、系统设计和测试的主干。
- <strong>第二层：补高频专题</strong>。学习第 4 页的构件接口、失配和组装，再学习第 6 页的可靠性指标与计算。
- <strong>第三层：做低频保底</strong>。学习第 7 页的维护分类、系统转换、遗留系统和逆向工程，重点防止概念混淆。

## 四、做题时先定位问题

看到题目先问它在回答哪一个问题：

| 题干关注点 | 进入的知识块 |
| --- | --- |
| 需求是否稳定、风险是否突出、如何迭代交付 | 软件工程基础与过程管理 |
| 系统需要做什么、如何描述数据和对象 | 需求工程与分析建模 |
| 模块如何划分、类如何协作、模式解决什么问题 | 系统设计与设计模式 |
| 现有构件能否使用、接口如何适配和组装 | 构件化与软件复用 |
| 用什么方法发现问题、测试处于什么阶段 | 软件测试 |
| 可靠性如何度量、如何容错和计算 | 软件可靠性 |
| 系统上线后如何监控、维护和改造 | 软件运行与维护 |

系统架构设计已经单独成组，项目管理放在“其他专题”，本组不重复展开。
