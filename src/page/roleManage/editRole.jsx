import React from 'react'
import { Modal, message, Spin } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import RoleForm from './roleForm'

class RoleManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.editRoleModelhandleOk = this.editRoleModelhandleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.setForm = this.setForm.bind(this)
    }
    // 确定添加角色、修改角色信息
    editRoleModelhandleOk() {
        this.refs.refRoleForm.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                let obj = {
                    id: this.props.editForm.id,
                    roleCode: this.props.editForm.roleCode,
                    description: values.description
                }
                ApiUtil.post("role.update", obj, res => {
                    if (res.code === '0') {
                        message.success('修改成功')
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
        this.refs.refRoleForm.resetFields()
        this.props.closeModel(type)
    }
    setForm(data) {
        if (this.refs.refRoleForm) {
            this.refs.refRoleForm.setFieldsValue({
                roleCode: data.roleCode,
                description: data.description
            })
        }
    }
    componentDidMount() {
    }
    render() {
        // const { getFieldDecorator } = this.props.form
        return (
            <Spin spinning={this.state.loading} delay={500}>
                <Modal
                    title="角色信息"
                    visible={this.props.editVisible}
                    onOk={this.editRoleModelhandleOk}
                    onCancel={this.handleCancel.bind(this, false)}
                >
                    <RoleForm ref="refRoleForm" type="edit" formData={this.props.editForm} valueDisable={true} />
                </Modal>
            </Spin>
        )
    }
}
export default RoleManage;