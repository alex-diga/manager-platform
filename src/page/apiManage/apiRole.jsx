import React from 'react'
import { Modal, message, Form, Checkbox, Row, Col } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import './index.scss'

class EditMeb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    handleOk() {
        this.refs.apiModalRef.validateFields((err, values) => {
            if (!err) {
                ApiUtil.post("api.role.update",{
                    roleCodes: values.roleCodes,
                    apiId:this.props.roleId,
                    app: this.props.match.params.name
                },res => {
                    if (res.code === '0') {
                        this.handleCancel(true)
                    }
                })
            }
        })
    }
    handleCancel() {
        this.refs.apiModalRef.resetFields()
        this.props.closeModal(false)
    }
    setApiRole(data) {
        console.log(data)
        if (this.refs.apiModalRef) {
            this.refs.apiModalRef.setFieldsValue({
                roleCodes: data
            })
        }
    }
    componentDidMount() {}
    render() {
        const { modalVisible } = this.props
        return (
            <Modal
                title='接口授权'
                width="720px"
                className="apiModalBox"
                visible={modalVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel.bind(this, false)}
            >
                <ApiFormCom ref="apiModalRef" selectList={this.props.selectList} roleList={this.props.roleList} />
            </Modal>
        )
    }
}

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
class ApiForm extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log(this.props.selectList)
        this.props.form.setFieldsValue({
            roleCodes: this.props.selectList
        })
    }
    render() {
        const {roleList} = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Form.Item {...formItemLayout} label="角色">
                {getFieldDecorator('roleCodes', {
                   initialValue:[]
                })(
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            {roleList.map(en => {
                                return (
                                    <Col span={6} key={en.id}>
                                        <Checkbox value={en.id}>{en.text}</Checkbox>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Checkbox.Group>,
                )}
            </Form.Item>
        )
    }
}
const ApiFormCom = Form.create({})(ApiForm)

export default EditMeb;