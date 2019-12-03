import React from 'react'
import { Modal, message } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import RoleForm from './roleForm'
import './index.scss'

class AddRole extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.addhandleOk = this.addhandleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    // 确定添加角色、修改角色信息
    addhandleOk() {
        this.refs.refRoleForm.validateFields((err, values)=> {
            if (!err) {
                ApiUtil.post("role.add",values,res => {
                    if (res.code === '0') {
                        message.success("添加成功")
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
    componentDidMount() {}
    render() {
        return (
            <Modal
                title="添加角色"
                visible={this.props.addVisible}
                onOk={this.addhandleOk}
                onCancel={this.handleCancel.bind(this, false)}
            >
                <RoleForm ref="refRoleForm" type="add" />
            </Modal>
        )
    }
}



export default AddRole;