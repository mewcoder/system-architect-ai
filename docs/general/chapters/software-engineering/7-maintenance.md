<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import maintenanceBank from '../../../data/question-banks/maintenance.json'
import softwareBank from '../../../data/question-banks/software.json'

const allQuestions = [...maintenanceBank.questions, ...softwareBank.questions]
const maintenanceQuestions = selectQuestions(allQuestions, [
  '202511-18',
  '202505-25',
  '202411-27',
  '202211-39',
  '202211-35',
  '202111-37',
  '202011-14',
  '201911-27',
  '201911-26',
  '201911-14',
  '201811-14',
  '201711-29',
  '201711-13',
  '201611-13',
  '201511-27',
  '201511-13',
  '201411-21',
  '201411-11',
  '201311-21',
  '201311-20',
  '201311-19',
  '201311-12',
])

const maintenanceTrend = summarizeQuestionBank(maintenanceQuestions)
</script>

# 软件运行与维护

本章从系统投入使用后的三个问题展开：<strong>怎样监控和评价、怎样维护和演化、怎样处理遗留系统</strong>。

## 1. 运行监控与性能评价

系统运行管理关注<strong>监控、性能、故障和评价</strong>。系统监视常见方式是查看系统命令、查阅记录文件，以及使用集成命令、日志和可视化的监控工具。

性能评价程序的准确度通常由高到低为：<strong>真实程序 → 核心程序 → 小型基准程序 → 合成基准程序</strong>。把应用中使用最频繁的核心部分抽出来作为标准程序，属于<strong>核心程序</strong>；基准程序用于代表性性能比较。

常考指标按对象判断：

- <strong>Web 服务器</strong>：最大并发连接数、响应延迟、吞吐量；
- <strong>数据库</strong>：CPU/内存、查询语句、进程/线程、日志等；
- <strong>应用系统</strong>：可用性、响应时间、并发用户数和资源占用。

## 2. 软件维护与系统转换

软件维护四类：

- <strong>改正性维护</strong>：修复已经发现的错误；
- <strong>适应性维护</strong>：适应硬件、操作系统、数据库或外部规则变化；
- <strong>完善性维护</strong>：增加功能、改善性能或满足新需求；
- <strong>预防性维护</strong>：提前改善结构、可维护性和可靠性，降低未来风险。

新旧系统转换常见策略：

- <strong>直接转换</strong>：一次性切换，时间短但风险集中；
- <strong>并行转换</strong>：新旧系统同时运行，风险低但成本高；
- <strong>分段转换</strong>：按模块、业务或阶段逐步切换。

## 3. 遗留系统、逆向工程与再工程

遗留系统按<strong>技术水平</strong>和<strong>业务价值</strong>选择策略：

- 技术低、价值低 → <strong>淘汰</strong>；
- 技术低、价值高 → <strong>继承</strong>，维持运行并谨慎维护；
- 技术高、价值低 → <strong>集成</strong>，打破局部系统形成的信息孤岛；
- 技术高、价值高 → <strong>改造</strong>，在原系统基础上升级。

<strong>逆向工程</strong>从已有程序或低层实现恢复更高层次的信息，抽象层次由低到高为<strong>实现级、结构级、功能级、领域级</strong>。<strong>再工程</strong>是在逆向工程基础上结合新需求进行修改、重构并形成新的系统版本。

可行性分析主要看<strong>经济、技术和运营</strong>可行性；“分析现有系统运行问题”是前期调查和问题诊断，不属于可行性分析本身。

## 对应真题

本页覆盖 <strong>{{ maintenanceTrend.questionCount }} 道独立题</strong>、<strong>{{ maintenanceTrend.recordCount }} 条分值记录</strong>，题目分类已合并展示并隐藏右上角分类。

<QuestionBank :questions="maintenanceQuestions" compact hide-categories anchor-prefix="software-maintenance" />
