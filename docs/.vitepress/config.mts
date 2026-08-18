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
              text: '系统架构设计',
              collapsed: false,
              items: [
                {
                  text: '知识',
                  collapsed: true,
                  items: [
                    { text: '总览', link: '/general/knowledge/architecture' },
                    { text: '文档 1：架构基础与风格', link: '/general/knowledge/architecture/foundation-style' },
                    { text: '文档 2：分布式服务与质量', link: '/general/knowledge/architecture/distributed-quality' },
                    { text: '文档 3：架构开发与领域架构', link: '/general/knowledge/architecture/development-domain' }
                  ]
                },
                {
                  text: '真题',
                  collapsed: true,
                  items: [
                    { text: '系统架构设计', link: '/general/exams/architecture' }
                  ]
                }
              ]
            },
            {
              text: '软件工程',
              collapsed: false,
              items: [
                {
                  text: '知识',
                  collapsed: true,
                  items: [
                    { text: '总览', link: '/general/knowledge/software' },
                    { text: '文档 1：开发过程、需求与分析', link: '/general/knowledge/software/process-analysis' },
                    { text: '文档 2：设计、模式与构件复用', link: '/general/knowledge/software/design-reuse' },
                    { text: '文档 3：测试、质量与维护', link: '/general/knowledge/software/testing-maintenance' }
                  ]
                },
                {
                  text: '真题',
                  collapsed: true,
                  items: [
                    { text: '软件工程', link: '/general/exams/software' },
                    { text: '系统分析与设计', link: '/general/exams/analysis' },
                    { text: '软件测试', link: '/general/exams/software-testing' },
                    { text: '软件可靠性', link: '/general/exams/reliability' },
                    { text: '系统运行与维护', link: '/general/exams/maintenance' }
                  ]
                }
              ]
            },
            {
              text: '计算机知识',
              collapsed: false,
              items: [
                {
                  text: '知识',
                  collapsed: true,
                  items: [
                    { text: '操作系统', link: '/general/knowledge/os' },
                    { text: '计算机网络', link: '/general/knowledge/network' },
                    { text: '数据库系统', link: '/general/knowledge/database' },
                    { text: '信息安全', link: '/general/knowledge/security' },
                    { text: '计算机组成原理', link: '/general/knowledge/hardware-embedded' }
                  ]
                },
                {
                  text: '真题',
                  collapsed: true,
                  items: [
                    { text: '操作系统', link: '/general/exams/os' },
                    { text: '计算机网络', link: '/general/exams/network' },
                    { text: '数据库系统', link: '/general/exams/database' },
                    { text: '信息安全', link: '/general/exams/security' },
                    { text: '计算机组成原理', link: '/general/exams/hardware-embedded' }
                  ]
                }
              ]
            },
            {
              text: '其他专题',
              collapsed: false,
              items: [
                {
                  text: '知识',
                  collapsed: true,
                  items: [
                    { text: '项目管理', link: '/general/knowledge/project' },
                    { text: '企业信息化战略', link: '/general/knowledge/informatization' },
                    { text: '知识产权', link: '/general/knowledge/property' },
                    { text: '数学与经济管理', link: '/general/knowledge/math' }
                  ]
                },
                {
                  text: '真题',
                  collapsed: true,
                  items: [
                    { text: '项目管理', link: '/general/exams/project' },
                    { text: '企业信息化战略', link: '/general/exams/informatization' },
                    { text: '知识产权', link: '/general/exams/property' },
                    { text: '数学与经济管理', link: '/general/exams/math' },
                    { text: '专业英语', link: '/general/exams/english' }
                  ]
                }
              ]
            },
            {
              text: '考点分析',
              collapsed: false,
              items: [
                { text: '总览', link: '/general/points/' },
                { text: '202605', link: '/general/points/202605' },
                { text: '202511', link: '/general/points/202511' },
                { text: '202505', link: '/general/points/202505' },
                { text: '202411', link: '/general/points/202411' }
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
