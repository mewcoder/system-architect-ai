import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '系统架构师备考',
  description: '基于 AI Agent 的系统架构设计师备考笔记、真题与方法实验',
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
      { text: '总览', link: '/start/intro' },
      { text: '综合知识', link: '/general-knowledge/overview' },
      { text: '案例', link: '/practice/case' },
      { text: '论文', link: '/practice/thesis' },
      { text: '真题', link: '/exam/202505' }
    ],
    sidebar: {
      '/start/': [
        {
          text: '总览',
          items: [
            { text: '考试介绍', link: '/start/intro' },
            { text: '2026 下考情分析', link: '/start/2026-second-half-analysis' },
            {
              text: '综合知识考点分析',
              collapsed: false,
              items: [
                { text: '总览', link: '/start/choice-points-overview' },
                { text: '202605', link: '/start/202605-choice-points' },
                { text: '202511', link: '/start/202511-choice-points' },
                { text: '202505', link: '/start/202505-choice-points' },
                { text: '202411', link: '/start/202411-choice-points' }
              ]
            }
          ]
        }
      ],
      '/general-knowledge/': [
        {
          text: '综合知识',
          items: [
            { text: '考点地图', link: '/general-knowledge/overview' },
            { text: '计算机系统', link: '/general-knowledge/computer-system' },
            { text: '软件工程', link: '/general-knowledge/software-engineering' },
            { text: '系统架构设计', link: '/general-knowledge/system-architecture' }
          ]
        }
      ],
      '/practice/': [
        {
          text: '案例与论文',
          items: [
            { text: '案例分析', link: '/practice/case' },
            { text: '论文写作', link: '/practice/thesis' }
          ]
        }
      ],
      '/exam/': [
        {
          text: '真题',
          items: [{ text: '2025 年 5 月', link: '/exam/202505' }]
        }
      ],
      '/ai/': [
        {
          text: 'AI 备考实验',
          items: [{ text: '学习闭环', link: '/ai/workflow' }]
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
