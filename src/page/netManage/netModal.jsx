import React from 'react'
import { Modal, message, Form, Radio, Input } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
// import './index.scss'
class NetModal extends React.Component {
    constructor(props) {
        super(props)
        this.nethandleOk = this.nethandleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    // 确定添加角色、修改角色信息
    nethandleOk() {
        this.refs.netFormRef.validateFields((err, values) => {
            if (!err) {
                let apiIds = []
                if (this.props.modalType === 'batch') {
                    this.props.selectedBatchData.forEach(en => {
                        apiIds.push(en.apiId)
                    })                                       
                } else {
                    apiIds.push(this.props.singleData.apiId)
                }
                values.apiIds = apiIds
                values.app = this.props.match.params.name
                ApiUtil.post("app.limit.update", values, res => {
                    if (res.code === '0') {
                        message.success(this.props.modalType === 'batch' ? '设置成功' : '修改成功')
                        this.setState({
                            loading: false
                        })
                        this.handleCancel(true)
                    }
                })
            }
        })
    }
    // 关闭对话框、清除form表单信息
    handleCancel(type) {
        this.refs.netFormRef.resetFields()
        this.props.closeModal(type)
    }
    componentDidMount() { }
    render() {
        return (
            <Modal
                title="限流设置"
                className="netModalBox"
                width="720px"
                visible={this.props.showModal}
                onOk={this.nethandleOk}
                onCancel={this.handleCancel.bind(this, false)}
            >
                {this.props.showModal && <NetFormCom ref="netFormRef" singleData={this.props.singleData} modalType={this.props.modalType} />}
            </Modal>
        )
    }
}

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
const formItemLayout1 = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
}
class netForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            limitType: 'LIMIT',
            limitStatus: 1
        }
        this.changeLimitFn = this.changeLimitFn.bind(this)
        this.changeStatusFn = this.changeStatusFn.bind(this)
    }
    changeLimitFn(e) {
        this.setState({
            limitType: e.target.value
        })
    }
    changeStatusFn(e) {
        this.setState({
            limitStatus: e.target.value
        })
    }
    componentDidMount() {
        const data = this.props.singleData
        if (this.props.modalType === 'single') {
            this.setState({
                limitType: data.limitType,
                limitStatus: data.status
            }, () => {
                if (data.status === 1) {
                    if (data.limitType === 'LIMIT') {
                        this.props.form.setFieldsValue({
                            name: data.name,
                            version: data.version,
                            limitType: data.limitType,
                            status: data.status,
                            limitCount: data.limitCount,
                            limitMsg: data.limitMsg,
                            limitCode: data.limitCode
                        })
                    } else if (data.limitType === 'TOKEN_BUCKET') {
                        this.props.form.setFieldsValue({
                            name: data.name,
                            version: data.version,
                            limitType: data.limitType,
                            status: data.status,
                            tokenBucketCount: data.tokenBucketCount
                        })
                    }
                } else {
                    this.props.form.setFieldsValue({
                        name: data.name,
                        version: data.version,
                        limitType: data.limitType,
                        status: data.status,
                    })
                }
            })
        } else {
            this.setState({
                limitType: 'LIMIT',
                limitStatus: 1
            })
        }
    }
    render() {
        const { getFieldDecorator, getFieldsValues } = this.props.form
        return (
            <div className="netFormBox">
                {this.props.modalType === 'single' && <div>
                    <Form.Item {...formItemLayout} label="接口名">
                        {getFieldDecorator('name', {
                            initialValue: ''
                        })(<Input disabled={true} />)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="版本号">
                        {getFieldDecorator('version', {
                            initialValue: ''
                        })(<Input disabled={true} />)}
                    </Form.Item>
                </div>}
                <Form.Item {...formItemLayout} label="策略">
                    {getFieldDecorator('limitType', {
                        initialValue: 'LIMIT',
                    })(<Radio.Group onChange={this.changeLimitFn}>
                        <Radio value="LIMIT">限流策略</Radio>
                        <Radio value="TOKEN_BUCKET">令牌桶策略</Radio>
                    </Radio.Group>)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态">
                    {getFieldDecorator('status', {
                        initialValue: 1,
                    })(<Radio.Group onChange={this.changeStatusFn}>
                        <Radio value={1}>开启</Radio>
                        <Radio value={0}>禁用</Radio>
                    </Radio.Group>)}
                </Form.Item>
                {this.state.limitStatus === 1 && <div className="limitBox">
                    <div className="tip">
                        {this.state.limitType === 'LIMIT'
                            ? '限流策略(每秒处理固定数量的请求，超出请求返回错误信息。)'
                            : '令牌桶策略(每秒放置固定数量的令牌数，不足的令牌数做等待处理，直到拿到令牌为止。)'}
                    </div>
                    <div className="formBox">
                        {this.state.limitType === 'LIMIT'
                            ? <div>
                                <Form.Item {...formItemLayout1} label="每秒处理请求数">
                                    {getFieldDecorator('limitCount', {
                                        initialValue: 50,
                                        rules: [
                                            {
                                                required: true,
                                                message: '该项为必填项',
                                            },
                                        ]
                                    })(<Input allowClear type="number" />)}
                                </Form.Item>
                                <Form.Item {...formItemLayout1} label="限制后返回code">
                                    {getFieldDecorator('limitCode', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '该项为必填项',
                                            },
                                        ]
                                    })(<Input allowClear />)}
                                </Form.Item>
                                <Form.Item {...formItemLayout1} label="限制后返回msg">
                                    {getFieldDecorator('limitMsg', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '该项为必填项',
                                            },
                                        ]
                                    })(<Input allowClear />)}
                                </Form.Item>
                            </div>
                            : <Form.Item {...formItemLayout1} label="令牌桶流量">
                                {getFieldDecorator('tokenBucketCount', {
                                    initialValue: 50,
                                    rules: [
                                        {
                                            required: true,
                                            message: '该项为必填项',
                                        },
                                    ]
                                })(<Input allowClear type="number" />)}
                            </Form.Item>}
                    </div>
                </div>}
            </div>
        )
    }
}
const NetFormCom = Form.create({})(netForm)

export default NetModal;