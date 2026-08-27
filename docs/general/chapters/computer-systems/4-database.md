<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../../data/question-banks/database.json'

function questionId(question: (typeof questionBank.questions)[number]) {
  return `${question.exam}-${question.question_no}`
}

function questionsFor(ids: string[]) {
  const selected = new Set(ids)
  return questionBank.questions.filter((question) => selected.has(questionId(question)))
}

function questionCount(list: typeof questionBank.questions) {
  return new Set(list.map(questionId)).size
}

function recordCount(list: typeof questionBank.questions) {
  return list.length
}

const basicsQuestions = questionsFor([
  '202505-26', '202411-67', '202311-16', '202211-5',
])
const relationQuestions = questionsFor([
  '202605-21', '202511-3', '202511-4', '202411-31', '202411-30',
  '202405-11', '202211-8', '202311-5', '201811-5', '201811-4',
  '201711-8', '201611-7', '201511-5', '201411-4',
])
const designQuestions = questionsFor([
  '202605-22', '202605-19', '202605-18', '202511-38',
  '202111-6', '202405-34', '202011-5', '201311-4',
])
const theoryQuestions = questionsFor([
  '202605-20', '202505-52', '202411-32', '202405-33',
  '202311-3', '202211-7', '202011-6', '201911-6',
  '201711-7', '201611-8', '201411-3', '201311-3',
])
const managementQuestions = questionsFor([
  '202405-10', '202211-6', '201611-9', '202411-14', '201911-5',
])
const specialQuestions = questionsFor([
  '202111-8', '202011-7', '201911-7', '201811-6',
  '201711-9', '201511-4', '201411-7',
])

const totalQuestions = questionCount(questionBank.questions)
const totalRecords = recordCount(questionBank.questions)
const examStats = [...new Set(questionBank.questions.map((question) => question.exam))]
  .sort()
  .reverse()
  .map((exam) => ({
    exam,
    label: `${exam.slice(0, 4)} 年 ${Number(exam.slice(4))} 月`,
    count: questionCount(questionBank.questions.filter((question) => question.exam === exam)),
  }))
const examMax = Math.max(...examStats.map((batch) => batch.count), 1)
const recentExamStats = examStats.slice(0, 4)
const recentMin = Math.min(...recentExamStats.map((batch) => batch.count))
const recentMax = Math.max(...recentExamStats.map((batch) => batch.count))
</script>

# 数据库系统

> <strong>题库概况：</strong>数据库题库共<strong>{{ totalQuestions }} 道独立题、{{ totalRecords }} 条分值记录</strong>。近 4 场考试每场有 {{ recentMin }}～{{ recentMax }} 道独立题，关系模型、关系代数、数据库设计和范式是持续出现的主线；特殊数据库和事务管理相对零散。

数据库题目按教材的知识层次组织为五个一级章节：

```text
数据库基础 → 关系数据库 → 数据库设计 → 数据库应用与管理 → 新型数据库
```

不要按题号孤立记忆。关系数据库内部再按“关系模型、关系运算、关系数据库理论”展开；E-R 模型属于数据库设计，不和关系数据库理论并列。

## 1. 数据库基础

数据库系统可以先分成数据、数据库管理系统、应用程序和用户几个部分。考试更常直接考<strong>三级模式结构</strong>：

| 模式 | 解决的问题 | 关键词 |
| --- | --- | --- |
| 外模式 | 用户或应用看到什么 | 用户视图、局部数据 |
| 概念模式 | 整个数据库的逻辑结构是什么 | 全局结构、数据联系、完整性和安全性 |
| 内模式 | 数据在存储介质上如何组织 | 物理存储、存取方式、索引 |

三级模式通过外模式—概念模式映射和概念模式—内模式映射，实现<strong>逻辑数据独立性</strong>和<strong>物理数据独立性</strong>。题目出现“用户看到的数据视图”选外模式，出现“数据库整体逻辑结构”选概念模式，出现“物理存储和存取方式”选内模式。

聚簇索引改变的是数据在物理层面的组织方式，属于内模式相关内容；不要把它和外模式的用户视图混淆。

### 相关真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(basicsQuestions) }} 道题 / {{ recordCount(basicsQuestions) }} 条记录</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="basicsQuestions" anchor-prefix="database" compact hide-categories />
</div>
</details>

## 2. 关系数据库

### 2.1 关系模型与完整性约束

