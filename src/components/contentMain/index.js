import React from 'react'
//引入路由
import { Route, Switch, Redirect } from 'react-router-dom'
import loadabler from '../../router/loading'
const Home = loadabler(() => import('../../page/home'))
const NetManage = loadabler(() => import('../../page/netManage'))
const NetData = loadabler(() => import('../../page/netData'))
const ApiManage = loadabler(() => import('../../page/apiManage'))
const RoleManage = loadabler(() => import('../../page/roleManage'))
const AllScope = loadabler(() => import('../../page/allScope'))
const EnterManage = loadabler(() => import('../../page/enterManage'))

class ContentMain extends React.Component {
	render() {
		return (
			<div className="routerList" style={{width: '100%', padding: '20px'}}>
				<Switch>
					{/* <Redirect from="/page" exact to="/page/home" /> */}
					<Route path='/page/home' component={Home} />
					<Route path='/page/netmanage/:name' component={NetManage} />
					<Route path='/page/netdata/:name' component={NetData} />
					<Route path='/page/apimanage/:name' component={ApiManage} />
					<Route path='/page/rolemanage/:name' component={RoleManage} />
					<Route path='/page/allscope/:name' component={AllScope} />
					<Route path='/page/entermanage/:name' component={EnterManage} />
				</Switch>
			</div>
		)
	}
}

export default ContentMain