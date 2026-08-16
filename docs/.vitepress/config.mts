import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '系统架构师备考',
  description: '系统架构设计师备考笔记、真题与方法实验',
  base: '/system-architect-ai/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#f3eee6' }],
    ['link', { rel: 'icon', href: '/system-architect-ai/favicon.svg' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '总览', link: '/start/' },
      { text: '综合知识', link: '/general/' },
      { text: '案例', link: '/case/' },
      { text: '论文', link: '/thesis/' }
    ],
    sidebar: {
      '/start/': [
        {
          text: '总览',
          items: [
            { text: '考试介绍', link: '/start/' },
            { text: '考情分析', link: '/start/analysis' }
          ]
        }
      ],
      '/general/': [
        {
          text: '综合知识',
          items: [
            { text: '总览', link: '/general/' },
            {
              text: '考点',
              collapsed: false,
              items: [
                { text: '总览', link: '/general/points/' },
                { text: '202605', link: '/general/points/202605' },
                { text: '202511', link: '/general/points/202511' },
                { text: '202505', link: '/general/points/202505' },
                { text: '202411', link: '/general/points/202411' }
              ]
            },
            {
              text: '知识',
              collapsed: false,
              items: [
                { text: '总览', link: '/general/knowledge/' },
                { text: '计算机系统', link: '/general/knowledge/system' },
                { text: '软件工程', link: '/general/knowledge/software' },
                { text: '系统架构设计', link: '/general/knowledge/architecture' },
                { text: '信息化与企业信息系统', link: '/general/knowledge/informationization' }
              ]
            },
            {
              text: '真题',
              collapsed: false,
              items: [
                { text: '总览', link: '/general/exams/' },
                { text: '知识产权', link: '/general/exams/legal' },
                { text: '信息化', link: '/general/exams/enterprise' }
              ]
            }
          ]
        }
      ],
      '/case/': [
        {
          text: '案例',
          items: [
            { text: '总览', link: '/case/' },
            { text: '真题', link: '/case/exams/' },
            { text: '考点', link: '/case/points/' },
            { text: '知识', link: '/case/knowledge/' }
          ]
        }
      ],
      '/thesis/': [
        {
          text: '论文',
          items: [
            { text: '总览', link: '/thesis/' },
            { text: '真题', link: '/thesis/exams/' },
            { text: '考点', link: '/thesis/points/' },
            { text: '知识', link: '/thesis/knowledge/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/mewcoder/system-architect-ai' }
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'medium' } },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',
    notFound: {
      title: '页面还在搭建中',
      quote: '这条知识路径尚未记录，先回到学习地图继续。',
      linkLabel: '返回首页',
      linkText: '回到学习台'
    },
    footer: {
      copyright: 'Copyright © 2026 mewcoder'
    }
  }
})
