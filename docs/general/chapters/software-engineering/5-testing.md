<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/testing.json'

const testingQuestions = selectQuestions(questionBank.questions, [
  '202605-28',
  '202605-27',
  '202605-26',
  '202605-25',
  '202605-24',
  '202511-65',
  '202511-57',
  '202511-17',
  '202511-16',
  '202511-14',
  '202505-58',
  '202505-46',
  '202505-43',
  '202505-39',
  '202505-36',
  '202505-17',
  '202505-10',
  '202411-45',
  '202411-26',
  '202411-25',
  '202405-51',
  '202405-4',
  '202405-28',
  '202311-6',
  '202311-46',
  '202311-4',
  '202311-36',
  '202211-38',
  '202211-37',
  '202211-36',
  '202111-30',
  '202011-23',
  '201911-28',
  '201811-30',
  '201711-31',
  '201611-30',
  '201511-28',
  '201411-27',
  '201411-26',
  '201411-25',
  '201311-26',
])

const testingTrend = summarizeQuestionBank(testingQuestions)
</script>

# 软件测试

软件测试的主线是：先确定<strong>测试对象和依据</strong>，再选择测试方法，最后用回归和度量确认修改没有破坏原有能力。

## 1. 测试分类与阶段

按是否了解程序内部结构：

- <strong>黑盒测试</strong>：只看输入、输出和功能规格；
- <strong>白盒测试</strong>：依据内部代码、逻辑和执行路径；
- <strong>灰盒测试</strong>：既看输入输出，也了解部分内部逻辑。

按是否运行程序分为<strong>静态测试</strong>和<strong>动态测试</strong>。静态测试不运行程序，通过需求、设计说明书或源程序的审查、结构分析和流程分析发现问题。

标准测试顺序是<strong>单元测试 → 集成测试 → 系统测试 → 确认/验收测试</strong>：

- <strong>单元测试</strong>：关注模块内部，常用驱动和桩，依据详细设计；
- <strong>集成测试</strong>：关注模块接口与交互，依据概要设计；
- <strong>系统测试</strong>：面向完整系统，依据需求规格说明；
- <strong>验收测试</strong>：从用户角度确认合同或需求，依据用户需求或合同。

测试不能证明软件绝对正确，只能在给定范围内发现缺陷。测试用例至少要有<strong>测试目的、前置条件、输入数据、操作步骤和预期输出</strong>。

## 2. 黑盒、白盒与性能测试

黑盒方法按题干定位：

- <strong>等价类划分</strong>：从输入域划分有效类和无效类，选代表值；
- <strong>边界值分析</strong>：重点取边界、边界附近和越界值；
- <strong>因果图</strong>：分析输入条件之间的组合、约束及其对输出的影响；
- <strong>判定表</strong>：描述多条件组合分别对应的动作。

白盒覆盖强度常考<strong>语句、判定、条件、判定/条件、条件组合、路径</strong>。其中语句覆盖最弱，路径覆盖通常最强；条件覆盖关注基本条件的真假，不等同于判定覆盖。

性能测试按目的辨析：

- <strong>负载测试</strong>：验证预期负载下的性能；
- <strong>压力测试</strong>：逐步加压，寻找瓶颈和最大服务能力；
- <strong>稳定性测试</strong>：观察长时间运行是否性能衰减；
- <strong>并发、容量、强度、配置测试</strong>：分别关注并发处理、数据规模、超常负载和环境配置。

## 3. 测试过程与高频新概念

<strong>测试左移</strong>是把测试活动前移到需求、设计和编码阶段；敏捷测试从需求澄清和验收标准定义开始介入。代码变更后，通常先用<strong>冒烟测试</strong>确认构建可测试，再进行回归测试。

<strong>回归测试</strong>既验证变更部分正确，也验证原有正确的功能、性能和其他要求没有被破坏。<strong>调试</strong>的目标是定位并修复缺陷，和测试“发现问题、验证需求”的职责不同。

自动化测试是<strong>执行方式</strong>，适合需求相对稳定、重复性高的测试；数据驱动测试把测试脚本和数据分离，脚本读取外部数据文件。A/B 测试要求在同一时间把相似用户随机分到不同版本，通过对照实验比较效果。

W/H/X 模型快速记忆：

- <strong>W 模型</strong>：测试与开发同步；
- <strong>H 模型</strong>：测试活动独立并贯穿生命周期；
- <strong>X 模型</strong>：程序片段的编码与测试交错集成。

## 对应真题

本页覆盖 <strong>{{ testingTrend.questionCount }} 道独立题</strong>、<strong>{{ testingTrend.recordCount }} 条分值记录</strong>，题目分类已合并展示并隐藏右上角分类。

<QuestionBank :questions="testingQuestions" compact hide-categories anchor-prefix="software-testing" />
