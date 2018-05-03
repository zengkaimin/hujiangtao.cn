/*
* @Author: jiangtao
* @Date:   2018-04-24 22:46:26
* @Last Modified by:   jiangtao
* @Last Modified time: 2018-04-26 00:41:15
*/

module.exports = {
    // base: '/vuepress/',
    // port: 8888,
    evergreen: true,
    serviceWorker: true,

    locales: {
        '/': {
            lang: 'en-US',
            title: 'Jiangtao',
            description: 'Keep Calm and Carry On.-en'
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Jiangtao',
            description: 'Keep Calm and Carry On.-zh'
        }
    },
    head: [
        ['link', { rel: 'icon', href: `/favicon.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/favicon.png` }],
        // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/favicon.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    themeConfig: {
        // repo: 'hustjiangtao/vuepress',
        // editLinks: true,
        // docsDir: 'docs',
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                // editLinkText: 'Edit this page',
                nav: [
                    {
                        text: 'Home',
                        link: '/'
                    },
                    {
                        text: 'Blog',
                        link: '/post/'
                    },
                    {
                        text: 'About',
                        link: '/about'
                    },
                    {
                        text: 'Contact',
                        link: '/contact'
                    },
                ],
                sidebar: {
                    '/post/': [
                        {
                            title: 'API',
                            collapsable: true,
                            children: [
                                'API/2018-03-19-接口地址整理',
                            ]
                        },
                        {
                            title: 'Frontend',
                            collapsable: true,
                            children: [
                                'Frontend/2017-03-28-jQuery实现任意列表或表格的排序',
                                'Frontend/2017-12-05-Table表格中文字超出显示省略号',
                                'Frontend/2018-01-09-JS判别设备类型',
                                'Frontend/2018-01-21-CSS页面Flex三段式布局',
                                'Frontend/2018-04-18-从0开始React',
                            ]
                        },
                        {
                            title: 'Git',
                            collapsable: true,
                            children: [
                                'Git/2018-02-11-Git使用',
                                'Git/2018-03-24-Git初始化项目流程',
                            ]
                        },
                        {
                            title: 'Linux',
                            collapsable: true,
                            children: [
                                'Linux/2017-11-27-网站部署至服务器流程',
                                'Linux/2017-12-05-安装supervisor',
                                'Linux/2017-12-05-ssh配置',
                                'Linux/2017-12-07-iptables',
                                'Linux/2018-03-29-服务器折腾手札',
                            ]
                        },
                        {
                            title: 'Mac',
                            collapsable: true,
                            children: [
                                'Mac/2018-02-05-Mac安装Python开发环境依赖',
                                'Mac/2018-02-17-Mac下homebrew安装mysql',
                                'Mac/2018-03-19-Mac软件清单',
                                'Mac/2018-04-23-Mac下zsh终端使用sublime打开文件及文件夹的设置',
                                'Mac/2018-05-02-Vim配置',
                            ]
                        },
                        {
                            title: 'MySQL',
                            collapsable: true,
                            children: [
                                'MySQL/2018-04-19-MySQL优化',
                            ]
                        },
                        {
                            title: 'Nginx',
                            collapsable: true,
                            children: [
                                'Nginx/2018-03-24-Nginx之location配置',
                            ]
                        },
                        {
                            title: 'Python',
                            collapsable: true,
                            children: [
                                'Python/2017-01-19-一个Python简单项目框架的建立流程',
                                'Python/2017-01-19-一个Python简单项目框架的建立流程',
                                'Python/2017-11-24-Python项目生成requirements_txt',
                                'Python/2017-12-14-Python实现定时任务初步探索',
                                'Python/2018-01-23-Python项目架构的思考',
                                'Python/2018-04-09-Python-Tornado后台服务器跨域设置示例',
                            ]
                        },
                        {
                            title: 'TensorFlow',
                            collapsable: true,
                            children: [
                                'TensorFlow/2018-05-02-TensorFlow',
                            ]
                        },
                    ],
                }
                // search: false,
                // searchMaxSuggestions: 10,
            },
            '/zh/': {
                label: '简体中文',
                selectText: '选择语言',
                // editLinkText: '编辑此页',
                nav: [
                    {
                        text: '主页',
                        link: '/'
                    },
                    {
                        text: '文章',
                        link: '/post/'
                    },
                    {
                        text: '关于',
                        link: '/about'
                    },
                    {
                        text: '联系我',
                        link: '/contact'
                    },
                ],
                sidebar: {
                    '/zh/post/': genPostSidebarConfig()
                }
            }
        }
    }
}

function genSidebarConfig (tTitle) {
  return [
    {
      title: tTitle,
      collapsable: false,
      children: [
        '',
        '2017-01-19-一个Python简单项目框架的建立流程.md',
        '2017-03-28-jQuery实现任意列表或表格的排序.md',
        '2017-12-05-ssh配置.md',
        '2018-01-09-JS判别设备类型.md',
        '2018-03-24-Git初始化项目流程.md',
      ]
    }
  ]
}

function genPostSidebarConfig () {
    return [
        {
            title: 'API',
            collapsable: true,
            children: [
                'API/2018-03-19-接口地址整理',
            ]
        },
        {
            title: 'Frontend',
            collapsable: true,
            children: [
                'Frontend/2017-03-28-jQuery实现任意列表或表格的排序',
                'Frontend/2017-12-05-Table表格中文字超出显示省略号',
                'Frontend/2018-01-09-JS判别设备类型',
                'Frontend/2018-01-21-CSS页面Flex三段式布局',
                'Frontend/2018-04-18-从0开始React',
            ]
        },
        {
            title: 'Git',
            collapsable: true,
            children: [
                'Git/2018-02-11-Git使用',
                'Git/2018-03-24-Git初始化项目流程',
            ]
        },
        {
            title: 'Linux',
            collapsable: true,
            children: [
                'Linux/2017-11-27-网站部署至服务器流程',
                'Linux/2017-12-05-安装supervisor',
                'Linux/2017-12-05-ssh配置',
                'Linux/2017-12-07-iptables',
                'Linux/2018-03-29-服务器折腾手札',
            ]
        },
        {
            title: 'Mac',
            collapsable: true,
            children: [
                'Mac/2018-02-05-Mac安装Python开发环境依赖',
                'Mac/2018-02-17-Mac下homebrew安装mysql',
                'Mac/2018-03-19-Mac软件清单',
                'Mac/2018-04-23-Mac下zsh终端使用sublime打开文件及文件夹的设置',
                'Mac/2018-05-02-Vim配置',
            ]
        },
        {
            title: 'MySQL',
            collapsable: true,
            children: [
                'MySQL/2018-04-19-MySQL优化',
            ]
        },
        {
            title: 'Nginx',
            collapsable: true,
            children: [
                'Nginx/2018-03-24-Nginx之location配置',
            ]
        },
        {
            title: 'Python',
            collapsable: true,
            children: [
                'Python/2017-01-19-一个Python简单项目框架的建立流程',
                'Python/2017-11-24-Python项目生成requirements_txt',
                'Python/2017-12-14-Python实现定时任务初步探索',
                'Python/2018-01-23-Python项目架构的思考',
                'Python/2018-04-09-Python-Tornado后台服务器跨域设置示例',
            ]
        },
        {
            title: 'TensorFlow',
            collapsable: true,
            children: [
                'TensorFlow/2018-05-02-TensorFlow',
            ]
        },
    ]
}
