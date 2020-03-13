import React from 'react'
import { Modal, message, Spin } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import RoleForm from './roleForm'

class AddRole extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            addVisible: props.addVisible
        }
        this.addhandleOk = this.addhandleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    // 确定添加角色、修改角色信息
    addhandleOk() {
        if (!this.state.loading) {
        this.refs.refRoleForm.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                ApiUtil.post("role.add", values, res => {
                    if (res.code === '0') {
                        message.success("添加成功")
                        this.handleCancel(true)
                    } else {
                        this.setState({
                            loading: false
                        })
                    }
                })
            }
        })
    }
    }
    // 关闭对话框、清除form表单信息
    handleCancel(type) {
        this.setState({
            addVisible: false,
            loading: false
        }, () => {
            this.refs.refRoleForm.resetFields()
        this.props.closeModel(type)
        })
        
    }
    componentDidMount() { }
    render() {
        return (
            <Spin spinning={this.state.loading} delay={500}>
                <Modal
                    title="添加角色"
                    visible={this.state.addVisible}
                    onOk={this.addhandleOk}
                    onCancel={this.handleCancel.bind(this, false)}
                >
                    <RoleForm ref="refRoleForm" type="add" />
                </Modal>
            </Spin>
        )
    }
}



export default AddRole;