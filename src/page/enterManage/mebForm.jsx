import React from 'react'
import { Button, Input, Form, Checkbox, Row, Col, Radio, } from 'antd'
import ApiUtil from '../../utils/ApiUtil'

const { TextArea } = Input
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
class MebForm extends React.Component {
    constructor(props) {
        super(props)
        this.creatAppkey = this.creatAppkey.bind(this)
        this.creatPubkey = this.creatPubkey.bind(this)
    }
    // 生成appkey、secret
    creatAppkey() {
        ApiUtil.post("client.appkeysecret.create", {}, res => {
            if (res.code === '0') {
                if (this.props.formType === 'add') {
                    this.props.form.setFieldsValue({
                        appKey: res.data.appKey,
                        secret: res.data.secret
                    })
                } else if(this.props.formType === 'edit') {
                    this.props.form.setFieldsValue({
                        secret: res.data.secret
                    })
                }
            }
        })
    }
    // 生成公私钥
    creatPubkey() {
        ApiUtil.post("client.pubprikey.create", {}, res => {
            if (res.code === '0') {
                this.props.form.setFieldsValue({
                    pubKey: res.data.pubKey,
                    priKey: res.data.priKey
                })
            }
        })
    }
    componentDidMount() {
        const { formType, dataForm } = this.props
        if (formType === 'edit') {
            let arr = []
            dataForm.roleList.forEach(en => {
                arr.push(en.roleCode)
            })
            this.props.form.setFieldsValue({
                appKey: dataForm.appKey,
                secret: dataForm.secret,
                pubKey: dataForm.pubKey ? dataForm.pubKey : '',
                priKey: dataForm.priKey ? dataForm.priKey : '',
                roleCode: arr,
                status: dataForm.status
            })
        }
    }
    render() {
        const { roleList, formType } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                {formType === 'add' && <Button className="itemButtonBox" type="primary" onClick={this.creatAppkey}>生成appKey和secret</Button>}
                <Form.Item {...formItemLayout} label="appKey">
                    {getFieldDecorator('appKey', {
                        rules: [
                            {
                                required: true,
                                message: 'appKey不能为空',
                            },
                        ],
                    })(<Input disabled={formType === 'edit' ? true : false} />)}
                </Form.Item>
                {formType === 'edit' && <Button className="itemButtonBox" type="primary" onClick={this.creatAppkey}>生成secret</Button>}
                <Form.Item {...formItemLayout} label="secret">
                    {getFieldDecorator('secret', {
                        rules: [
                            {
                                required: true,
                                message: 'secret不能为空',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Button className="itemButtonBox" type="primary" onClick={this.creatPubkey}>生成公钥、私钥</Button>
                <Form.Item {...formItemLayout} label="公钥">
                    {getFieldDecorator('pubKey', {
                        initialValue: ''
                    })(<TextArea autoSize={{ minRows: 3, maxRows: 10 }} />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="私钥">
                    {getFieldDecorator('priKey', {
                        initialValue: ''
                    })(<TextArea autoSize={{ minRows: 3, maxRows: 15 }} />)}
                </Form.Item>
                <Form.Item {...formItemLayout} label="角色">
                    {getFieldDecorator('roleCode', {
                        rules: [
                            {
                                required: true,
                                message: '角色信息不能为空',
                            },
                        ],
                    })(
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                {roleList.map(en => {
                                    return (
                                        <Col span={8} key={en.id}>
                                            <Checkbox value={en.id}>{en.text}</Checkbox>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Checkbox.Group>,
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label="状态">
                    {getFieldDecorator('status', {
                        initialValue: 0,
                        rules: [
                            {
                                required: true,
                                message: '状态不能为空',
                            },
                        ],
                    })(<Radio.Group>
                        <Radio value={0}>开启</Radio>
                        <Radio value={1}>禁用</Radio>
                    </Radio.Group>)}
                </Form.Item>
            </div>
        )
    }
}

export default Form.create({})(MebForm);