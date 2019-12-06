import React from 'react'
import { Modal, Table, message, Spin } from 'antd'
import ApiUtil from '../../utils/ApiUtil'

class RoleManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectList: [],
            roleCode: '',
            loading: false
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
        this.setState({
            loading: true
        })
        let path = window.location.pathname.split('/')
        let quest = path[path.length - 1]
        ApiUtil.post("role.api.update", {
            apiIds: this.state.selectList,
            roleCode: this.state.roleCode,
            app: quest
        }, res => {
            if (res.code === '0') {
                message.success('修改接口权限成功')
                this.setState({
                    loading: false
                })
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
        const { selectList } = this.state
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
            <Spin spinning={this.state.loading} delay={500}>
                <Modal
                    title="接口权限"
                    visible={this.props.apiVisible}
                    onOk={this.apiRoleModelhandleOk}
                    onCancel={this.handleCancel.bind(this, false)}
                >
                    <Table rowSelection={rowSelection} rowKey="id" columns={columns} dataSource={this.props.apiList} pagination={false} />
                </Modal>
            </Spin>
        )
    }
}

export default RoleManage;