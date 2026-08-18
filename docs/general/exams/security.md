<script setup>
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/security.json'
</script>

# 信息安全

<QuestionBank :questions="questionBank.questions" />
