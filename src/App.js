import React, { Component } from 'react';
// import { Provider } from 'react-redux'
import './App.scss';
// import store from './store'
import {Router} from './router/router'
import {ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN'

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}><div className="App"><Router /></div></ConfigProvider>
    );
  }
}

export default App;