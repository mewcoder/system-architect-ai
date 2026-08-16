<script setup>
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/知识产权.json'
</script>

# 知识产权

<QuestionBank :questions="questionBank.questions" />
