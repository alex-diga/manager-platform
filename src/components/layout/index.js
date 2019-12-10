import React, { Component } from 'react'
import ContentMain from '../contentMain'
import CustomMenu from '../menu'
import HeaderCom from '../header'
import { Layout, Affix } from 'antd'
import { getDefaultMenu, setMenuList } from './menurouter'
import ApiUtil from '../../utils/ApiUtil'
import './index.scss'

const { Header, Content, Sider } = Layout;
// 页面主体布局
class LayoutComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsed: false,
			menuList: [],
			defaultData: {}
		}
		this.toggle = this.toggle.bind(this)
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		})
	}
	componentWillMount() {
		ApiUtil.post("app.list", {}, res => {
			if (res.code === '0') {
				let routeMenus = setMenuList(res.data[0].children)
				let defaultMenu = getDefaultMenu(routeMenus)
				let obj = {
					dufaultKey: defaultMenu.path,
					dufaultSub: defaultMenu.sub
				}
				this.setState({
					menuList: routeMenus,
					defaultData: obj
				})
			}
		})
	}
	render() {
		const { collapsed, menuList, defaultData } = this.state
		return (
			<div className="LayoutComponentBox" >
				<Layout style={{ width: '100%', height: '100%' }}>
					<Sider className="leftSiderBox">
						{!collapsed ? <div className="logoBox">
							管理平台
							</div> : null}
						{menuList.length > 0 && <CustomMenu menuList={menuList} defaultData={defaultData} />}
					</Sider>
					<Layout style={{ overflow: 'hidden' }}>
						{/* <Affix className="PageHeaderBox" offsetTop={0} target={() => document.getElementsByClassName('LayoutComponentBox')[0]}> */}
						<HeaderCom toggle={this.toggle} history={this.props.history} />
						{/* </Affix> */}
						<Content style={{ overflowX: 'hidden', overflowY: 'auto' }}>
							<ContentMain />
						</Content>
					</Layout>
				</Layout>
			</div>
		);
	}
}
export default LayoutComponent;