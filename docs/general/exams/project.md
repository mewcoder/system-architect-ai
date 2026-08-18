<script setup lang="ts">
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/project.json'
</script>

# 项目管理

本页题目来自分类真题 JSON，按考试批次、题号和分类进行练习。

<QuestionBank :questions="questionBank.questions" />
