<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
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

const foundationTrend = summarizeQuestionBank([...definitionQuestions, ...viewQuestions])
</script>

# 架构基础与 4+1 视图

> <strong>考试趋势：</strong>本章平均每年约<strong>{{ foundationTrend.annualAverageLabel }} 分</strong>。
>
> - 近年考查主要集中在<strong>4+1 视图</strong>，软件架构定义和架构描述语言的题目相对较早且较少；复习时优先掌握各视图的关注点和名称对应。
> - 题目以概念辨析和视图映射为主，常考逻辑、进程、开发、物理与场景视图的职责区别；RUP/UML 的实现、部署、用例视图要注意同义对应。

## 1. 软件架构的定义

软件架构（Software Architecture，<strong>SA</strong>），或称<strong>软件体系结构</strong>，是指系统的一个或者多个结构。这些结构包括软件的构件（可能是程序模块、类或者中间件）、构件的外部可见属性及其之间的相互关系。

软件架构是对软件系统<strong>结构、行为和属性</strong>进行的高层次抽象。它不仅描述系统的<strong>组织结构</strong>和<strong>拓扑结构</strong>，还要说明系统需求与构件之间的对应关系，以及架构设计中的关键决策。

软件体系结构的设计通常考虑到设计金字塔中的两个层次——<strong>数据设计</strong>和<strong>体系结构设计</strong>：

- 数据设计体现传统系统中体系结构的数据构件，以及面向对象系统中类的定义；
- 体系结构设计主要关注软件构件的<strong>结构</strong>、<strong>属性</strong>和<strong>交互作用</strong>。

补充：<strong>架构描述语言（ADL）</strong>用于明确描述和建模软件系统的概念架构，主要包含构件、构件接口、连接件和架构配置。

对应真题：<a class="question-ref" href="#q-foundation-201311-28">#2013.11-28</a><a class="question-ref" href="#q-foundation-201311-30">#2013.11-30</a><a class="question-ref" href="#q-foundation-201411-28">#2014.11-28</a><a class="question-ref" href="#q-foundation-201511-31">#2015.11-31</a><a class="question-ref" href="#q-foundation-201511-38">#2015.11-38</a>

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

对应真题：<a class="question-ref" href="#q-foundation-201411-31">#2014.11-31</a><a class="question-ref" href="#q-foundation-201811-31">#2018.11-31</a><a class="question-ref" href="#q-foundation-201911-29">#2019.11-29</a><a class="question-ref" href="#q-foundation-202111-32">#2021.11-32</a><a class="question-ref" href="#q-foundation-202211-40">#2022.11-40</a><a class="question-ref" href="#q-foundation-202411-19">#2024.11-19</a><a class="question-ref" href="#q-foundation-202505-19">#2025.05-19</a><a class="question-ref" href="#q-foundation-202511-54">#2025.11-54</a>

## 历年真题

<QuestionBank :questions="definitionQuestions" anchor-prefix="foundation" compact hide-categories />

<QuestionBank :questions="viewQuestions" anchor-prefix="foundation" compact hide-categories />
