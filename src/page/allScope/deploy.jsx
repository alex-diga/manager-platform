import React from 'react'
import { Modal, message, Form, Input, Select, Radio } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import './index.scss'

const { Option } = Select
class DeploySetting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            showModal: props.showModal
        }
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    handleOk() {
        if (!this.state.loading) {
            this.refs.scopeDeployRef.validateFields((err, values) => {
                if (!err) {
                    this.setState({
                        loading: true
                    })
                    if (this.props.modalType === 'edit') {
                        values.id = this.props.modalForm.id
                        ApiUtil.post("global.config.update", values, res => {
                            if (res.code === '0') {
                                message.success('修改成功')
                                this.handleCancel(true)
                            } else {
                                this.setState({
                                    loading: false
                                })
                            }
                        })
                    } else {
                        ApiUtil.post("global.config.add", values, res => {
                            if (res.code === '0') {
                                message.success('修改成功')
                                this.handleCancel(true)
                            } else {
                                this.setState({
                                    loading: false
                                })
                            }
                        })
                    }
                }
            })
        }
    }
    handleCancel(type) {
        this.setState({
            showModal: false,
            loading: false
        }, () => {
            // this.refs.scopeDeployRef.resetFields()
            this.props.closeModal(type)
        })
    }
    componentDidMount() { }
    render() {
        return (
            <Modal
                title='配置信息'
                width="720px"
                className="AllDeployModalBox"
                visible={this.state.showModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel.bind(this, false)}
            >
                {this.state.showModal && <DeployFormCom ref="scopeDeployRef" modalForm={this.props.modalForm} modalType={this.props.modalType} />}
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
        const { fieldName } = this.props.modalForm
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
                    })(<Input disabled />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="配置项">
                    {getFieldDecorator('fieldName', {
                        rules: [
                            {
                                required: true,
                                message: '该项为必填项',
                            },
                        ]
                    })(<Input disabled />)}
                </Form.Item>
                {fieldName === 'default_limit_type'
                    ? <Form.Item {...formItemLayout} label="配置值">
                        {getFieldDecorator('fieldValue', {
                            initialValue: 'LIMIT',
                        })(<Radio.Group onChange={this.changeLimitFn}>
                            <Radio value="LIMIT">限流策略</Radio>
                            <Radio value="TOKEN_BUCKET">令牌桶策略</Radio>
                        </Radio.Group>)}
                    </Form.Item>
                    // ? <Form.Item {...formItemLayout} label="配置值">
                    //     {getFieldDecorator('fieldValue', {
                    //         initialValue: 'LIMIT',
                    //     })(<Select>
                    //             <Option value="LIMIT">限流策略</Option>
                    //             <Option value="TOKEN_BUCKET">令牌桶策略</Option>
                    //         </Select>)}
                    // </Form.Item>
                    : <Form.Item {...formItemLayout} label="配置值">
                        {getFieldDecorator('fieldValue', {
                            rules: [
                                {
                                    required: true,
                                    message: '该项为必填项',
                                },
                            ]
                        })(<Input allowClear type="number" />)}
                    </Form.Item>
                }
                <Form.Item {...formItemLayout} label="描述">
                    {getFieldDecorator('remark', {
                        rules: [
                            {
                                required: true,
                                message: '该项为必填项',
                            },
                        ]
                    })(<Input disabled />)}
                </Form.Item>
            </div>
        )
    }
}
const DeployFormCom = Form.create({})(DeployForm)

export default DeploySetting;