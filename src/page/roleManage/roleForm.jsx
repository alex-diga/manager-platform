import React from 'react'
import { Form, Input } from 'antd'
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}
class RoleForm extends React.Component {
    componentDidMount() {
        if (this.props.type === 'edit') {
            this.props.form.setFieldsValue({
                roleCode: this.props.formData.roleCode,
                description: this.props.formData.description
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form.Item {...formItemLayout} label="角色码">
                    {getFieldDecorator('roleCode', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: '请输入角色码',
                            },
                            {
                                pattern: /^[a-zA-Z][a-zA-Z0-9_-]{0,9}$/,
                                message: '请输入以字母开头最长不超过10位的码值，可以包含中划线‘-’下划线‘_’、大小写字母及数字',
                            },
                        ],
                    })(<Input placeholder="首字母开头的角色码（10个字）" disabled={this.props.valueDisable} />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="角色描述">
                    {getFieldDecorator('description', {
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: '请输入角色描述',
                            },
                            {
                                max: 10,
                                message: '最多只能输入10个字',
                            }
                        ],
                    })(<Input placeholder="请填写角色描述（10个字）" />)}
                </Form.Item>
            </div>
        )
    }
}

export default Form.create({})(RoleForm);