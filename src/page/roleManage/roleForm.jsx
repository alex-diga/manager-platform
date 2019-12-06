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
                                message: '请输入角色码',
                            },
                        ],
                    })(<Input placeholder="请填写角色码" disabled={this.props.valueDisable} />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="角色描述">
                    {getFieldDecorator('description', {
                        rules: [
                            {
                                required: true,
                                message: '请输入角色描述',
                            },
                        ],
                    })(<Input placeholder="请填写角色描述" />)}
                </Form.Item>
            </div>
        )
    }
}

export default Form.create({})(RoleForm);