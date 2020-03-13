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
					<Route path='/home' component={Home} />
					<Route path='/manage/netmanage/:name' component={NetManage} />
					<Route path='/manage/netdata/:name' component={NetData} />
					<Route path='/manage/apimanage/:name' component={ApiManage} />
					<Route path='/manage/rolemanage/:name' component={RoleManage} />
					<Route path='/manage/allscope' component={AllScope} />
					<Route path='/manage/entermanage/:name' component={EnterManage} />
				</Switch>
			</div>
		)
	}
}

export default ContentMain