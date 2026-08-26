<script setup lang="ts">
import QuestionBank from '../../../.vitepress/theme/QuestionBank.vue'
import { selectQuestions } from '../../../.vitepress/theme/questionBankUtils'
import questionBank from '../../../data/question-banks/hardware.json'

const compilerQuestions = selectQuestions(questionBank.questions, ['202605-49', '202605-66'])
</script>

# 其他

## 编译原理

```text
源程序 → 词法分析 → 语法分析 → 语义分析 → 中间代码生成 → 代码优化 → 目标代码生成
```

## 真题

<details class="chapter-question-bank">
<summary class="chapter-question-bank-summary">
  <span class="chapter-question-bank-note">{{ compilerQuestions.length }} 道题</span>
  <span class="chapter-question-bank-action">
    <span class="chapter-question-bank-expand-label">展开</span>
    <span class="chapter-question-bank-collapse-label">收起</span>
  </span>
</summary>

<div class="chapter-question-bank-body">
  <QuestionBank :questions="compilerQuestions" compact hide-categories />
</div>
</details>
