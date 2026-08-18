<script setup>
import QuestionBank from '../../.vitepress/theme/QuestionBank.vue'
import questionBank from '../../data/question-banks/testing.json'

const chapterByCategory = {
  '软件测试基础': '第1章 软件测试基础与过程',
  '测试用例与测试过程': '第1章 软件测试基础与过程',
  '测试阶段与文档依据': '第1章 软件测试基础与过程',
  '黑盒测试': '第2章 测试方法与覆盖度量',
  '白盒测试': '第2章 测试方法与覆盖度量',
  '灰盒测试': '第2章 测试方法与覆盖度量',
  '静态测试': '第2章 测试方法与覆盖度量',
  '软件调试': '第2章 测试方法与覆盖度量',
  '测试覆盖与度量': '第2章 测试方法与覆盖度量',
  '单元测试': '第3章 测试级别与测试策略',
  '集成测试': '第3章 测试级别与测试策略',
  '系统测试': '第3章 测试级别与测试策略',
  '确认与验收测试': '第3章 测试级别与测试策略',
  '回归测试': '第3章 测试级别与测试策略',
  '自动化测试': '第4章 自动化与 Web 测试',
  'Web 测试与 A/B 测试': '第4章 自动化与 Web 测试',
  '性能测试': '第5章 性能测试'
}
</script>

# 软件测试

<QuestionBank
  :questions="questionBank.questions"
  :category-chapters="chapterByCategory"
/>
