import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// 路由拦截未登录跳转登录页
class AuthorizedRoute extends React.Component {
	render() {
		const { component: Component, ...rest } = this.props
		const isLogged = localStorage.getItem("easyconf_jwt") ? true : false
		return (
			<Route {...rest} render={props => {
				return isLogged
					? <Component {...props} />
					: <Redirect to="/login" />
			}} />
		)
	}
}

export default AuthorizedRoute
