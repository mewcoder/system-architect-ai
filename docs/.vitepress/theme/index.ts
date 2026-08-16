import DefaultTheme from 'vitepress/theme'
import ExamPointAnalysis from './ExamPointAnalysis.vue'
import ExamTimeline from './ExamTimeline.vue'
import Home from './Home.vue'
import Layout from './Layout.vue'
import ScoreDonut from './ScoreDonut.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ExamPointAnalysis', ExamPointAnalysis)
    app.component('ExamTimeline', ExamTimeline)
    app.component('ArchitectHome', Home)
    app.component('ScoreDonut', ScoreDonut)
  }
}
