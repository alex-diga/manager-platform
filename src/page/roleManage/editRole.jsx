import React from 'react'
import { Modal, message, Spin } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import RoleForm from './roleForm'

class RoleManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            editVisible: props.editVisible
        }
        this.editRoleModelhandleOk = this.editRoleModelhandleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    // 确定添加角色、修改角色信息
    editRoleModelhandleOk() {
        if (!this.state.loading) {
            this.refs.refRoleForm.validateFields((err, values) => {
                if (!err) {
                    this.setState({
                        loading: true
                    })
                    let obj = {
                        id: this.props.editForm.id,
                        roleCode: this.props.editForm.roleCode,
                        description: values.description.trim()
                    }
                    ApiUtil.post("role.update", obj, res => {
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
            })
        }
    }
    // 关闭对话框、清除form表单信息
    handleCancel(type) {
        this.setState({
            loading: false,
            editVisible: false
        }, () => {
            this.props.closeModel(type)
        })
    }
    componentDidMount() {
    }
    render() {
        // const { getFieldDecorator } = this.props.form
        return (
            <Spin spinning={this.state.loading} delay={500}>
                <Modal
                    title="角色信息"
                    visible={this.state.editVisible}
                    onOk={this.editRoleModelhandleOk}
                    onCancel={this.handleCancel.bind(this, false)}
                >
                    {this.state.editVisible && <RoleForm ref='refRoleForm' type="edit" formData={this.props.editForm} valueDisable={true} />}
                </Modal>
            </Spin>
        )
    }
}
export default RoleManage;