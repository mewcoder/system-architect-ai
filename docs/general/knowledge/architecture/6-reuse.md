<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions, summarizeQuestionBank } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/architecture.json'

const reuseQuestions = selectQuestions(questionBank.questions, [
  '202411-39',
  '202405-21',
  '202311-15',
  '202211-43',
  '202211-44',
])

const reuseTrend = summarizeQuestionBank(reuseQuestions)
</script>

# 软件架构复用

> <strong>考试趋势：</strong>本章平均每年约<strong>{{ reuseTrend.annualAverageLabel }} 分</strong>。
>
> - 架构复用属于低频补充主题，当前题库的记录主要集中在 2022～2024 年；复习以核心概念和过程判断为主，不必投入与架构风格、质量属性相同的时间。
> - 重点区分<strong>机会复用与系统复用</strong>，并掌握可复用资产的构造/获取、管理、使用三个阶段及软件产品线、核心资产等术语。

软件架构复用是对已有<strong>软件资产</strong>的重复利用，以提高开发效率、降低开发成本。可复用资产包括需求、架构、构件和设计模式等。

## 1. 复用基础与复用对象

软件架构复用按是否提前规划，主要分为两类：

- <strong>机会复用：</strong>开发过程中发现已有可复用资产后再进行复用，属于被动式、非前置规划的复用。
- <strong>系统复用：</strong>在项目开发之前就规划复用对象，决定哪些系统、子系统或大粒度架构资产可以复用，属于主动式复用。

复用对象可以是<strong>需求、架构、构件、设计模式和测试资产</strong>等。面向一组相关产品建立共性架构和可复用资产时，称为<strong>软件产品线</strong>；其中可在多个产品中复用的资产称为<strong>核心资产</strong>。

判断要点：<strong>开发中发现后复用 → 机会复用；开发前规划 → 系统复用</strong>。

对应真题：<a class="question-ref" href="#q-reuse-202311-15">#2023.11-15</a><a class="question-ref" href="#q-reuse-202211-43">#2022.11-43</a>

## 2. 复用过程

软件复用的基本过程按顺序分为三个阶段：

- <strong>构造/获取可复用资产：</strong>自行构造符合复用要求的资产，或从商业软件、开源社区等渠道获取合适资产。这是复用过程的起点。
- <strong>管理可复用资产：</strong>对资产进行分类、归档、索引和版本控制，完善文档并建立检索机制，使资产易查找、易理解、易维护。
- <strong>使用可复用资产：</strong>根据新系统需求筛选、适配和集成已有资产，使复用真正落地。

题目出现“构造恰当的、可复用的资产”时，选<strong>构造/获取</strong>；出现“分类、索引、版本、文档、检索”时，选<strong>管理</strong>。

对应真题：<a class="question-ref" href="#q-reuse-202411-39">#2024.11-39</a><a class="question-ref" href="#q-reuse-202405-21">#2024.05-21</a><a class="question-ref" href="#q-reuse-202211-44">#2022.11-44</a>

## 历年真题

<QuestionBank :questions="reuseQuestions" anchor-prefix="reuse" compact hide-categories />
