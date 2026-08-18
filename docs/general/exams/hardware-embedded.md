<script setup lang="ts">
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/hardware.json'

const categoryChapters: Record<string, string> = {
  嵌入式: '嵌入式',
  流水线: '计算机组成',
  存储器: '计算机组成',
  '总线技术': '计算机组成',
  'CPU 性能参数': '计算机组成',
  '数据校验与 CRC': '计算机组成',
  '输入输出与 DMA': '计算机组成',
  指令系统: '计算机组成',
  存储器系统: '计算机组成',
  'AI 芯片': '其他'
}
</script>

# 硬件与嵌入式

本题库依据分类真题中的“第 5 章——计算机组成原理”整理，共<strong>25 道真题</strong>、27 条分值记录。页面按真题内容归为三类：<strong>嵌入式</strong> 10 题、<strong>计算机组成</strong> 14 题、<strong>其他</strong> 1 题。

“其他”暂收独立成节的 AI 芯片题；题目列表仍保留原资料中的细分类别，便于按流水线、存储器、DMA 等具体考点练习。

<QuestionBank :questions="questionBank.questions" :category-chapters="categoryChapters" />
