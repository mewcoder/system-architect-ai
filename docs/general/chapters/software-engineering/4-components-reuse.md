<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/software.json'

const reuseQuestions = selectQuestions(questionBank.questions, [
  '202605-30',
  '202511-51',
  '202505-54',
  '202411-49',
  '202405-22',
  '202405-17',
  '202311-53',
  '202311-51',
  '202311-50',
  '202311-49',
  '202311-48',
  '202311-44',
  '202211-34',
  '202211-32',
  '202211-31',
  '202111-28',
  '202111-27',
  '202011-21',
  '201911-25',
  '201911-24',
  '201811-29',
  '201811-28',
  '201811-27',
  '201811-26',
  '201811-25',
  '201711-28',
  '201611-27',
  '201611-26',
  '201611-25',
  '201611-24',
  '201411-30',
])

const reuseTrend = summarizeQuestionBank(reuseQuestions)
</script>

# 构件化与软件复用

这一章的主线是：先找到可复用资产，再通过<strong>接口、适配和组装</strong>把它变成系统能力。

## 1. 基于构件的软件工程

CBSE 以<strong>可复用构件</strong>组装系统，把开发重点从重新编写转向<strong>选择、适配和组装</strong>。构件通常是<strong>可独立部署、可替换、无外部可见状态</strong>的软件单元，外部交互必须通过公开定义的接口完成。

构件的核心特征是<strong>可组装、可部署、文档化、独立性</strong>。构件模型描述接口、使用信息和部署信息；容器为构件提供<strong>运行与整合环境</strong>。构件库负责构件的<strong>存储、管理、分类、检索、浏览和维护</strong>。

接口题先辨析两类接口：

- <strong>提供接口</strong>：构件对外提供的服务；
- <strong>请求接口</strong>：构件运行时需要调用的服务。

## 2. 构件类型、组装与失配

按外部形态，构件常分为五类：

- <strong>独立而成熟的构件</strong>：功能完整，验证充分，可直接复用；
- <strong>有限制的构件</strong>：依赖特定任务、环境或使用条件；
- <strong>适应性构件</strong>：已经通过包装或接口技术处理兼容性问题；
- <strong>装配的构件</strong>：已装配到操作系统、数据库等环境中，通常用胶水代码连接；
- <strong>可修改的构件</strong>：可进行版本替换、重新包装或功能扩展。

构件组装的常见方式是<strong>层次组装、顺序组装和叠加组装</strong>：层次组装体现服务调用关系，顺序组装把前一构件的输出接给后一构件，叠加组装把多个构件合并后对外提供统一接口。组装过程通常经历<strong>定制、集成、扩展</strong>三个层次。

接口失配常见为<strong>参数不兼容、操作不兼容、操作不完备</strong>；其中提供接口只是请求接口子集，属于<strong>操作不完备</strong>。架构失配还要区分：基础设施、控制模型和数据模型假设冲突，属于<strong>构件失配</strong>；交互协议和连接时数据格式假设冲突，属于<strong>连接子失配</strong>。解决时可使用适配器或胶水代码。

## 3. 软件复用

软件复用的对象包括<strong>需求、设计、架构、构件、框架、服务、类、接口、包、测试用例和领域知识</strong>。按应用范围区分：

- <strong>水平复用</strong>：跨不同应用领域复用通用元素，如数据结构、通用算法和基础界面；
- <strong>垂直复用</strong>：在同一应用领域内复用领域知识和专用资产。

双生命周期模型由<strong>领域工程</strong>和<strong>应用工程</strong>组成：领域工程提炼和维护可复用资产，应用工程利用这些资产构建具体应用。基于复用的开发过程可记为：<strong>需求概览 → 识别候选构件 → 根据构件调整需求 → 架构设计 → 定制适配 → 组装</strong>。

注意：架构页中的“架构复用”强调参考架构、架构模式等<strong>架构层次</strong>的复用；本页强调构件库、软件资产和<strong>构件组装</strong>。

## 对应真题

本页覆盖 <strong>{{ reuseTrend.questionCount }} 道独立题</strong>、<strong>{{ reuseTrend.recordCount }} 条分值记录</strong>，题目分类已合并展示并隐藏右上角分类。

<QuestionBank :questions="reuseQuestions" compact hide-categories anchor-prefix="software-reuse" />
