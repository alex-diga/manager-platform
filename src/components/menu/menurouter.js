// import location from '../../src/assets/img/location_fill.svg'
// import news_hot from '../../src/assets/img/news_hot_fill_light.svg'
export const routeMenus = [{
        title: '首页',
        icon: 'iconshuqian',
        key: 'k1',
        path: '/page/home',
    },
    {
        title: '接口配置',
        icon: 'iconshuqian',
        key: 'k2',
        children: [
            {
                title: '限流设置',
                icon: 'iconshuqian',
                key: 'k2-1',
                path: '/page/netmanage',
            },
            {
                title: '接口管理',
                icon: 'iconshuqian',
                key: 'k2-2',
                path: '/page/apimanage',
            },
            {
                title: '权限管理',
                icon: 'iconshuqian',
                key: 'k2-3',
                path: '/page/rolemanage',
            },
            {
                title: '流量数据',
                icon: 'iconshuqian',
                key: 'k2-4',
                path: '/page/netdata',
            }
        ]
    },
    {
        title: '系统菜单',
        icon: 'iconshuqian',
        key: 'k3',
        children: [
            {
                title: '全局配置',
                icon: 'iconshuqian',
                key: 'k3-1',
                path: '/page/allscope',
            }
        ]
    },
]