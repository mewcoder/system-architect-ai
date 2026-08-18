<script setup lang="ts">
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/database.json'

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

const basicsQuestions = questionsFor([
  '202505-26', '202411-67', '202311-16', '202211-5'
])
const relationQuestions = questionsFor([
  '202605-21', '202511-3', '202511-4', '202411-31', '202411-30',
  '202405-11', '202211-8', '202311-5', '201811-5', '201811-4',
  '201711-8', '201611-7', '201511-5', '201411-4'
])
const designQuestions = questionsFor([
  '202605-22', '202605-19', '202605-18', '202511-38',
  '202111-6', '202405-34', '202011-5', '201311-4'
])
const theoryQuestions = questionsFor([
  '202605-20', '202505-52', '202411-32', '202405-33',
  '202311-3', '202211-7', '202011-6', '201911-6',
  '201711-7', '201611-8', '201411-3', '201311-3'
])
const managementQuestions = questionsFor([
  '202405-10', '202211-6', '201611-9', '202411-14', '201911-5'
])
const specialQuestions = questionsFor([
  '202111-8', '202011-7', '201911-7', '201811-6',
  '201711-9', '201511-4', '201411-7'
])
</script>

# 数据库系统

本页按数据库 JSON 中的真题分布建立知识结构。一级章节采用宽口径标题，具体考点放在章节内部；同一道题的多个分值记录仍按原题保留。

## 1. 数据库基础

先建立数据库系统的整体框架：数据库系统由数据、数据库管理系统、应用和用户共同构成。复习本章先抓住三级模式及其职责：

| 层次 | 关注点 |
| --- | --- |
| 外模式 | 特定用户或应用看到的数据视图 |
| 概念模式 | 数据库整体的逻辑结构、联系和约束 |
| 内模式 | 数据的物理存储与组织方式 |

题目出现“用户看到”“全局逻辑结构”“物理存储”“聚簇索引”等关键词时，先判断它对应的模式层次。

<details>
<summary>相关真题：4 题</summary>

<QuestionBank :questions="basicsQuestions" compact />

</details>

## 2. 关系数据库

关系数据库部分重点掌握关系、元组、属性以及关系操作。选择、投影、连接、笛卡尔积和集合运算既可能以关系代数形式出现，也可能要求转换成 SQL。

| 方向 | 重点 |
| --- | --- |
| 关系操作 | 选择、投影、连接、并、交、差 |
| 连接计算 | 公共属性、结果列数、结果元组数 |
| SQL | SELECT、连接条件、GROUP BY、HAVING |
| 查询处理 | 表达式等价转换、选择下推、减少中间结果 |

做题时要先确认运算顺序，再判断结果的元组数、属性列数和 SQL 条件；`WHERE` 与 `HAVING` 的作用阶段不要混淆。

<details>
<summary>相关真题：14 题</summary>

<QuestionBank :questions="relationQuestions" compact />

</details>

## 3. 数据库设计

数据库设计按需求分析、概念设计、逻辑设计和物理设计展开。E-R 模型负责表达实体、属性和联系，转换为关系模型时要关注主键、外键和联系基数。

| 阶段 | 主要产物或任务 |
| --- | --- |
| 需求分析 | 明确业务、数据和性能需求 |
| 概念设计 | 用 E-R 模型抽象实体、属性和联系 |
| 逻辑设计 | 将概念模型转换为关系模式 |
| 物理设计 | 确定存储、索引和访问路径 |

E-R 图集成常见属性、命名和结构冲突；实体联系转换为关系表后，表之间通常通过主键和外键建立联系。反规范化通常是为了实际访问性能，在设计阶段结合业务和系统约束判断。

<details>
<summary>相关真题：8 题</summary>

<QuestionBank :questions="designQuestions" compact />

</details>

## 4. 数据库理论

本章集中处理函数依赖、候选键和规范化，是数据库计算题最集中的部分。

| 概念 | 判断方法 |
| --- | --- |
| 属性闭包 | 从给定属性集出发，反复应用函数依赖，直到不能继续扩展 |
| 超键 | 闭包覆盖关系的全部属性 |
| 候选键 | 能唯一标识元组且不含冗余属性的最小属性集 |
| Armstrong 公理 | 自反、增广、传递及其推导规则 |
| 规范化 | 依次判断部分依赖、传递依赖和更高范式约束 |

范式题先求候选键，再判断非主属性对候选键的依赖关系。关系分解还要继续判断无损连接和依赖保持，不能只看分解后的属性数量。

<details>
<summary>相关真题：12 题</summary>

<QuestionBank :questions="theoryQuestions" compact />

</details>

## 5. 数据库管理

数据库管理部分把完整性、事务和备份恢复放在一起掌握：

- 域完整性限制属性取值范围；实体完整性保证主键等标识的有效性；参照完整性维护表之间的引用关系。
- 事务是不可分割的逻辑工作单位，重点识别原子性、一致性、隔离性和持久性。
- 动态转储允许转储期间存在事务活动，静态转储要求转储期间暂停相关事务；题干要结合业务是否运行判断。
- 存储过程可以封装数据更新操作，减少第三方直接接触底层关系模式的需要。

<details>
<summary>相关真题：5 题</summary>

<QuestionBank :questions="managementQuestions" compact />

</details>

## 6. 特殊数据库

特殊数据库题主要考察不同数据库形态的目标和透明性：

| 类型 | 高频关键词 |
| --- | --- |
| 分布式数据库 | 分片透明、复制透明、位置透明、逻辑透明、全局概念模式 |
| 两阶段提交 | 准备/表决阶段、提交阶段、协调者和参与者 |
| 嵌入式数据库 | 资源受限、轻量、本地数据管理 |
| 网络数据库 | 客户端、通信协议、远程服务器 |
| 数据仓库 | 面向主题、集成、相对稳定、随时间变化 |

做分布式数据库题时，先抓题干是在问“数据放在哪里”“如何分片复制”还是“用户是否需要知道底层实现”。

<details>
<summary>相关真题：7 题</summary>

<QuestionBank :questions="specialQuestions" compact />

</details>

## 题量小结

| 章节 | 真题题数 | 分值记录 |
| --- | ---: | ---: |
| 数据库基础 | 4 | 5 |
| 关系数据库 | 14 | 17 |
| 数据库设计 | 8 | 9 |
| 数据库理论 | 12 | 18 |
| 数据库管理 | 5 | 5 |
| 特殊数据库 | 7 | 7 |
| **合计** | **50** | **61** |
