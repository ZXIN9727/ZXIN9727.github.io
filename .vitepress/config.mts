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

            '/double-spell/': [{
                text: '双拼',
                items: [
                    {text: '介绍', link: '/double-spell/'},
                    {text: '自然码', link: '/double-spell/ziran'}
                ]
            }]
        },

        socialLinks: [{icon: 'github', link: 'https://github.com/ZXIN9727'}]
    }
})
