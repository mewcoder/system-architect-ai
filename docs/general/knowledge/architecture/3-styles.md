<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/architecture.json'

const styleQuestions = selectQuestions(questionBank.questions, [
  '202605-48',
  '202605-50',
  '202605-51',
  '202605-70',
  '202511-30',
  '202511-40',
  '202511-52',
  '202511-53',
  '202505-14',
  '202505-27',
  '202505-55',
  '202411-6',
  '202411-33',
  '202411-44',
  '202411-55',
  '202405-24',
  '202405-25',
  '202405-42',
  '202405-43',
  '202311-22',
  '202311-34',
  '202311-43',
  '202211-42',
  '202111-35',
  '202111-48',
  '202011-10',
  '202011-26',
  '201811-34',
  '201811-35',
  '201711-34',
  '201711-35',
  '201711-36',
  '201711-37',
  '201611-31',
  '201611-34',
  '201611-35',
  '201611-36',
  '201611-37',
  '201611-38',
  '201511-12',
  '201511-29',
  '201511-36',
  '201511-37',
  '201411-34',
  '201311-29',
  '201311-32',
])

const stylesTrend = summarizeQuestionBank(styleQuestions)
</script>

# 软件架构风格

> <strong>考试趋势：</strong>本章平均每年约<strong>{{ stylesTrend.annualAverageLabel }} 分</strong>。
>
> - 软件架构风格从 2013 年至今持续出现，近年每场都有记录，是架构设计中最稳定的基础主线之一。
> - 题目以风格识别、构件与连接件特征、数据或控制流向及适用场景辨析为主；复习时先按五类风格建立对照，再记具体风格的优缺点。

软件架构风格是<strong>特定应用领域中系统组织方式的惯用模式</strong>，反映该领域系统共有的<strong>结构和语义特征</strong>。它通过构件、连接件及其组合约束，描述一类系统通常如何组织和协作。

## 1. 软件架构风格概述

一个架构风格通常包含：

- <strong>词汇表：</strong>规定可使用的构件类型和连接件类型；
- <strong>约束：</strong>规定构件和连接件如何组合、如何交互；
- <strong>语义：</strong>说明这种组织方式所表达的系统行为和协作含义。

常见架构风格可以按核心组织方式分为五类：<strong>数据流风格、调用/返回风格、以数据为中心的风格、虚拟机风格和独立构件风格</strong>。

对应真题：<a class="question-ref" href="#q-styles-201311-29">#2013.11-29</a><a class="question-ref" href="#q-styles-201411-34">#2014.11-34</a><a class="question-ref" href="#q-styles-201511-29">#2015.11-29</a><a class="question-ref" href="#q-styles-201611-35">#2016.11-35</a><a class="question-ref" href="#q-styles-202311-22">#2023.11-22</a><a class="question-ref" href="#q-styles-202411-33">#2024.11-33</a><a class="question-ref" href="#q-styles-202605-70">#2026.05-70</a>

## 2. 典型架构风格与辨析

先看架构的<strong>核心组织方式</strong>，再看构件之间如何交互，以及数据或控制如何流动。

<div class="architecture-style-families">
  <section class="architecture-style-family">
    <div class="architecture-style-family-title">数据流</div>
    <div class="architecture-style-family-content">
      <p><strong>风格特点</strong><span class="architecture-style-key">执行取决于输入是否可用，顺序不预先确定</span></p>
      <p><strong>批处理</strong><span class="architecture-style-key">完整批次 + 严格串行；构件是独立程序</span></p>
      <p><strong>管道-过滤器</strong><span class="architecture-style-key">过滤器处理 + 管道传输；连续数据流，可并行</span></p>
    </div>
  </section>

  <section class="architecture-style-family">
    <div class="architecture-style-family-title">调用/返回</div>
    <div class="architecture-style-family-content">
      <p><strong>风格特点</strong><span class="architecture-style-key">调用/返回机制；分治，降低系统复杂度</span></p>
      <p><strong>主程序/子程序</strong><span class="architecture-style-key">主程序调用子程序；过程调用是连接件</span></p>
      <p><strong>面向对象</strong><span class="architecture-style-key">对象封装数据和操作</span></p>
      <p><strong>分层</strong><span class="architecture-style-key">上层调用下层、层间服务</span></p>
      <p><strong>客户机/服务器</strong><span class="architecture-style-key">客户请求 + 服务器服务；资源不对等</span></p>
      <p><strong>胖客户端</strong><span class="architecture-style-key">客户端承担更多业务逻辑和用户交互；瘦客户端更多依赖服务器</span></p>
      <p><strong>三层 C/S</strong><span class="architecture-style-key">表示层 + 功能层 + 数据层；B/S 是特殊的三层 C/S</span></p>
    </div>
  </section>

  <section class="architecture-style-family">
    <div class="architecture-style-family-title">以数据为中心</div>
    <div class="architecture-style-family-content">
      <p><strong>仓库</strong><span class="architecture-style-key">中央数据结构 + 独立构件读写</span></p>
      <p><strong>黑板</strong><span class="architecture-style-key">黑板 + 知识源 + 控制组件；适合复杂、非结构化问题</span></p>
      <p><strong>区别：</strong>仓库看<strong>共享数据状态</strong>；黑板看<strong>知识源协同求解</strong>。</p>
    </div>
  </section>

  <section class="architecture-style-family">
    <div class="architecture-style-family-title">虚拟机</div>
    <div class="architecture-style-family-content">
      <p><strong>风格特点</strong><span class="architecture-style-key">构造运行环境，解析和运行自定义语言</span></p>
      <p><strong>解释器</strong><span class="architecture-style-key">解释引擎 + 代码存储区 + 当前状态 + 执行进度；效率较低</span></p>
      <p><strong>规则系统</strong><span class="architecture-style-key">规则集 + 规则解释器 + 规则/数据选择器 + 工作内存</span></p>
      <p><strong>区别：</strong>解释器执行<strong>语言或脚本</strong>；规则系统执行<strong>可调整的业务规则</strong>。</p>
    </div>
  </section>

  <section class="architecture-style-family">
    <div class="architecture-style-family-title">独立构件</div>
    <div class="architecture-style-family-content">
      <p><strong>进程通信</strong><span class="architecture-style-key">独立进程 + 消息传递；点到点、同步/异步、RPC</span></p>
      <p><strong>事件系统</strong><span class="architecture-style-key">事件触发、间接调用；事件源不必知道处理者</span></p>
      <p><strong>C2</strong><span class="architecture-style-key">顶部/底部接口；构件不能直接连接，必须通过连接件</span></p>
    </div>
  </section>

  <section class="architecture-style-family">
    <div class="architecture-style-family-title">过程控制</div>
    <div class="architecture-style-family-content">
      <p><strong>核心</strong><span class="architecture-style-key">输入 → 处理 → 输出 → 反馈，形成闭环</span></p>
      <p><strong>判断</strong><span class="architecture-style-key">根据环境或结果不断调整状态，如空调控温、定速巡航</span></p>
    </div>
  </section>
