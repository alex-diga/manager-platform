import React from 'react'
import { Modal, message, Form, Input } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import './index.scss'

class DeploySetting extends React.Component {
    constructor(props) {
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    handleOk() {
        this.refs.scopeDeployRef.validateFields((err, values) => {
            if (!err) {
                if (this.props.modalType === 'edit') {
                    values.id = this.props.modalForm.id
                    ApiUtil.post("global.config.update", values, res => {
                        if (res.code === '0') {
                            message.success('修改成功')
                            this.handleCancel(true)
                        }
                    })
                } else {
                    ApiUtil.post("global.config.add", values, res => {
                        if (res.code === '0') {
                            message.success('修改成功')
                            this.handleCancel(true)
                        }
                    })
                }            
            }
        })
    }
    handleCancel(type) {
        this.refs.scopeDeployRef.resetFields()
        this.props.closeModal(type)
    }
    componentDidMount() { }
    render() {
        const { showModal } = this.props
        return (
            <Modal
                title='配置信息'
                width="720px"
                className="AllDeployModalBox"
                visible={showModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel.bind(this, false)}
            >
                {showModal && <DeployFormCom ref="scopeDeployRef" modalForm={this.props.modalForm} modalType={this.props.modalType} />}
            </Modal>
        )
    }
}

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
class DeployForm extends React.Component {
    componentDidMount() {
        const { modalForm, modalType, form } = this.props
        if (modalType === 'edit') {
            form.setFieldsValue({
                keyName: modalForm.keyName,
                fieldName: modalForm.fieldName,
                fieldValue: modalForm.fieldValue,
                remark: modalForm.remark
            })
        }

    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Form.Item {...formItemLayout} label="配置域">
                    {getFieldDecorator('keyName', {
                        rules: [
                            {
                                required: true,
                                message: '该项为必填项',
                            },
                        ]
                    })(<Input allowClear />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="配置项">
                    {getFieldDecorator('fieldName', {
                        rules: [
                            {
                                required: true,
                                message: '该项为必填项',
                            },
                        ]
                    })(<Input allowClear />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="配置值">
                    {getFieldDecorator('fieldValue', {
                        rules: [
                            {
                                required: true,
                                message: '该项为必填项',
                            },
                        ]
                    })(<Input allowClear />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="描述">
                    {getFieldDecorator('remark', {
                        rules: [
                            {
                                required: true,
                                message: '该项为必填项',
                            },
                        ]
                    })(<Input allowClear />)}
                </Form.Item>
            </div>
        )
    }
}
const DeployFormCom = Form.create({})(DeployForm)

export default DeploySetting;