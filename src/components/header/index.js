import React, { Component } from 'react'
import './index.scss'

class HeaderComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            scrolllection: false
        }
        this.loginOutFn = this.loginOutFn.bind(this)
        this.toggleFn = this.toggleFn.bind(this)
    }
    toggleFn() {
        this.setState({
            scrolllection: !this.state.scrolllection
        })
        this.props.toggle()
    }
    loginOutFn() {
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className="headerComBox">
                <div className="leftBox cursorBox" onClick={this.toggleFn}>
                    {this.state.scrolllection ? '显示' : '收缩'}
                </div>
                <div className="loginOutBox cursorBox" onClick={this.loginOutFn}>
                    退出
                </div>
            </div>   
        )
    }
}

export default HeaderComponent