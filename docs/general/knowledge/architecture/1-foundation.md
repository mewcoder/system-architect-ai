<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/architecture.json'

const definitionQuestions = selectQuestions(questionBank.questions, [
  '201311-28',
  '201311-30',
  '201411-28',
  '201511-31',
  '201511-38',
])

const viewQuestions = selectQuestions(questionBank.questions, [
  '201411-31',
  '201811-31',
  '201911-29',
  '202111-32',
  '202211-40',
  '202411-19',
  '202505-19',
  '202511-54',
])
</script>

# 架构基础与 4+1 视图

## 1. 软件架构的定义

软件架构（Software Architecture，<strong>SA</strong>），或称<strong>软件体系结构</strong>，是指系统的一个或者多个结构。这些结构包括软件的构件（可能是程序模块、类或者中间件）、构件的外部可见属性及其之间的相互关系。

软件架构是对软件系统<strong>结构、行为和属性</strong>进行的高层次抽象。它不仅描述系统的<strong>组织结构</strong>和<strong>拓扑结构</strong>，还要说明系统需求与构件之间的对应关系，以及架构设计中的关键决策。

软件体系结构的设计通常考虑到设计金字塔中的两个层次——<strong>数据设计</strong>和<strong>体系结构设计</strong>：

- 数据设计体现传统系统中体系结构的数据构件，以及面向对象系统中类的定义；
- 体系结构设计主要关注软件构件的<strong>结构</strong>、<strong>属性</strong>和<strong>交互作用</strong>。

补充：<strong>架构描述语言（ADL）</strong>用于明确描述和建模软件系统的概念架构，主要包含构件、构件接口、连接件和架构配置。

## 2. 4+1 视图

为了从不同角度描述复杂软件架构，Kruchten 提出了<strong>4+1 视图模型</strong>。

<img src="/assets/general/architecture-4plus1-views.svg" alt="4+1 视图模型" style="display: block; width: 520px; max-width: 100%; margin: 0 auto;" />

- <strong>逻辑视图（Logical View）：</strong>系统提供什么功能，有哪些对象或模块。
- <strong>进程视图（Process View）：</strong>运行时的进程、线程、并发和通信。
- <strong>开发视图（Development View）：</strong>代码、包和组件如何组织。
- <strong>物理视图（Physical View）：</strong>软件如何部署到服务器和物理节点。
- <strong>+1 场景（Scenarios）：</strong>用例或场景，用来发现并验证前四个视图。

一句话背诵：<strong>逻辑看功能，进程看运行，开发看代码，物理看部署，场景来验证。</strong>

RUP/UML 也采用 4+1 视图模型，用于在开发过程中从不同角度描述软件架构。图中<strong>蓝色文字</strong>表示与前一张图名称不同的视图：

<img src="/assets/general/architecture-4plus1-rup-uml.svg" alt="RUP UML 4+1 视图模型" style="display: block; width: 520px; max-width: 100%; margin: 0 auto;" />

RUP/UML 与常见 4+1 模型的关注点基本相同，主要是名称有所区别：

- <strong>开发视图</strong> → <strong>实现视图</strong>；
- <strong>物理视图</strong> → <strong>部署视图</strong>；
- <strong>场景视图</strong> → <strong>用例视图</strong>。

这个对比的用途是识别<strong>同一关注点的不同叫法</strong>：两种模型的关注内容基本一致，只是开发视图称为实现视图、物理视图称为部署视图、场景视图称为用例视图。做题时按题干采用的模型名称判断即可。

## 历年真题

<QuestionBank :questions="definitionQuestions" compact hide-categories />

<QuestionBank :questions="viewQuestions" compact hide-categories />