关系模型把数据组织成关系，也就是通常所说的表。表中的一行是<strong>元组</strong>，一列是<strong>属性</strong>，属性的取值范围构成<strong>域</strong>。

关系模型还要配合完整性约束：<strong>域完整性</strong>限制属性取值范围，<strong>实体完整性</strong>保证主键有效，<strong>参照完整性</strong>保证外键引用存在且一致。

### 2.2 关系代数与 SQL

关系代数的运算对象和运算结果都是关系。

| 运算 | 作用 | 记忆方式 |
| --- | --- | --- |
| 选择 `σ` | 筛选满足条件的行 | 横向筛行，对应 SQL 的 `WHERE` |
| 投影 `π` | 选取需要的列 | 纵向取列 |
| 笛卡尔积 `R × S` | 两个关系的元组两两组合 | 元组数为 `m × n`，属性数相加 |
| 自然连接 `R ⋈ S` | 按同名属性等值匹配 | 公共属性只保留一份 |
| 并、交、差 | 进行集合运算 | 参与运算的关系通常需要并相容 |

表达式等价题要先看运算含义，再看运算顺序；查询优化题则优先完成选择、减少中间结果，再进行连接。

例题：

> 给定关系模式 `R(A，C，D，E)`、`S(C，D，E)`，经过自然连接后的属性列数为多少？

两个关系的公共属性是 `C、D、E`。自然连接后公共列只保留一份，所以结果属性为 `A、C、D、E`，共 `4` 列。这个题型在 2014、2015、2016、2024 等多次出现；遇到自然连接，先数公共属性，再用“两个关系属性总数 − 公共属性数”计算结果列数。

SQL 要和关系代数对应起来：`SELECT` 选择输出列，`WHERE` 过滤行，`GROUP BY` 分组，`HAVING` 过滤分组。看到“分组之后再筛选”时选 `HAVING`，不要和 `WHERE` 混淆。

### 相关真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(relationQuestions) }} 道题 / {{ recordCount(relationQuestions) }} 条记录</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="relationQuestions" anchor-prefix="database" compact hide-categories />
</div>
</details>

### 2.3 函数依赖、候选键与规范化

这部分是数据库计算题最集中的地方，统一用<strong>属性闭包</strong>解决：从给定属性集合出发，反复应用函数依赖，把能够推出的属性加入集合，直到不能继续扩展。

```text
闭包覆盖全部属性 → 超键
闭包覆盖全部属性，且删除任一属性后都不能覆盖 → 候选键
```

例题：

> 给出关系模式 `R(a，b，c，d)` 和函数依赖 `a → cd、c → b`，求候选键。

从 `a` 出发，先由 `a → cd` 得到 `c、d`，再由 `c → b` 得到 `b`，所以：

```text
a+ = {a，b，c，d} = R 的全部属性
```

因此 `a` 是超键；`a` 本身已经是单个属性，不能再删减，所以 `a` 是候选键。候选键题不要只看函数依赖左边出现了什么，最终要用闭包验证是否覆盖全部属性。

范式按依赖关系判断：

| 范式 | 核心要求 |
| --- | --- |
| 1NF | 属性值不可再分，保持原子性 |
| 2NF | 在 1NF 基础上消除非主属性对候选键的部分依赖 |
| 3NF | 在 2NF 基础上消除非主属性对候选键的传递依赖 |
| BCNF | 每个非平凡函数依赖的决定因素都是候选键 |

2017 年 11 月第 7 题把候选键和范式放在一起考：先求出候选键，再检查是否存在非主属性只依赖候选键的一部分。关系分解题还要继续判断<strong>无损连接</strong>和<strong>依赖保持</strong>，不能只看分解后表的数量。

Armstrong 公理常考自反、增广、传递，以及由它们推导出的合并和分解规则。看到“函数依赖是否被蕴涵”，就围绕属性闭包和公理规则判断。

### 相关真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(theoryQuestions) }} 道题 / {{ recordCount(theoryQuestions) }} 条记录</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="theoryQuestions" anchor-prefix="database" compact hide-categories />
</div>
</details>

## 3. 数据库设计

数据库设计通常按以下过程展开：

```text
需求分析 → 概念设计 → 逻辑设计 → 物理设计
```

需求分析明确业务需求；概念设计使用 E-R 模型抽象实体、属性和联系；逻辑设计把概念模型转换为关系模型；物理设计确定存储结构、索引和访问路径。题目问“产生关系模型的阶段”，选<strong>逻辑设计</strong>。

