import React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import hex_md5 from '../../utils/MD5'
import './index.scss';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e) {
        e.preventDefault()
        let that = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const pwd = hex_md5(values.password)
                ApiUtil.post('nologin.admin.login', {username: values.username, password: pwd}, res => {
                    if (res.code === '0') {
                        let JWT_KEY = ApiUtil.JWT_KEY
                        localStorage.setItem(JWT_KEY,res.data)
                        that.props.history.push("/page/home")
                    }
                })
            }
        })
    }
    componentDidMount() { 
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="loginPage">
                <div className="loginFormBox">
                    <div className="OSName">用户登录</div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入账号!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.55)' }} />}
                                    placeholder="账号"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.55)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item className="submitButtonBox">
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
		                    </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Form.create({})(Login);