<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/architecture.json'

const evaluationQuestions = selectQuestions(questionBank.questions, [
  '202605-52',
  '202605-53',
  '202605-58',
  '202511-6',
  '202511-5',
  '202511-31',
  '202511-32',
  '202511-36',
  '202511-39',
  '202505-49',
  '202411-21',
  '202411-22',
  '202411-34',
  '202411-50',
  '202411-62',
  '202405-23',
  '202405-44',
  '202405-46',
  '202311-17',
  '202311-28',
  '202311-39',
  '202211-48',
  '202211-49',
  '202211-52',
  '202111-36',
  '202111-42',
  '202111-43',
  '202011-25',
  '201811-33',
  '201511-41',
  '201411-37',
  '201411-38',
  '201311-34',
])

const evaluationTrend = summarizeQuestionBank(evaluationQuestions)
</script>

# 架构评估

> <strong>考试趋势：</strong>本章平均每年约<strong>{{ evaluationTrend.annualAverageLabel }} 分</strong>。
>
> - 架构评估题长期持续出现，近年仍有稳定记录，且部分年份会与软件质量属性合并考查，题量波动比单纯概念题更明显。
> - ATAM、SAAM、CBAM 的定位，以及<strong>敏感点、权衡点、风险、效用树</strong>等概念是复习重点；做题时先判断评估依据和方法目标。

架构评估是在系统开发前或架构决策阶段，依据<strong>质量目标和质量属性场景</strong>判断架构是否满足需求，并识别风险、敏感点和权衡点。它关注的是架构决策对系统质量的影响，不是检查功能代码是否已经全部实现。

## 1. 架构评估基础

- <strong>敏感点：</strong>一个或多个构件及其关系的特性，会对某个质量属性产生显著影响，是影响该属性的关键设计因素。
- <strong>权衡点：</strong>一个架构决策同时影响多个质量属性，且这些属性之间可能存在冲突。提高加密级别同时影响安全性和性能，就是典型的权衡点。
- <strong>风险点：</strong>带有不确定性、可能导致架构无法满足质量目标的设计决策。
- <strong>非风险点：</strong>在当前条件下已经验证不会引发质量问题的设计内容。
- <strong>利益相关者：</strong>参与架构评估并提出质量目标和使用关注点的人员，如用户、开发人员、维护人员、性能工程师和安全专家。

架构评估中的<strong>场景</strong>从利益相关者的角度描述与系统的交互，通常用<strong>刺激、环境、响应</strong>三个方面概括。它不同于上一章质量属性场景的六要素。

两种分析视角也常出现在题目中：

- <strong>自底向上分析：</strong>从具体构件、构件关系和运行数据出发，归纳架构的实际特性，更接近实现层面的运行效率和资源表现；
- <strong>基于场景的分析：</strong>从利益相关者目标和质量属性场景出发，分析架构是否支撑预期质量目标。

对应真题：<a class="question-ref" href="#q-evaluation-202605-52">#2026.05-52</a><a class="question-ref" href="#q-evaluation-202605-58">#2026.05-58</a><a class="question-ref" href="#q-evaluation-202511-5">#2025.11-5</a><a class="question-ref" href="#q-evaluation-202511-6">#2025.11-6</a><a class="question-ref" href="#q-evaluation-202511-32">#2025.11-32</a><a class="question-ref" href="#q-evaluation-202505-49">#2025.05-49</a><a class="question-ref" href="#q-evaluation-202411-34">#2024.11-34</a><a class="question-ref" href="#q-evaluation-202411-62">#2024.11-62</a><a class="question-ref" href="#q-evaluation-202405-44">#2024.05-44</a><a class="question-ref" href="#q-evaluation-202111-43">#2021.11-43</a><a class="question-ref" href="#q-evaluation-202011-25">#2020.11-25</a><a class="question-ref" href="#q-evaluation-201411-37">#2014.11-37</a>

## 2. 常见评估方法

按评估依据，架构评估通常分为三类：

- <strong>基于调查问卷或检查表：</strong>利用相关人员的经验和知识评价架构，主观性较强；
- <strong>基于场景：</strong>分析架构对具体场景的支持程度，SAAM 和 ATAM 属于这一类；
- <strong>基于度量：</strong>先建立质量属性与度量指标的映射，再从架构文档获取度量信息，最后推导系统的质量属性。

