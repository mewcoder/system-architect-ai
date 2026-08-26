<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/architecture.json'

const absdQuestions = selectQuestions(questionBank.questions, [
  '202605-69',
  '202411-37',
  '202411-65',
  '202405-41',
  '202405-50',
  '202311-35',
  '202311-40',
  '202311-41',
  '202211-41',
  '202111-31',
  '202011-24',
  '201911-31',
  '201711-32',
  '201711-33',
  '201511-32',
  '201411-35',
  '201311-33',
])
</script>

# 第3章第3小节——基于架构的软件开发

## 1. 基础概念

ABSD（Architecture-Based Software Design/Development，基于架构的软件设计/开发）是<strong>以软件架构为核心、由架构驱动</strong>的软件开发方法。

<strong>核心思想：</strong>ABSD 把软件架构作为开发主线，架构由<strong>商业需求、质量需求和功能需求</strong>共同驱动；设计时以<strong>三个基础</strong>为支撑，再通过<strong>递归细化</strong>逐步落实到构件和类。

- <strong>三个基础：</strong>
  - <strong>功能分解</strong>：关注模块的内聚和耦合；
  - <strong>架构风格</strong>：实现质量属性和商业需求；
  - <strong>软件模板</strong>：利用已有软件结构设计软件系统。
- <strong>递归细化：</strong>ABSD 是<strong>自顶向下</strong>的递归细化方法：最顶层将系统分解为<strong>概念子系统</strong>和软件模板；下一层将概念子系统分解为<strong>概念构件</strong>和附加软件模板；最终细化为实际构件或类。

<strong>ABSD 的适用条件：</strong>系统的总体功能已经明确，但详细需求还可能变化时，需求分析和架构设计可以并行进行；每轮迭代都要有明确目标。

基础概念相关真题：6 题<a class="question-ref" href="#q-absd-202605-69">#2026.05-69</a><a class="question-ref" href="#q-absd-202411-37">#2024.11-37</a><a class="question-ref" href="#q-absd-202311-35">#2023.11-35</a><a class="question-ref" href="#q-absd-202211-41">#2022.11-41</a><a class="question-ref" href="#q-absd-202111-31">#2021.11-31</a><a class="question-ref" href="#q-absd-201311-33">#2013.11-33</a>

## 2. ABSD 架构描述

考虑体系结构时，要从不同的<strong>视角</strong>观察架构描述；<strong>用例</strong>用来捕获功能需求，<strong>质量场景</strong>用来捕获质量需求。

- <strong>视角与视图</strong>
  - 从不同的<strong>视角</strong>观察架构描述；
  - <strong>静态视角</strong>展示功能组织，可用于判断质量特性；
  - <strong>动态视角</strong>展示并发行为，可用于判断系统行为特性；
- <strong>用例和质量场景</strong>
  - <strong>用例</strong>是系统为用户提供结果值的功能点，用于捕获功能需求；
  - <strong>质量场景</strong>用于捕获质量需求，常见类型包括变更、性能、可靠性和交互性场景。

4+1 视图模型是“视角与视图”的一种具体模型。

相关真题：4 题<a class="question-ref" href="#q-absd-202405-50">#2024.05-50</a><a class="question-ref" href="#q-absd-202011-24">#2020.11-24</a><a class="question-ref" href="#q-absd-201711-32">#2017.11-32</a><a class="question-ref" href="#q-absd-201511-32">#2015.11-32</a>

## 3. 基于体系结构的开发模型

六个活动顺序：

<img src="/assets/general/architecture-absd-development-model.svg" alt="基于体系结构的开发模型" style="display: block; width: 360px; max-width: 100%; margin: 0 auto 1rem;" />

<strong>谐音口诀：</strong>虚设文，复试演。

- <strong>体系结构需求：</strong>需求获取、识别构件和需求复审。
- <strong>体系结构设计：</strong>建立架构模型，映射构件并分析交互。
- <strong>体系结构文档化：</strong>输出<strong>体系结构规格说明</strong>和<strong>质量设计说明书</strong>。
- <strong>体系结构复审：</strong>由用户代表、领域专家等参与，尽早发现风险和缺陷。
- <strong>体系结构实现：</strong>组装构件，测试构件和系统整体。
- <strong>体系结构演化：</strong>按“需求变化归类 → 制定计划 → 调整构件 → 更新交互 → 组装测试 → 技术评审”执行。

做题时：问<strong>输出物</strong>看文档化，问<strong>风险缺陷</strong>看复审，问<strong>需求变化</strong>看演化，问<strong>先后顺序</strong>背六个活动。

开发模型相关真题：7 题<a class="question-ref" href="#q-absd-202411-65">#2024.11-65</a><a class="question-ref" href="#q-absd-202405-41">#2024.05-41</a><a class="question-ref" href="#q-absd-202311-41">#2023.11-41</a><a class="question-ref" href="#q-absd-201911-31">#2019.11-31</a><a class="question-ref" href="#q-absd-201711-33">#2017.11-33</a><a class="question-ref" href="#q-absd-201411-35">#2014.11-35</a><a class="question-ref" href="#q-absd-201311-33">#2013.11-33</a>

## 历年真题

<QuestionBank :questions="absdQuestions" anchor-prefix="absd" compact hide-categories />
