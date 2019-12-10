//设置侧边导航栏的menu
const routeMenus = [{
        title: '首页',
        icon: 'iconshuqian',
        key: 'k1',
        path: '/page/home',
    },
    {
        title: '接口配置',
        icon: 'iconshuqian',
        key: 'k2',
        children: [{
                title: '限流设置',
                icon: 'iconshuqian',
                key: 'k2-1',
                pkey: 'k2',
                path: '/page/netmanage',
            },
            {
                title: '接口管理',
                icon: 'iconshuqian',
                key: 'k2-2',
                pkey: 'k2',
                path: '/page/apimanage',
            },
            {
                title: '权限管理',
                icon: 'iconshuqian',
                key: 'k2-3',
                pkey: 'k2',
                path: '/page/rolemanage',
            },
            {
                title: '流量数据',
                icon: 'iconshuqian',
                key: 'k2-4',
                pkey: 'k2',
                path: '/page/netdata',
            }
        ]
    },
    {
        title: '系统菜单',
        icon: 'iconshuqian',
        key: 'k3',
        children: [{
            title: '全局配置',
            icon: 'iconshuqian',
            key: 'k3-1',
            pkey: 'k3',
            path: '/page/allscope',
        }]
    },
]
const routeChild = [{
        title: '限流设置',
        path: '/page/netmanage',
    },
    {
        title: '接口管理',
        path: '/page/apimanage',
    },
    {
        title: '权限管理',
        path: '/page/rolemanage',
    },
    {
        title: '流量数据',
        path: '/page/netdata',
    },
    {
        title: '接入方管理',
        path: '/page/entermanage',
    }
]
export const setMenuList = function (dataArr) {
    let resArr = []
    let child = []
    for (let i = 0; i < dataArr.length; i++) {
        let childArr = []
        for (let j = 0; j < routeChild.length; j++) {
            let obj = JSON.parse(JSON.stringify(routeChild[j]))
            obj.path = `${routeChild[j].path}/${dataArr[i].text}`
            obj.key = `k2-${i}-${j}`
            obj.pkey = `k2-${i}`
            childArr.push(obj)
        }
        let data = {
            title: dataArr[i].text,
            icon: 'iconshuqian',
            key: `k2-${i}`,
            pkey: `k2`,
            children: childArr
        }
        child.push(data)
    }
    routeMenus[1].children = child
    resArr = JSON.parse(JSON.stringify(routeMenus))
    return resArr
}
export const getDefaultMenu = function (arr) {
    let obj = {}
    let path = window.location.pathname
    try {
        (function poll(arr, path, subArr) {
            let sub = Array.from(subArr)
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].pkey) {
                    sub.push(arr[i].pkey)
                }
                if (arr[i].path === path) {
                    let obj = {
                        path: arr[i].key,
                        sub: sub
                    }
                    throw (obj)
                }
                let en = arr[i].children
                if (en && en.length > 0) {
                    poll(en, path, sub)
                }
                sub.pop()
            }
        })(arr, path, [])
    } catch (err) {
        obj = err
    }
    return obj
}