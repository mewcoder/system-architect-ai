<script setup lang="ts">
import { computed } from 'vue'
import operatingSystemBank from '../../data/question-banks/os.json'
import englishBank from '../../data/question-banks/english.json'
import architectureBank from '../../data/question-banks/architecture.json'
import databaseBank from '../../data/question-banks/database.json'
import hardwareBank from '../../data/question-banks/hardware.json'
import networkBank from '../../data/question-banks/network.json'
import maintenanceBank from '../../data/question-banks/maintenance.json'
import informatizationBank from '../../data/question-banks/informatization.json'
import softwareBank from '../../data/question-banks/software.json'
import analysisBank from '../../data/question-banks/analysis.json'
import testingBank from '../../data/question-banks/testing.json'
import projectBank from '../../data/question-banks/project.json'
import securityBank from '../../data/question-banks/security.json'
import propertyBank from '../../data/question-banks/property.json'
import mathBank from '../../data/question-banks/math.json'
import reliabilityBank from '../../data/question-banks/reliability.json'

type View = 'knowledge' | 'exams'

type BankQuestion = {
  id: string
  subject: string
  exam: string
  question_no: number
  part_no: number
  category: string
  stem: string
}

type QuestionBankSource = {
  questions: BankQuestion[]
}

type Chapter = {
  id: string
  label: string
  depth: number
  knowledgeSlug?: string
  knowledgeNote?: string
  examSlug?: string
  bank: QuestionBankSource
}

type DuplicateGroup = {
  chapter: string
  exam: string
  questionNo: number
  records: Array<{
    category: string
    rowCount: number
    stem: string
  }>
}

const props = defineProps<{
  view: View
  linkBase?: string
}>()

const recentExamSet = new Set(['202411', '202505', '202511', '202605'])
const recentExamLabels = ['2024-11', '2025-05', '2025-11', '2026-05']

const chapters: Chapter[] = [
  { id: 'architecture', label: '系统架构设计', depth: 0, knowledgeSlug: 'architecture', knowledgeNote: '3 个文档', bank: architectureBank },
  { id: 'software', label: '软件工程', depth: 0, knowledgeSlug: 'software', knowledgeNote: '3 个文档', bank: softwareBank },
  { id: 'analysis', label: '系统分析与设计', depth: 1, knowledgeSlug: 'software', knowledgeNote: '并入软件工程', bank: analysisBank },
  { id: 'testing', label: '软件测试', depth: 1, knowledgeSlug: 'software', knowledgeNote: '并入软件工程', examSlug: 'software-testing', bank: testingBank },
  { id: 'reliability', label: '系统可靠性', depth: 1, knowledgeSlug: 'software', knowledgeNote: '并入软件工程', examSlug: 'reliability', bank: reliabilityBank },
  { id: 'maintenance', label: '系统运行与维护', depth: 1, knowledgeSlug: 'software', knowledgeNote: '并入软件工程', bank: maintenanceBank },
  { id: 'os', label: '操作系统', depth: 0, knowledgeSlug: 'os', bank: operatingSystemBank },
  { id: 'network', label: '计算机网络', depth: 0, knowledgeSlug: 'network', bank: networkBank },
  { id: 'database', label: '数据库系统', depth: 0, knowledgeSlug: 'database', bank: databaseBank },
  { id: 'english', label: '专业英语', depth: 0, bank: englishBank },
  { id: 'hardware', label: '计算机组成原理', depth: 0, knowledgeSlug: 'hardware-embedded', examSlug: 'hardware-embedded', bank: hardwareBank },
  { id: 'informatization', label: '企业信息化战略', depth: 0, knowledgeSlug: 'informatization', examSlug: 'informatization', bank: informatizationBank },
  { id: 'project', label: '项目管理', depth: 0, knowledgeSlug: 'project', bank: projectBank },
  { id: 'security', label: '信息安全', depth: 0, knowledgeSlug: 'security', examSlug: 'security', bank: securityBank },
  { id: 'property', label: '法律法规与标准化', depth: 0, knowledgeSlug: 'property', knowledgeNote: '知识产权页面', examSlug: 'property', bank: propertyBank },
  { id: 'math', label: '数学与经济管理', depth: 0, knowledgeSlug: 'math', bank: mathBank }
]

const duplicateGroups: DuplicateGroup[] = chapters.flatMap((chapter) => {
  const grouped = new Map<string, BankQuestion[]>()
  for (const question of chapter.bank.questions) {
    const key = `${question.exam}-${question.question_no}`
    grouped.set(key, [...(grouped.get(key) ?? []), question])
  }

  return Array.from(grouped.values()).flatMap((questions) => {
    const byCategory = new Map<string, BankQuestion[]>()
    for (const question of questions) {
      byCategory.set(question.category, [...(byCategory.get(question.category) ?? []), question])
    }
    if (byCategory.size < 2) return []

    const first = questions[0]
    return [{
      chapter: chapter.label,
      exam: first.exam,
      questionNo: first.question_no,
      records: Array.from(byCategory.entries()).map(([category, rows]) => ({
        category,
        rowCount: rows.length,
        stem: rows[0].stem
      }))
    }]
  })
})

function questionKey(question: BankQuestion) {
  return `${question.exam}-${question.question_no}`
}

function questionKeys(bank: QuestionBankSource, recentOnly = false) {
  return new Set(
    bank.questions
      .filter((question) => !recentOnly || recentExamSet.has(question.exam))
      .map(questionKey)
  )
}

const rows = computed(() => chapters.map((chapter) => ({
  ...chapter,
  totalCount: questionKeys(chapter.bank).size,
  recentCount: questionKeys(chapter.bank, true).size,
  bankRowCount: chapter.bank.questions.length
})))

