<script setup>
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/property.json'
</script>

# 知识产权

<QuestionBank :questions="questionBank.questions" />