- <strong>SAAM：</strong>较早文档化的基于场景的架构分析方法，由 Rick Kazman 等提出；主要输入是<strong>问题描述、需求声明和体系结构描述</strong>，重点关注需求变化对架构和可修改性的影响。
- <strong>ATAM：</strong>在 SAAM 基础上发展，面向系统开发早期，分析性能、可用性、安全性、可修改性等多个质量属性之间的权衡。
- <strong>CBAM：</strong>在 ATAM 基础上引入经济学分析，根据成本、收益和投资回报率（ROI）在多个架构方案中进行选择。
- <strong>SAEM：</strong>覆盖软件架构的产品属性和过程属性，用于形成较完整的架构质量评估框架。
- <strong>SASAM：</strong>典型的静态分析方法，通过映射、比较预期架构与实际架构模型，检查架构结构和构件组织的一致性。
- <strong>SAABNet：</strong>基于贝叶斯信念网络进行定性架构评估，依靠概率推理分析架构属性。

按关键词区分：<strong>SAAM 看场景和可修改性，ATAM 看多质量属性权衡，CBAM 看成本收益，SASAM 看静态结构，SAABNet 看贝叶斯推理</strong>。

对应真题：<a class="question-ref" href="#q-evaluation-202605-53">#2026.05-53</a><a class="question-ref" href="#q-evaluation-202511-31">#2025.11-31</a><a class="question-ref" href="#q-evaluation-202405-46">#2024.05-46</a><a class="question-ref" href="#q-evaluation-202311-17">#2023.11-17</a><a class="question-ref" href="#q-evaluation-201811-33">#2018.11-33</a><a class="question-ref" href="#q-evaluation-201511-41">#2015.11-41</a><a class="question-ref" href="#q-evaluation-201411-38">#2014.11-38</a>

## 3. ATAM 重点

ATAM 的四个主要活动领域是：

- 场景和需求收集；
- 体系结构视图和场景实现；
- 属性模型构造和分析；
- 折中。

ATAM 使用<strong>质量属性效用树</strong>对质量属性分类并排序。效用树从根到叶依次是：<strong>效用 → 质量属性 → 属性分类 → 质量属性场景</strong>。场景优先级同时考虑场景对系统成功的重要性，以及实现该场景的难易程度，通常用高（H）、中（M）、低（L）表示；不能认为某一种质量属性永远是最高优先级。

ATAM 通过头脑风暴识别三类场景：

- <strong>用例场景：</strong>来自用户的真实操作，验证当前业务需求；
- <strong>增长场景：</strong>描述未来的扩展、升级或规模增长，考查架构的可扩展性和可演化性；
- <strong>探索性场景：</strong>通过极端负载、极端故障等条件挑战架构的适应能力和鲁棒性。

增长场景还可以进一步描述用户数、数据量或业务规模的<strong>极端增长</strong>，用于检验架构的扩展能力。

ATAM 以<strong>需求说明</strong>为出发点，在系统开发前对质量属性进行评价和折中；题目问完整质量属性场景时，才写刺激源、刺激、环境、制品、响应和响应度量。

ATAM 设计之初重点关注的四种质量属性是<strong>性能、安全性、可修改性和可用性</strong>。评估时先明确质量目标，再通过场景、视图和属性模型分析架构，最后识别敏感点、权衡点和风险并进行架构折中。

题库分类中有少量与质量属性、ABSD 或事件驱动交叉的题目，仍保留在下方真题区；正文只按架构评估主线整理。

对应真题：<a class="question-ref" href="#q-evaluation-202511-36">#2025.11-36</a><a class="question-ref" href="#q-evaluation-202511-39">#2025.11-39</a><a class="question-ref" href="#q-evaluation-202411-21">#2024.11-21</a><a class="question-ref" href="#q-evaluation-202411-22">#2024.11-22</a><a class="question-ref" href="#q-evaluation-202411-50">#2024.11-50</a><a class="question-ref" href="#q-evaluation-202405-23">#2024.05-23</a><a class="question-ref" href="#q-evaluation-202311-28">#2023.11-28</a><a class="question-ref" href="#q-evaluation-202311-39">#2023.11-39</a><a class="question-ref" href="#q-evaluation-202211-48">#2022.11-48</a><a class="question-ref" href="#q-evaluation-202211-49">#2022.11-49</a><a class="question-ref" href="#q-evaluation-202211-52">#2022.11-52</a><a class="question-ref" href="#q-evaluation-202111-36">#2021.11-36</a><a class="question-ref" href="#q-evaluation-202111-42">#2021.11-42</a><a class="question-ref" href="#q-evaluation-201311-34">#2013.11-34</a>

## 历年真题

<QuestionBank :questions="evaluationQuestions" anchor-prefix="evaluation" compact hide-categories />
