import React, { Component } from 'react'
import ApiUtil from '../../utils/ApiUtil'
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
        // console.log( window.location)
        // localStorage.clear()
        // window.location.href = '/login'
        // this.setState({
        //     scrolllection: !this.state.scrolllection
        // })
        // this.props.toggle()
    }
    loginOutFn() {
        ApiUtil.logout()
    }
    render() {
        return (
            <div className="headerComBox">
                <div className="leftBox cursorBox" onClick={this.toggleFn}>
                    {/* {this.state.scrolllection ? '显示' : '收缩'} */}
                </div>
                <div className="loginOutBox cursorBox" onClick={this.loginOutFn}>
                    退出
                </div>
            </div>   
        )
    }
}

export default HeaderComponent