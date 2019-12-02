//Loadable插件需使用Loading
import React from 'react'
import {Spin, Alert} from 'antd'
import Loadable from 'react-loadable'

// 加载动画
const LoadingComponent = (props) => {
	if (props.error) {
		return (
			<div className="example">Error!</div>
		)
	} else {
		return (
			<div className="example">
				<Spin tip="Loading..."  size="large" >
				<Alert
				message="Alert message title"
				description="Further details about the context of this alert."
				type="info"
				/>
				</Spin>
			</div>
		)
	}
}

// 按需加载组件
export default (loader, loading = LoadingComponent) => {
	return Loadable({
		loader,
		loading
	})
}
