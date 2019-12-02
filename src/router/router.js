import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Layout from '../components/layout'
import Login from '../page/login'
import AuthorizedRoute from './AuthorizedRoute'
import NoFound from '../page/noFound'

export const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/login" component={Login} />
			<Redirect from="/" exact to="/login" />{/*注意redirect转向的地址要先定义好路由*/}
			<AuthorizedRoute path="/page" component={Layout} />
			<Route component={NoFound} />
		</Switch>
	</BrowserRouter>
)








