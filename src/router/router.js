import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Layout from '../components/layout'
import Login from '../page/login'
import AuthorizedRoute from './AuthorizedRoute'
import NoFound from '../page/noFound'
import BlankTab from '../page/blankTab'

export const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/login" component={Login} />
			<Redirect from="/index.html" exact to="/login" />
			<Redirect from="/" exact to="/login" />{/*注意redirect转向的地址要先定义好路由*/}
			<Route path="/maker/blank" component={BlankTab} />
			<AuthorizedRoute path="/home" component={Layout} />
			<AuthorizedRoute path="/manage" component={Layout} />
			<Route component={NoFound} />
		</Switch>
	</BrowserRouter>
)








