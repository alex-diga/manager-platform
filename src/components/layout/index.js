import React, { Component } from 'react'
import ContentMain from '../contentMain'
import CustomMenu from '../menu'
import HeaderCom from '../header'
import { Layout, Affix } from 'antd'
import './index.scss'

const { Header, Content, Sider } = Layout;
// 页面主体布局
class LayoutComponent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsed: false,
		}
		this.toggle = this.toggle.bind(this)
	}
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }
    render() {
		const { collapsed } = this.state
        return (
            <div className="LayoutComponentBox" >
					<Layout style={{ width: '100%', height: '100%' }}>
						<Sider className="leftSiderBox" trigger={null} collapsible collapsed={collapsed}>
							{!collapsed ? <div className="logoBox">
								管理平台
							</div> : null}
							<CustomMenu />
						</Sider>
						<Layout>
							<Affix className="PageHeaderBox" offsetTop={0} target={() => document.getElementsByClassName('App-contentMain')[0]}>
					        	<HeaderCom toggle={this.toggle} history={this.props.history} />
							</Affix>
							<Content>
								<ContentMain />
							</Content>
						</Layout>
					</Layout>
			</div>
        );
    }
}
export default LayoutComponent;