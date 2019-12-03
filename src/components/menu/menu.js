import React from 'react'
import {Link} from 'react-router-dom'
import ApiUtil from '../../utils/ApiUtil'
import {Menu, Icon} from 'antd'
import { routeMenus } from './menurouter'

const MyIcon = Icon.createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_1505404_05g1zqob7406.js', // 在 iconfont.cn 上生成
});
  
//此组件的意义就是将数据抽离出来，通过传递数据去渲染
class CustomMenu extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showKeyIndex: ['k1'],
			showMenuSub: []
		}
	}
	componentWillMount() {
		let pathName = window.location.pathname
		if (pathName === '/page') {
			pathName = '/page/home'
		}
		let arr = []
		let arr1 = []
		routeMenus.forEach(en => {
			if (en.path && en.path === pathName) {
				arr = [en.key]
				this.setState({
					showKeyIndex: arr,
					showMenuSub: []
				})
			}
			if (en.children) {
				arr1 = [en.key]
				en.children.forEach(ens => {
					if (ens.path && ens.path === pathName) {
						arr = [ens.key]
						this.setState({
							showKeyIndex: arr,
							showMenuSub: arr1
						})
					}
				})
			}
		})
	}
	renderSubMenu = ({key, icon, title, children}) => {
		return (
			<Menu.SubMenu key={key} title={<span>{icon && <MyIcon type={icon}></MyIcon>}<span>{title}</span></span>}>
				{
					children && children.map(item => {
						return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
					})
				}
			</Menu.SubMenu>
		)
	}
	renderMenuItem = ({key, icon, title, path}) => {
		return (
			<Menu.Item key={key}>
				<Link to={path}>
					{icon && <MyIcon type={icon}></MyIcon>}
					<span>{title}</span>
				</Link>
			</Menu.Item>
		)
	}
	render() {
		return (

				<Menu
					theme='light'
					defaultOpenKeys={this.state.showMenuSub}
					defaultSelectedKeys={this.state.showKeyIndex}
					mode="inline"
				>
					{
						routeMenus.map(item => {
							return item.children && item.children.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
						})
					}
				</Menu>
		)
	}
}
export default CustomMenu
