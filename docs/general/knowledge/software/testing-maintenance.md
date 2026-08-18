<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import softwareBank from '../../../data/question-banks/software.json'
import testingBank from '../../../data/question-banks/testing.json'
import reliabilityBank from '../../../data/question-banks/reliability.json'
import maintenanceBank from '../../../data/question-banks/maintenance.json'

const allQuestions = [
  ...softwareBank.questions,
  ...testingBank.questions,
  ...reliabilityBank.questions,
  ...maintenanceBank.questions
]

function questionsForCategories(categories: string[]) {
  const selected = new Set(categories)
  return allQuestions
    .filter((question) => selected.has(question.category))
    .sort((a, b) =>
      b.exam.localeCompare(a.exam) ||
      b.question_no - a.question_no ||
      a.part_no - b.part_no
    )
}

const testingQuestions = questionsForCategories([
  '性能测试', '软件测试基础', '单元测试', '回归测试', '测试阶段与文档依据',
  '白盒测试', '自动化测试', '黑盒测试', 'Web 测试与 A/B 测试', '测试用例与测试过程',
  '测试覆盖与度量', '软件调试', '集成测试', '静态测试', '灰盒测试',
  '确认与验收测试', '系统测试'
])
const qualityQuestions = questionsForCategories([
  '软件能力成熟度模型', '可靠性管理与可靠性测试', '可靠性指标与失效率分析'
])
const maintenanceQuestions = questionsForCategories([
  '逆向工程', '评价方法', '性能指标', '遗留系统', '系统维护', '可行性分析'
])
</script>

# 文档 3：测试、质量与维护

## 1. 软件测试

测试题先按测试对象和测试阶段定位，再判断测试方法和覆盖标准。黑盒测试从输入输出和外部行为出发，白盒测试关注内部逻辑，灰盒测试介于两者之间；静态测试不运行程序，动态测试通过执行系统观察结果。

| 方向 | 重点 |
| --- | --- |
| 测试层次 | 单元、集成、系统、确认与验收测试的对象和目标 |
| 黑盒测试 | 等价类、边界值、判定表、因果图和场景设计 |
| 白盒测试 | 语句、分支、条件、路径和逻辑覆盖 |
| 回归测试 | 修改后重新验证受影响功能，防止已有能力被破坏 |
| 性能与自动化 | 关注响应时间、吞吐量、并发、资源消耗和重复执行效率 |
| 测试度量 | 覆盖率、缺陷发现、通过率和测试过程数据 |

测试阶段题先看“测试什么”，测试方法题再看“怎么构造输入”，覆盖题最后确认度量对象。调试的目标是定位和修复原因，测试的目标是发现缺陷，两者不要混淆。

<details>
<summary>相关真题：41 题</summary>

<QuestionBank :questions="testingQuestions" compact />

</details>

## 2. 软件质量与可靠性

软件质量题从用户、过程和产品多个角度判断质量属性；能力成熟度模型关注组织过程改进和成熟程度。可靠性题则重点处理失效率、可靠性指标、可靠性测试和可靠性管理。

| 主题 | 重点 |
| --- | --- |
| 质量改进 | 关注过程是否可定义、可度量、可重复和持续改进 |
| 可靠性指标 | 区分失效率、平均无故障时间、可靠性和可用性等概念 |
| 可靠性测试 | 通过运行、故障数据和统计模型评价系统失效特征 |
| 管理活动 | 从需求、设计、实现、测试到运行维护持续控制可靠性风险 |

遇到可靠性计算，先统一时间单位和失效率单位，再判断题目要求的是失效次数、可靠度还是平均无故障时间。质量属性的目标不能只写“高质量”，要落到可观察、可度量的指标上。

<details>
<summary>相关真题：18 题</summary>

<QuestionBank :questions="qualityQuestions" compact />

</details>

## 3. 软件维护与演进

系统运行与维护题关注软件进入运行阶段后的评价、性能、可行性和维护活动；逆向工程则从已有程序、数据和运行结果恢复较高层次的设计或需求信息，为遗留系统改造和再工程提供基础。

| 主题 | 判断重点 |
| --- | --- |
| 维护类型 | 区分纠错、适应、完善和预防性维护的触发原因与目标 |
| 遗留系统 | 关注继续维护、重构、迁移、替换和业务连续性之间的权衡 |
| 性能指标 | 从响应时间、吞吐量、资源利用和并发能力分析运行表现 |
| 评价方法 | 先明确评价对象、指标和数据来源，再判断评价结果的用途 |
| 逆向工程 | 从现有实现恢复设计、结构或规格信息，不等同于直接复制源代码 |

维护题要先判断变化来自缺陷、环境、需求还是结构风险；遗留系统题则要同时看技术债务、业务价值、迁移风险和维护成本。

<details>
<summary>相关真题：22 题</summary>

<QuestionBank :questions="maintenanceQuestions" compact />

</details>

## 文档小结

| 章节 | 真题题数 | 分值记录 |
| --- | ---: | ---: |
| 软件测试 | 41 | 50 |
| 软件质量与可靠性 | 18 | 19 |
| 软件维护与演进 | 22 | 32 |
| **合计** | **81** | **101** |

