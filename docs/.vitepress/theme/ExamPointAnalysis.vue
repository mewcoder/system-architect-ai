<script setup lang="ts">
import { computed, ref } from 'vue'
import examDatasets from '../../data/exam-points.json'

interface ExamQuestion {
  no: number
  chapter: string
  topic: string
  outOfScope?: boolean
}

interface ExamDataset {
  exam: string
  subject: string
  questions: ExamQuestion[]
  chapterCounts?: Record<string, number>
}

type ExamKey = '2024-11' | '2025-05' | '2025-11' | '2026-05'

const props = withDefaults(defineProps<{ exam?: ExamKey }>(), { exam: '2024-11' })
const examData = (examDatasets as Record<ExamKey, ExamDataset>)[props.exam]
const questions = computed(() => examData.questions.slice().sort((a, b) => a.no - b.no))
const selectedChapter = ref<string | null>(null)

const chapterStats = computed(() => {
  const counts = new Map<string, number>(Object.entries(examData.chapterCounts ?? {}))
  questions.value.forEach((question) => counts.set(question.chapter, (counts.get(question.chapter) ?? 0) + 1))
  return Array.from(counts, ([name, count]) => ({
    name,
    count
  })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'))
})

const selectedPoints = computed(() => selectedChapter.value === null
  ? questions.value
  : questions.value.filter((question) => question.chapter === selectedChapter.value))

function formatNumber(value: number) {
  return String(value).padStart(2, '0')
}
</script>

<template>
  <div class="exam-analysis">
    <header class="analysis-header">
      <div>
        <p class="analysis-eyebrow">{{ examData.exam.replace('-', '') }} · {{ examData.subject }}</p>
        <h2>考点分布</h2>
      </div>
      <div class="analysis-summary">
        <p><strong>{{ questions.length }}</strong> 题 · {{ chapterStats.length }} 个章节</p>
      </div>
    </header>

    <div class="analysis-layout">
      <nav class="chapter-ratio" aria-label="章节占比">
        <button
          type="button"
          :class="{ active: selectedChapter === null }"
          :aria-pressed="selectedChapter === null"
          @click="selectedChapter = null"
        >
          <span class="ratio-label">
            <span>全部</span>
            <strong>{{ questions.length }}</strong>
          </span>
        </button>
        <button
          v-for="chapter in chapterStats"
          :key="chapter.name"
          type="button"
          :class="{ active: selectedChapter === chapter.name }"
          :aria-pressed="selectedChapter === chapter.name"
          @click="selectedChapter = chapter.name"
        >
          <span class="ratio-label">
            <span>{{ chapter.name }}</span>
            <strong>{{ chapter.count }}</strong>
          </span>
        </button>
      </nav>

      <section class="point-panel" aria-live="polite">
        <ol class="point-list">
          <li v-for="point in selectedPoints" :key="`${point.chapter}-${point.no}`" :class="{ 'out-of-scope': point.outOfScope }">
            <small>{{ formatNumber(point.no) }}</small>
            <span>{{ point.topic }}</span>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>

<style scoped>
.exam-analysis {
  margin: 28px 0 48px;
  color: var(--vp-c-text-1);
}

.analysis-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.analysis-eyebrow {
  margin: 0 0 7px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 700;
}

.analysis-header h2 {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 22px;
  line-height: 1.3;
}

.analysis-summary > p {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.analysis-summary > p strong {
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 18px;
}

.analysis-layout {
  display: grid;
  grid-template-columns: minmax(210px, .78fr) minmax(320px, 1.22fr);
  align-items: start;
  gap: 38px;
  padding-top: 16px;
}

.chapter-ratio {
  display: grid;
  align-content: start;
}

.chapter-ratio button {
  min-height: 34px;
  padding: 6px 8px;
  border: 0;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-divider) 68%, transparent);
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-2);
  text-align: left;
  cursor: pointer;
  transition: background .16s ease, color .16s ease;
}

.chapter-ratio button:hover,
.chapter-ratio button.active {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.ratio-label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
  font-weight: 600;
}

.ratio-label strong {
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
}

.chapter-ratio button.active .ratio-label strong {
  color: var(--vp-c-brand-1);
}

.point-panel {
  min-width: 0;
  padding-left: 28px;
  border-left: 1px solid var(--vp-c-divider);
}

.point-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.point-list li {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  align-items: baseline;
  gap: 8px;
  min-width: 0;
  padding: 5px 0;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-divider) 68%, transparent);
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.4;
}

.point-list li + li {
  margin-top: 0;
}

.point-list small {
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  font-weight: 700;
}

.point-list li.out-of-scope small,
.point-list li.out-of-scope > span {
  color: var(--vp-c-brand-1);
}

@media (max-width: 720px) {
  .analysis-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .point-panel {
    padding: 24px 0 0;
    border-top: 1px solid var(--vp-c-divider);
    border-left: 0;
  }
}

@media (max-width: 440px) {
  .analysis-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .point-list {
    grid-template-columns: 1fr;
  }
}
</style>
