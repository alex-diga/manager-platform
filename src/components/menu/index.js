import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
const MyIcon = Icon.createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_1505404_05g1zqob7406.js', // 在 iconfont.cn 上生成
});

//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class CustomMenu extends React.Component {
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
		const { menuList, defaultData } = this.props
		return (
			<Menu
				theme='light'
				defaultOpenKeys={defaultData.dufaultSub}
				defaultSelectedKeys={defaultData.dufaultKey}
				mode="inline"
				className="pageMenu"
			>
				{
					this.getMenuNodes(menuList)
				}
			</Menu>
		)
	}
}
export default CustomMenu
