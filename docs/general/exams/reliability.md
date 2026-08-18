<script setup>
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/reliability.json'
</script>

# 软件可靠性

本题库对应分类真题中的“系统可靠性”章节，页面名称按教材统一为“软件可靠性”。

<QuestionBank :questions="questionBank.questions" />
