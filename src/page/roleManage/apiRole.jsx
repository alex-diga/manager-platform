import React from 'react'
import { Modal, Table, message  } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import './index.scss'

class RoleManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectList: [],
            roleCode: ''
        }
        this.apiRoleModelhandleOk = this.apiRoleModelhandleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this)
    }
    setDataFn(cur, allArr, roleCode) {
        let selectArr = []
        allArr.forEach(en => {
            if (cur.indexOf(en.id) !== -1) {
                selectArr.push(en.id)
            }
        })
        this.setState({
            selectList: selectArr,
            roleCode: roleCode
        })
    }
    // 确定添加角色、修改角色信息
    apiRoleModelhandleOk() {
        let path = window.location.pathname.split('/')
        let quest = path[path.length-1]
        ApiUtil.post("role.api.update",{
            apiIds: this.state.selectList,
            roleCode: this.state.roleCode,
            app: quest
        }, res => {
            if (res.code === '0') {
                message.success('修改接口权限成功')
                this.handleCancel(true)
            }
        })
    }
    // 关闭对话框、清除form表单信息
    handleCancel(type) {
        this.props.closeModel(type)
    }
    onSelectChange(selectList) {
        this.setState({
            selectList: selectList
        })
    }
    componentDidMount() {
    }
    render() {
        const {selectList } = this.state
        const columns = [
            {
              title: '接口权限',
              dataIndex: 'text',
            }
          ]
        const rowSelection = {
            selectList,
            onChange: this.onSelectChange,
        }
        return (
            <Modal
                title="接口权限"
                visible={this.props.apiVisible}
                onOk={this.apiRoleModelhandleOk}
                onCancel={this.handleCancel.bind(this, false)}
            >
                <Table rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={this.props.apiList} pagination={false} />
            </Modal>
        )
    }
}

export default RoleManage;