E-R 模型重点看三类对象：实体、属性和联系。联系两端的基数约束要分别判断最小值和最大值，例如 `1..1`、`0..N`。实体转换为关系表，实体属性转换为字段；一对多联系通常把“一”端主键放入“多”端作为外键，多对多联系通常建立单独的联系表。

E-R 图集成时主要注意三类冲突：同一名称含义不同或不同名称含义相同的<strong>命名冲突</strong>，属性域或取值范围不同的<strong>属性冲突</strong>，以及同一对象被抽象成不同结构的<strong>结构冲突</strong>。处理时先统一语义，再决定合并、改名或调整结构。

### 相关真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(designQuestions) }} 道题 / {{ recordCount(designQuestions) }} 条记录</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="designQuestions" anchor-prefix="database" compact hide-categories />
</div>
</details>

## 4. 数据库应用与管理

数据库应用程序常通过库函数、嵌入式 SQL、通用数据接口（如 ODBC/JDBC）或 ORM 访问数据库。这部分属于补充考点，先记住它们都是应用程序与数据库之间的访问方式。

事务是不可分割的逻辑工作单位，具有 ACID 特性：原子性、一致性、隔离性和持久性。“并发性”是数据库系统的特征，不是事务本身的 ACID 特性。

数据库转储要同时看两个维度：是否允许事务运行，以及转储全部数据库还是部分数据。若转储时有事务正在运行，又要求转储全部数据库，应选择<strong>动态全局转储</strong>。存储过程则是封装数据库操作、减少外部程序直接接触底层关系模式的一种方式。

### 相关真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(managementQuestions) }} 道题 / {{ recordCount(managementQuestions) }} 条记录</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="managementQuestions" anchor-prefix="database" compact hide-categories />
</div>
</details>

## 5. 新型数据库

这部分题型比较分散，以关键词判断为主，不单独展开低频例题：

| 类型 | 重点关键词 |
| --- | --- |
| NoSQL 数据库 | 非关系模型、灵活 schema、高并发和水平扩展 |
| 分布式数据库 | 分片透明、复制透明、位置透明、逻辑透明、全局概念模式 |
| 两阶段提交 | 准备/表决阶段、提交阶段、协调者和参与者 |
| 嵌入式数据库 | 资源受限、轻量、可裁剪、本地数据管理 |
| 网络数据库 | 客户端、通信协议、远程服务器 |
| 数据仓库 | 面向主题、集成、相对稳定、随时间变化 |

分布式数据库的透明性，核心是判断用户是否需要知道数据的分片方式、复制情况、物理位置或局部数据模型；两阶段提交则记住先准备/表决，再统一提交或回滚。

### 相关真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount(specialQuestions) }} 道题 / {{ recordCount(specialQuestions) }} 条记录</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="specialQuestions" anchor-prefix="database" compact hide-categories />
</div>
</details>

## 题量小结

| 小节 | 独立题 | 分值记录 |
| --- | ---: | ---: |
| 1. 数据库基础 | {{ questionCount(basicsQuestions) }} | {{ recordCount(basicsQuestions) }} |
| 2. 关系数据库 | {{ questionCount(relationQuestions) + questionCount(theoryQuestions) }} | {{ recordCount(relationQuestions) + recordCount(theoryQuestions) }} |
| 3. 数据库设计 | {{ questionCount(designQuestions) }} | {{ recordCount(designQuestions) }} |
| 4. 数据库应用与管理 | {{ questionCount(managementQuestions) }} | {{ recordCount(managementQuestions) }} |
| 5. 新型数据库 | {{ questionCount(specialQuestions) }} | {{ recordCount(specialQuestions) }} |
| **合计** | **{{ totalQuestions }}** | **{{ totalRecords }}** |

## 历年题量

<div class="chapter-question-bank-chart">
  <div
    v-for="batch in examStats"
    :key="batch.exam"
    class="question-bank-chart-row"
  >
    <span class="question-bank-chart-label">{{ batch.label }}</span>
    <span class="question-bank-chart-track">
      <span
        class="question-bank-chart-bar"
        :style="{ width: `${(batch.count / examMax) * 100}%` }"
      ></span>
    </span>
    <strong>{{ batch.count }}</strong>
  </div>
</div>
