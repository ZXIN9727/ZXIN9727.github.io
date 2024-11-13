import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ZXIN9727",
    description: "个人学习笔记",
    markdown: {
        math: true
    },
    lastUpdated: true,
    themeConfig: {
        search: {
            provider: 'local'
        },
        // https://vitepress.dev/reference/default-theme-config
        // nav: [
        //   { text: 'Home', link: '/' },
        //   { text: 'Examples', link: '/markdown-examples' }
        // ],

        // sidebar: [
        //   {
        //     text: 'Examples',
        //     items: [
        //       { text: 'Markdown Examples', link: '/markdown-examples' },
        //       { text: 'Runtime API Examples', link: '/api-examples' }
        //     ]
        //   }
        // ],
        sidebar: {
            '/html/': [{
                text: 'HTML',
                items: [
                    {text: 'Index', link: '/html/'}
                ]
            }],

            '/css/': [{
                text: 'CSS',
                items: [
                    {text: 'Index', link: '/css/'}
                ]
            }],

            '/markdown/': [{
                text: 'markDown',
                items: [
                    {text: '基础用法', link: '/markdown/'},
                    {text: '数学公式', link: '/markdown/math'}
                ]
            }],
            '/vue/': [{
                text: 'Vue',
                items: [
                    {text: '基础用法', link: '/vue/'},
                    {text: 'API', link: '/vue/api'}
                ]
            }],
            '/double-spell/': [{
                text: '双拼',
                items: [
                    {text: '介绍', link: '/double-spell/'},
                    {text: '自然码', link: '/double-spell/ziran'}
                ]
            }],
            '/javascript/': [{
                text: 'JavaScript',
                items: [
                    {text: '基本语法', link: '/javascript/'},
                    {text: '数据类型', link: '/javascript/chapter1'},
                    {text: '运算符', link: '/javascript/chapter2'},
                    {text: '高级语法', link: '/javascript/chapter3'},
                    {text: '标准库', link: '/javascript/chapter4'},
                    {text: '面向对象', link: '/javascript/chapter5'},
                    {text: '异步', link: '/javascript/chapter6'},
                    {text: 'DOM', link: '/javascript/chapter7'},
                    {text: '事件', link: '/javascript/chapter8'},
                    {text: '浏览器模型', link: '/javascript/chapter9'},
                    {text: '网页接口', link: '/javascript/chapter10'}
                ]
            }],
            '/java/': [{
                text: 'Java',
                items: [
                    {text: '基本语法', link: '/java/'}
                ]
            }]
        },

        socialLinks: [{icon: 'github', link: 'https://github.com/ZXIN9727'}]
    }
})
