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
              text: '计算机系统基础知识',
              collapsed: false,
              items: [
                { text: '0 总览', link: '/general/chapters/computer-systems/0-overview' },
                { text: '1 硬件与嵌入式', link: '/general/chapters/computer-systems/1-hardware' },
                { text: '2 操作系统', link: '/general/chapters/computer-systems/2-operating-system' },
                { text: '3 计算机网络', link: '/general/chapters/computer-systems/3-network' },
                { text: '4 数据库系统', link: '/general/chapters/computer-systems/4-database' },
                { text: '5 其他', link: '/general/chapters/computer-systems/5-other' }
              ]
            },
            {
              text: '系统架构设计',
              collapsed: false,
              items: [
                { text: '0 总览', link: '/general/knowledge/architecture' },
                { text: '1 架构基础与 4+1 视图', link: '/general/knowledge/architecture/1-foundation' },
                { text: '2 基于架构的软件开发（ABSD）', link: '/general/knowledge/architecture/2-absd' },
                { text: '3 软件架构风格', link: '/general/knowledge/architecture/3-styles' },
                { text: '4 软件质量属性', link: '/general/knowledge/architecture/4-quality-attributes' },
                { text: '5 架构评估', link: '/general/knowledge/architecture/5-evaluation' },
                { text: '6 软件架构复用', link: '/general/knowledge/architecture/6-reuse' },
                { text: '7 特定领域软件架构（DSSA）', link: '/general/knowledge/architecture/7-dssa' },
                { text: '8 微服务与分布式架构', link: '/general/knowledge/architecture/8-distributed-service' },
                { text: '9 新技术架构', link: '/general/knowledge/architecture/9-new-architecture' },
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
                { text: '0 总览', link: '/general/chapters/software-engineering' },
                { text: '1 基础与过程管理', link: '/general/chapters/software-engineering/1-foundation-process' },
                { text: '2 需求与分析建模', link: '/general/chapters/software-engineering/2-requirements-analysis' },
                { text: '3 系统设计与设计模式', link: '/general/chapters/software-engineering/3-design-patterns' },
                { text: '4 构件化与软件复用', link: '/general/chapters/software-engineering/4-components-reuse' },
                { text: '5 软件测试', link: '/general/chapters/software-engineering/5-testing' },
                { text: '6 软件可靠性', link: '/general/chapters/software-engineering/6-reliability' },
                { text: '7 软件运行与维护', link: '/general/chapters/software-engineering/7-maintenance' },
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
              text: '其他专题',
              collapsed: false,
              items: [
                {
                  text: '知识',
                  collapsed: true,
                  items: [
                    { text: '信息安全', link: '/general/knowledge/security' },
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
                    { text: '信息安全', link: '/general/exams/security' },
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
