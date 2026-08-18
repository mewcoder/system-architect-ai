<script setup>
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/informatization.json'
</script>

# 信息化

<QuestionBank :questions="questionBank.questions" />