const allQuestionKeys = computed(() => {
  const keys = new Set<string>()
  for (const chapter of chapters) {
    for (const key of questionKeys(chapter.bank)) keys.add(key)
  }
  return keys
})

const recentQuestionKeys = computed(() => {
  const keys = new Set<string>()
  for (const chapter of chapters) {
    for (const key of questionKeys(chapter.bank, true)) keys.add(key)
  }
  return keys
})

const allQuestionTotal = computed(() => allQuestionKeys.value.size)
const recentTotal = computed(() => recentQuestionKeys.value.size)
const bankRowTotal = computed(() => rows.value.reduce((total, row) => total + row.bankRowCount, 0))
const maxRecentCount = computed(() => Math.max(...rows.value.map((row) => row.recentCount), 1))
const maxTotalCount = computed(() => Math.max(...rows.value.map((row) => row.totalCount), 1))

function barWidth(value: number, max: number) {
  return `${(value / max) * 100}%`
}

function sectionHref(slug: string) {
  return `${props.linkBase ?? './'}${slug}`
}

function rowHref(row: Chapter) {
  const slug = props.view === 'knowledge' ? row.knowledgeSlug : row.examSlug
  return slug ? sectionHref(slug) : ''
}

function rowStatus(row: Chapter) {
  if (props.view === 'knowledge') return row.knowledgeSlug ? (row.knowledgeNote ?? '已整理') : '待整理'
  return row.examSlug ? '已收录' : '待补充'
}
</script>

<template>
  <section class="chapter-overview" :data-overview="props.view">
    <div class="chapter-overview-heading">
      <div>
        <p class="chapter-overview-eyebrow">完整模块目录</p>
        <h2>章节题量对照</h2>
      </div>
      <p>共列出 {{ rows.length }} 个模块；总数和近 4 场数量都直接来自各模块 JSON。</p>
    </div>

    <div class="chapter-overview-summary" aria-label="统计小结">
      <div class="chapter-overview-summary-item"><strong>{{ allQuestionTotal }}</strong><span>真题总数（按题号）</span></div>
      <div class="chapter-overview-summary-item"><strong>{{ recentTotal }}</strong><span>近 4 场题量</span></div>
      <div class="chapter-overview-summary-item"><strong>{{ bankRowTotal }}</strong><span>原始记录（含分值）</span></div>
    </div>

    <div class="chapter-overview-table-wrap">
      <table class="chapter-overview-table">
        <colgroup>
          <col class="chapter-overview-table-col-index">
          <col class="chapter-overview-table-col-module">
          <col class="chapter-overview-table-col-total">
          <col class="chapter-overview-table-col-recent">
          <col class="chapter-overview-table-col-action">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">模块</th>
            <th scope="col">全部真题</th>
            <th scope="col">近 4 场题量</th>
            <th scope="col"><span class="sr-only">操作</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="row.id" :class="{ 'is-child': row.depth > 0 }">
            <td class="chapter-overview-index">{{ String(index + 1).padStart(2, '0') }}</td>
            <th scope="row" class="chapter-overview-module">
              <a v-if="rowHref(row)" :href="rowHref(row)">
                <span :style="{ paddingLeft: `${row.depth * 18}px` }">{{ row.label }}</span>
                <small>{{ rowStatus(row) }}</small>
              </a>
              <span v-else :style="{ paddingLeft: `${row.depth * 18}px` }">
                {{ row.label }}<small>{{ rowStatus(row) }}</small>
              </span>
            </th>
            <td class="chapter-overview-total">
              <strong>{{ row.totalCount }}</strong><span>题</span>
              <i><b :style="{ width: barWidth(row.totalCount, maxTotalCount) }"></b></i>
            </td>
            <td class="chapter-overview-recent">
              <strong>{{ row.recentCount }}</strong><span>题</span>
              <i><b :style="{ width: barWidth(row.recentCount, maxRecentCount) }"></b></i>
            </td>
            <td class="chapter-overview-action">
              <a v-if="rowHref(row)" :href="rowHref(row)">进入 <span aria-hidden="true">→</span></a>
              <span v-else>待整理</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="chapter-overview-note">
      真题总数从 16 个模块 JSON 中按“考试批次 + 题号”统计；近 4 场从同一批 JSON 中筛选 {{ recentExamLabels.join('、') }}，所以近 4 场不会再叠加到总数里。模块记录共 {{ bankRowTotal }} 条，同一道题的不同分值会拆成多条记录，但统计题量只算一次。
    </p>

    <details v-if="duplicateGroups.length" class="chapter-overview-duplicates">
      <summary>
        <span><b>数据校对记录</b><small>同一大章内，同考试、同题号、不同分类</small></span>
        <strong>{{ duplicateGroups.length }} 组</strong>
      </summary>
      <div class="chapter-overview-duplicates-body">
        <p>下面记录在 JSON 中全部保留；总数统计按题号只计一次，避免页面重复出现。</p>
        <ul class="chapter-overview-duplicate-list">
          <li v-for="group in duplicateGroups" :key="`${group.chapter}-${group.exam}-${group.questionNo}`">
            <div class="chapter-overview-duplicate-title">{{ group.chapter }} · {{ group.exam }} · 第 {{ group.questionNo }} 题</div>
            <div v-for="record in group.records" :key="record.category" class="chapter-overview-duplicate-record">
              <strong>{{ record.category }}</strong><span>保留 {{ record.rowCount }} 条记录</span>
              <p>{{ record.stem }}</p>
            </div>
          </li>
        </ul>
      </div>
    </details>
  </section>
</template>
