<script setup>
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/信息安全.json'
</script>

# 信息安全

<QuestionBank :questions="questionBank.questions" />
