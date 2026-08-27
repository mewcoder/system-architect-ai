<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/analysis.json'

const designQuestions = selectQuestions(questionBank.questions, [
  '202605-47',
  '202605-44',
  '202511-63',
  '202511-60',
  '202511-59',
  '202511-50',
  '202511-44',
  '202511-43',
  '202511-24',
  '202505-9',
  '202505-8',
  '202505-32',
  '202411-40',
  '202411-29',
  '202411-28',
  '202405-40',
  '202111-39',
  '202111-38',
  '202111-24',
  '202011-28',
  '202011-27',
  '202011-19',
  '201911-32',
  '201911-23',
  '201911-22',
  '201911-21',
  '201811-36',
  '201811-24',
  '201811-23',
  '201711-38',
  '201711-24',
  '201611-39',
  '201511-26',
  '201511-24',
  '201511-22',
  '201411-33',
  '201411-23',
  '201411-22',
  '201311-24',
  '201311-22',
])

const designTrend = summarizeQuestionBank(designQuestions)
</script>

# 系统设计与设计模式

系统设计把分析模型落实为<strong>可实现的结构</strong>，核心目标是控制复杂度，并使模块易于理解、修改和复用。

## 1. 设计层次与面向对象设计

设计阶段通常分为两层：

- <strong>概要设计</strong>：确定系统整体结构、组成和构件之间的关系；
- <strong>详细设计</strong>：确定模块接口、算法和内部处理。

面向对象设计是面向对象分析的延续，重点是<strong>抽象、封装和可扩展性</strong>。按职责辨析三类设计类：

- <strong>实体类</strong>：表示业务领域中的持久化对象或核心数据；
- <strong>控制类</strong>：协调用例流程和业务处理；
- <strong>边界类</strong>：负责系统与外部参与者、设备或界面的交互。

常考设计原则：<strong>单一职责、开闭、里氏替换、接口隔离、依赖倒置、组合/聚合复用、最少知识</strong>。

## 2. 结构化设计与模块质量

结构化设计以<strong>需求规格说明、DFD、数据字典</strong>等为基础，采用<strong>自顶向下、逐步求精、模块化</strong>的方法。模块划分重点看：

- <strong>扇入</strong>：调用该模块的上级模块数；通常希望适当提高；
- <strong>扇出</strong>：该模块直接调用的下级模块数；过大说明控制复杂；
- <strong>深度与宽度</strong>：分别反映层次深度和同层模块数量；
- <strong>信息隐蔽</strong>：隐藏模块内部实现，只通过接口协作。

总体目标是<strong>高内聚、低耦合</strong>。耦合由低到高为：<strong>非直接、数据、标记、控制、外部、公共、内容</strong>；内聚由高到低为：<strong>功能、顺序、通信、过程、瞬时、逻辑、偶然</strong>。

最容易混淆的两组：

- <strong>顺序内聚</strong>：一个处理的输出是下一个处理的输入；
- <strong>过程内聚</strong>：处理元素按特定顺序执行，但彼此没有数据传递或直接依赖；
- <strong>数据耦合</strong>：模块之间传递简单数据；
- <strong>标记耦合</strong>：模块之间传递数据结构或数据记录。

## 3. 设计模式

设计模式按意图分为<strong>创建型、结构型、行为型</strong>：

- <strong>创建型</strong>：工厂、单例，解决对象如何创建；
- <strong>结构型</strong>：适配器、装饰器、外观，解决类或对象如何组合；
- <strong>行为型</strong>：观察者、策略，解决对象之间如何协作。

按题干意图定位模式：

- <strong>适配器</strong>：转换接口，解决接口不兼容；
- <strong>装饰器</strong>：动态增加对象职责；
- <strong>观察者</strong>：一对多通知，状态变化时通知依赖者；
- <strong>策略</strong>：封装可替换算法；
- <strong>工厂</strong>：封装对象创建过程；
- <strong>单例</strong>：保证一个类只有一个实例并提供统一访问点；
- <strong>外观</strong>：为复杂子系统提供统一的高层接口。

## 对应真题

本页覆盖 <strong>{{ designTrend.questionCount }} 道独立题</strong>、<strong>{{ designTrend.recordCount }} 条分值记录</strong>，题目分类已合并展示并隐藏右上角分类。

<QuestionBank :questions="designQuestions" compact hide-categories anchor-prefix="software-design" />
