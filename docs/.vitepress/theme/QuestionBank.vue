<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

type Question = {
  id: string
  subject: string
  category: string
  exam: string
  question_no: number
  part_no: number
  stem: string
  options: Record<string, string>
  answer: string | null
  explanation: string | null
}

type QuestionGroup = {
  key: string
  subject: string
  category: string
  exam: string
  question_no: number
  stem: string
  parts: Question[]
}

const props = defineProps<{
  questions: Question[]
}>()

const query = ref('')
const examFilter = ref('all')
const categoryFilter = ref('all')
const overviewMode = ref('category')
const userAnswers = ref<Record<string, string>>({})

const exams = computed(() => [
  'all',
  ...Array.from(new Set(props.questions.map((question) => question.exam))).sort().reverse()
])

const categories = computed(() => [
  'all',
  ...Array.from(new Set(props.questions.map((question) => question.category))).sort()
])

function questionKey(question: Question) {
  return question.exam + '-' + question.question_no
}

const categoryStats = computed(() => {
  const counts = new Map<string, number>()
  const seen = new Set<string>()
  for (const question of props.questions) {
    const key = questionKey(question) + '-' + question.category
    if (seen.has(key)) continue
    seen.add(key)
    counts.set(question.category, (counts.get(question.category) ?? 0) + 1)
  }
  return Array.from(counts, ([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label))
})

const batchStats = computed(() => {
  const counts = new Map<string, number>()
  const seen = new Set<string>()
  for (const question of props.questions) {
    const key = questionKey(question)
    if (seen.has(key)) continue
    seen.add(key)
    counts.set(question.exam, (counts.get(question.exam) ?? 0) + 1)
  }
  return Array.from(counts, ([label, value]) => ({ label, value }))
    .sort((a, b) => a.label.localeCompare(b.label))
})

const overviewRows = computed(() =>
  overviewMode.value === 'category' ? categoryStats.value : batchStats.value
)

const overviewMax = computed(() =>
  Math.max(...overviewRows.value.map((row) => row.value), 1)
)

const totalQuestionCount = computed(() => {
  return new Set(props.questions.map(questionKey)).size
})

const filteredQuestions = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  return props.questions.filter((question) => {
    const matchesExam = examFilter.value === 'all' || question.exam === examFilter.value
    const matchesCategory =
      categoryFilter.value === 'all' || question.category === categoryFilter.value
    const searchable = [
      question.stem,
      question.explanation ?? '',
      ...Object.values(question.options)
    ].join(' ').toLowerCase()
    return matchesExam && matchesCategory && (!keyword || searchable.includes(keyword))
  })
})

const groupedQuestions = computed<QuestionGroup[]>(() => {
  const groups = new Map<string, QuestionGroup>()
  for (const question of filteredQuestions.value) {
    const key = question.subject + '-' + question.exam + '-' + question.question_no + '-' + question.category
    const existing = groups.get(key)
    if (existing) {
      existing.parts.push(question)
      continue
    }
    groups.set(key, {
      key,
      subject: question.subject,
      category: question.category,
      exam: question.exam,
      question_no: question.question_no,
      stem: question.stem,
      parts: [question]
    })
  }
  return Array.from(groups.values())
})

function examLabel(exam: string) {
  return exam.slice(0, 4) + ' 年 ' + Number(exam.slice(4)) + ' 月'
}

function barWidth(value: number) {
  return (value / overviewMax.value) * 100 + '%'
}

function barHeight(value: number) {
  return (value / overviewMax.value) * 100 + '%'
}

function batchShortLabel(exam: string) {
  return exam.slice(2)
}

function selectedAnswer(question: Question) {
  return userAnswers.value[question.id] ?? null
}

function isAnswered(question: Question) {
  return selectedAnswer(question) !== null
}

function isCorrect(question: Question) {
  return selectedAnswer(question) === question.answer
}

function chooseOption(question: Question, key: string) {
  if (isAnswered(question)) return
  userAnswers.value = { ...userAnswers.value, [question.id]: key }
}

function clearAnswer(question: Question) {
  const nextAnswers = { ...userAnswers.value }
  delete nextAnswers[question.id]
  userAnswers.value = nextAnswers
}

