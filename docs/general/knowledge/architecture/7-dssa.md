<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/architecture.json'

const dssaQuestions = selectQuestions(questionBank.questions, [
  '201311-31',
  '201411-32',
  '201511-39',
  '201611-32',
  '201811-32',
  '202111-34',
  '202211-45',
  '202311-29',
  '202311-42',
  '202405-26',
  '202411-66',
  '202511-8',
  '202605-67',
  '202605-68',
])
</script>

# 特定领域软件架构（DSSA）

## 1. DSSA 基础

<strong>特定领域软件架构（DSSA）</strong>是面向某一特定应用领域，为一组相关应用提供组织结构参考的标准软件架构。它抽象领域内应用的共性需求和变化点，形成可复用的领域架构资产；DSSA 面向的是一组应用，不是某个单独应用的具体架构。

从功能覆盖范围看，领域分为两类：

- <strong>垂直域：</strong>定义一个特定的系统族，包含该系统族内的多个系统，形成该领域可行解决方案的通用软件架构。垂直域通常要求领域成熟、稳定，才能形成一致的通用方案。
- <strong>水平域：</strong>提取多个系统和多个系统族中某个功能区域的共有部分，在子系统层面覆盖多个系统族的特定功能，不局限于某一个成熟行业领域。

DSSA 的三层次系统模型如下：

- <strong>领域开发环境：</strong>由领域架构师使用领域模型、参考需求、参考架构和开发工具等，建立领域资产。
- <strong>领域特定的应用开发环境：</strong>由应用工程师利用 DSSA 和可复用产品单元，实例化面向具体应用的体系结构。
- <strong>应用执行环境：</strong>由操作员运行实例化后的应用体系结构。

## 2. DSSA 的活动、角色与建立过程

### 三项基本活动

1. <strong>领域分析：</strong>识别领域边界、信息来源、共性需求和变化需求，主要成果是<strong>领域模型</strong>，用于描述领域中系统的共同需求。
2. <strong>领域设计：</strong>依据领域模型设计适应多个应用的高层解决方案，主要成果是<strong>DSSA</strong>，并通过可选、可替代方案表达变化性。
3. <strong>领域实现：</strong>依据领域模型和 DSSA 开发、提取、验证并组织<strong>可复用信息</strong>，实现复用基础设施。

### 四类角色

- <strong>领域专家：</strong>提供领域需求、设计实现和技术演化知识，协助建立领域字典、选择样本系统并复审领域工程产品。
- <strong>领域分析人员：</strong>负责知识获取、领域分析和领域模型的建立、验证与维护。
- <strong>领域设计人员：</strong>依据领域模型和现有系统设计 DSSA，验证其准确性和一致性，并建立模型与架构的联系。
- <strong>领域实现人员：</strong>依据领域模型和 DSSA 开发或提取可复用构件，验证构件并建立架构与构件的联系。

### 五个建立阶段

1. <strong>定义领域范围：</strong>确定感兴趣的领域边界，以及建立过程何时结束。
2. <strong>定义领域特定的元素：</strong>编制领域字典和术语同义词词典，细化高层模型并识别应用间的共性与差异。
3. <strong>定义领域特定的设计和实现需求约束：</strong>描述解空间中的差异特性，识别约束并记录其对设计、实现决策的影响。
4. <strong>定义领域模型和体系结构：</strong>产生一般体系结构，并说明模块或构件的语法和语义。
5. <strong>产生、搜集可重用的产品单元：</strong>为 DSSA 增加可复用构件，使其能够产生该问题域中的新应用。

建立过程具有<strong>并发、递归、反复</strong>的特点，也可理解为螺旋式过程：阶段不必严格顺序执行，部分步骤可在更细层次递归，且每轮迭代都增加细节、修正和完善结果。

<details>
<summary>相关真题：14 道独立题 / 22 条记录</summary>

<QuestionBank :questions="dssaQuestions" compact hide-categories />

</details>
