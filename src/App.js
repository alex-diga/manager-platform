import React, { Component } from 'react';
// import { Provider } from 'react-redux'
import './App.scss';
// import store from './store'
import {Router} from './router/router'
import {ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}><div className="App"><Router /></div></ConfigProvider>
    );
  }
}

export default App;