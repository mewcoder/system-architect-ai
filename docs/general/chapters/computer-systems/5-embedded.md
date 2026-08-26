<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../../data/question-banks/hardware.json'

const questions = questionBank.questions.filter((question) => question.category === '嵌入式')
const questionCount = new Set(questions.map((question) => `${question.exam}-${question.question_no}`)).size
const examStats = [...new Set(questions.map((question) => question.exam))]
  .sort()
  .reverse()
  .map((exam) => ({
    exam,
    label: `${exam.slice(0, 4)} 年 ${Number(exam.slice(4))} 月`,
    count: new Set(
      questions
        .filter((question) => question.exam === exam)
        .map((question) => `${question.exam}-${question.question_no}`)
    ).size
  }))
const examMax = Math.max(...examStats.map((batch) => batch.count), 1)
</script>

# 嵌入式系统

> 2023 年之后，嵌入式系统通常每年考<strong>1～2 分</strong>，整体难度不大，以基础性、概念性考查为主，部分题目可以结合题干和基本原理推理，不需要投入过多时间准备。

## 历年真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ questionCount }} 道题</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <div class="chapter-question-bank-chart">
    <div
      v-for="batch in examStats"
      :key="batch.exam"
      class="question-bank-chart-row"
    >
      <span class="question-bank-chart-label">{{ batch.label }}</span>
      <span class="question-bank-chart-track">
        <span
          class="question-bank-chart-bar"
          :style="{ width: `${(batch.count / examMax) * 100}%` }"
        ></span>
      </span>
      <strong>{{ batch.count }}</strong>
    </div>
  </div>
  <QuestionBank :questions="questions" compact hide-categories />
</div>

</details>