function renderMarkdown(value: string | null) {
  if (!value) return ''
  const escaped = value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
  return escaped
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (_, alt: string, source: string) => {
        const src = /^(?:https?:|data:|\/system-architect-ai\/)/.test(source)
          ? source
          : withBase('/' + source.replace(/^\/+/, ''))
        return `<img class="question-image" src="${src}" alt="${alt}" loading="lazy">`
      }
    )
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
}
</script>

<template>
<div class="question-bank">
  <div class="question-bank-overview">
    <div class="question-bank-overview-head">
      <div class="question-bank-tabs" role="tablist" aria-label="题目统计">
        <button
          type="button"
          :class="{ 'is-active': overviewMode === 'category' }"
          @click="overviewMode = 'category'"
        >
          分类
        </button>
        <button
          type="button"
          :class="{ 'is-active': overviewMode === 'batch' }"
          @click="overviewMode = 'batch'"
        >
          考试批次
        </button>
      </div>
      <div class="question-bank-total">
        <strong>{{ totalQuestionCount }}</strong>
        <span>总题目数</span>
      </div>
    </div>
    <div v-if="overviewMode === 'category'" class="question-bank-chart">
      <div v-for="row in overviewRows" :key="row.label" class="question-bank-chart-row">
        <span class="question-bank-chart-label">{{ row.label }}</span>
        <span class="question-bank-chart-track">
          <span class="question-bank-chart-bar" :style="{ width: barWidth(row.value) }"></span>
        </span>
        <strong>{{ row.value }}</strong>
      </div>
    </div>
    <div v-else class="question-bank-batch-chart">
      <div v-for="row in overviewRows" :key="row.label" class="question-bank-batch-column">
        <span class="question-bank-batch-track">
          <span class="question-bank-batch-bar-wrap" :style="{ height: barHeight(row.value) }">
            <strong>{{ row.value }}</strong>
            <span class="question-bank-batch-bar"></span>
          </span>
        </span>
        <span class="question-bank-batch-label">{{ batchShortLabel(row.label) }}</span>
      </div>
    </div>
  </div>

  <div class="question-bank-toolbar">
    <label>
      <span>考试批次</span>
      <select v-model="examFilter">
        <option v-for="exam in exams" :key="exam" :value="exam">
          {{ exam === 'all' ? '全部批次' : examLabel(exam) }}
        </option>
      </select>
    </label>
    <label>
      <span>分类</span>
      <select v-model="categoryFilter">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category === 'all' ? '全部分类' : category }}
        </option>
      </select>
    </label>
    <label class="question-bank-search">
      <span>搜索</span>
      <input v-model="query" type="search" placeholder="搜索题干、选项或解析" />
    </label>
  </div>

  <div class="question-bank-list">
    <article v-for="group in groupedQuestions" :key="group.key" class="question-card">
      <div class="question-card-meta">
        <span>
          {{ examLabel(group.exam) }} - {{ group.question_no }} 题
        </span>
        <span>{{ group.category }}</span>
      </div>
      <div class="question-stem" v-html="renderMarkdown(group.stem)"></div>
      <div
        v-for="part in group.parts"
        :key="part.id"
        class="question-part"
      >
        <div v-if="group.parts.length > 1" class="question-part-label">
          问题{{ part.part_no }}
        </div>
        <div class="question-options">
          <button
            v-for="(text, key) in part.options"
            :key="key"
            type="button"
            class="question-option"
            :class="{
              'is-selected': selectedAnswer(part) === key,
              'is-correct': isAnswered(part) && key === part.answer,
              'is-wrong': isAnswered(part) && selectedAnswer(part) === key && key !== part.answer
            }"
            :disabled="isAnswered(part)"
            @click="chooseOption(part, key)"
          >
            <b>{{ key }}</b>
            <span>{{ text }}</span>
          </button>
        </div>
        <div
          v-if="isAnswered(part)"
          class="question-feedback"
          :class="{ 'is-correct': isCorrect(part), 'is-wrong': !isCorrect(part) }"
        >
          <p class="question-answer-key">正确答案：{{ part.answer || '待补充' }}</p>
          <div v-if="part.explanation" v-html="renderMarkdown(part.explanation)"></div>
          <button type="button" class="question-clear" @click="clearAnswer(part)">
            清除作答并隐藏解析
          </button>
        </div>
      </div>
    </article>
  </div>

  <p v-if="groupedQuestions.length === 0" class="question-bank-empty">
    没有匹配的题目，换一个关键词或考试批次试试。
  </p>
</div>
</template>