</div>

对应真题：<a class="question-ref" href="#q-styles-201311-32">#2013.11-32</a><a class="question-ref" href="#q-styles-201511-12">#2015.11-12</a><a class="question-ref" href="#q-styles-201511-36">#2015.11-36</a><a class="question-ref" href="#q-styles-201511-37">#2015.11-37</a><a class="question-ref" href="#q-styles-201611-31">#2016.11-31</a><a class="question-ref" href="#q-styles-201611-34">#2016.11-34</a><a class="question-ref" href="#q-styles-201611-36">#2016.11-36</a><a class="question-ref" href="#q-styles-201611-37">#2016.11-37</a><a class="question-ref" href="#q-styles-201611-38">#2016.11-38</a><a class="question-ref" href="#q-styles-201711-34">#2017.11-34</a><a class="question-ref" href="#q-styles-201711-35">#2017.11-35</a><a class="question-ref" href="#q-styles-201711-36">#2017.11-36</a><a class="question-ref" href="#q-styles-201711-37">#2017.11-37</a><a class="question-ref" href="#q-styles-201811-34">#2018.11-34</a><a class="question-ref" href="#q-styles-201811-35">#2018.11-35</a><a class="question-ref" href="#q-styles-202011-10">#2020.11-10</a><a class="question-ref" href="#q-styles-202011-26">#2020.11-26</a><a class="question-ref" href="#q-styles-202111-35">#2021.11-35</a><a class="question-ref" href="#q-styles-202111-48">#2021.11-48</a><a class="question-ref" href="#q-styles-202211-42">#2022.11-42</a><a class="question-ref" href="#q-styles-202311-34">#2023.11-34</a><a class="question-ref" href="#q-styles-202311-43">#2023.11-43</a><a class="question-ref" href="#q-styles-202405-24">#2024.05-24</a><a class="question-ref" href="#q-styles-202405-25">#2024.05-25</a><a class="question-ref" href="#q-styles-202405-42">#2024.05-42</a><a class="question-ref" href="#q-styles-202405-43">#2024.05-43</a><a class="question-ref" href="#q-styles-202411-6">#2024.11-6</a><a class="question-ref" href="#q-styles-202411-44">#2024.11-44</a><a class="question-ref" href="#q-styles-202411-55">#2024.11-55</a><a class="question-ref" href="#q-styles-202505-14">#2025.05-14</a><a class="question-ref" href="#q-styles-202505-27">#2025.05-27</a><a class="question-ref" href="#q-styles-202505-55">#2025.05-55</a><a class="question-ref" href="#q-styles-202511-30">#2025.11-30</a><a class="question-ref" href="#q-styles-202511-40">#2025.11-40</a><a class="question-ref" href="#q-styles-202511-52">#2025.11-52</a><a class="question-ref" href="#q-styles-202511-53">#2025.11-53</a><a class="question-ref" href="#q-styles-202605-48">#2026.05-48</a><a class="question-ref" href="#q-styles-202605-50">#2026.05-50</a><a class="question-ref" href="#q-styles-202605-51">#2026.05-51</a>

## 历年真题

<QuestionBank :questions="styleQuestions" anchor-prefix="styles" compact hide-categories />
