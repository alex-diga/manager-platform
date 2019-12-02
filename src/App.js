import React, { Component } from 'react';
// import { Provider } from 'react-redux'
import './App.scss';
// import store from './store'
import {Router} from './router/router'

class App extends Component {
  render() {
    return (
		<div className="App"><Router /></div>
    );
  }
}

export default App;