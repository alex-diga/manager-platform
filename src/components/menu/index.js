import React from 'react'
import { Link } from 'react-router-dom'
import ApiUtil from '../../utils/ApiUtil'
import { Menu, Icon } from 'antd'
import { routeMenus, routeChild } from './menurouter'

const MyIcon = Icon.createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_1505404_05g1zqob7406.js', // 在 iconfont.cn 上生成
});

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class CustomMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dufaultKey: [],
			dufaultSub: [],
			routeMenuData: routeMenus
		}
	}
	componentWillMount() {
		ApiUtil.post("app.list", {}, res => {
			if (res.code === '0') {
				let dataArr = res.data[0].children
				let child = []
				for (let i =0; i< dataArr.length; i++) {
					let childArr = []
					for (let j = 0; j < routeChild.length; j++) {
						let obj = JSON.parse(JSON.stringify(routeChild[j]))
						obj.path= `${routeChild[j].path}/${dataArr[i].text}`
						obj.key=`k2-${i}-${j}`
						childArr.push(obj)
					}
					let data = {
						title: dataArr[i].text,
						icon: 'iconshuqian',
						key: `k2-${i}`,
						children: childArr
					}
					child.push(data)
				}
				routeMenus[1].children = child
				let obj = this.getDefaultMenu(routeMenus, [], '')
				this.setState({
					dufaultKey: [obj.dufaultKey],
					dufaultSub: obj.dufaultSub,
					routeMenuData: routeMenus
				})
				// console.log(obj)
			}
		})
	}
	getDefaultMenu(arr, sub, key) {
		let path = window.location.pathname
		for (let i = 0; i<arr.length; i++) {
			let en = arr[i]
			if (!en.children) {
				if (en.path && en.path === path) {
					key = en.key
				} else {
					sub.pop()
				}
			} else {
				if (sub) {
					sub.push(en.key)
				}
				this.getDefaultMenu(en.children, sub, key)
			}
		}
		return {key: key, dufaultSub: sub}
	}
	getMenuNodes = (MenuList) => {
		return MenuList.map(item => {
			if (!item.children) {
				return (
					<Menu.Item key={item.key}>
						<Link to={item.path}>
							{item.icon && <MyIcon type={item.icon}></MyIcon>}
							<span>{item.title}</span>
						</Link>
					</Menu.Item>
				)
			} else {
				return (
					<Menu.SubMenu
						key={item.key}
						title={
							<span>
								{item.icon && <MyIcon type={item.icon}></MyIcon>}
								<span>{item.title}</span>
							</span>
						}>
						{this.getMenuNodes(item.children)}
					</Menu.SubMenu>
				)
			}
		})
	}
	render() {
		const { routeMenuData, dufaultKey, dufaultSub } = this.state
		return (
			<Menu
				theme='light'
				defaultOpenKeys={dufaultSub}
				defaultSelectedKeys={dufaultKey}
				mode="inline"
			>
				{
					this.getMenuNodes(routeMenuData)
				}
			</Menu>
		)
	}
}
export default CustomMenu
