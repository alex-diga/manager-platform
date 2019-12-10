import React from 'react'
import moment from 'moment'
import { Button,Empty } from 'antd'
import AddRole from './addRole'
import EditRole from './editRole'
import ApiRole from './apiRole'
import ApiUtil from '../../utils/ApiUtil'
import './index.scss'

class RoleManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addVisible: false,
            apiVisible: false,
            editVisible: false,
            editForm: {},
            apiList: [],
            currentApiList: [],
            rolesRows: [],
        }
        this.showAdd = this.showAdd.bind(this)
        this.showEdit = this.showEdit.bind(this)
        this.showApiRoleManageModel = this.showApiRoleManageModel.bind(this)
        this.closeModel = this.closeModel.bind(this)
    }
    // 显示添加角色
    showAdd() {
        this.setState({
            addVisible: true
        })
    }
    // 显示修改角色信息
    showEdit(data) {
        this.setState({
            editVisible: true,
            editForm: data
        })
        this.refs.editRoleRef.setForm(data)
    }
    // 显示接口权限对话框
    showApiRoleManageModel(obj) {
        ApiUtil.post("role.api.list", obj, res => {
            if (res.code === '0') {
                if (res.data) {
                    let arr  = []
                    res.data.forEach(en => {
                        arr.push(en.apiId)
                    })
                    this.setState({
                        currentApiList: arr
                    })
                    this.refs.apiRoleRef.setDataFn(arr, this.state.apiList, obj.roleCode)
                }
            }
        })
        this.setState({
            apiVisible: true
        })
    }
    // 关闭对话框，如果修改了数据，重新请求一次数据
    closeModel(type) {
        this.setState({
            addVisible: false,
            apiVisible: false,
            editVisible: false
        })
        if (type === true) {
            this.getDataFn()
        }
    }
    // 获取所有角色权限信息、所有接口信息
    getDataFn() {
        let path = window.location.pathname.split('/')
        let quest = path[path.length-1]
        ApiUtil.post("role.listall", {}, res => {
            if (res.code === '0') {
                this.setState({
                    rolesRows: res.data.rows
                })
            }
        })
        ApiUtil.post("app.api.tree.listall", {app: quest}, res => {
            if (res.code === '0') {
                let arr = []
                res.data[0].children.forEach(en => {
                    let obj = {
                        id: en.id,
                        text: en.text,
                        orderIndex: en.orderIndex,
                        root: en.root,
                        state: en.state
                    }
                    arr.push(obj)
                })
                this.setState({
                    apiList: arr
                })
            }
        })
    }
    componentDidMount() {
        this.getDataFn()
    }
    render() {
        const { addVisible, apiVisible, editVisible, rolesRows, editForm, apiList, currentApiList } = this.state
        return (
            <div className="roleManagePage">
                <div className="addRoleBox">
                    <Button type="primary" icon="edit" size="large" onClick={this.showAdd}>添加角色</Button>
                </div>
                <div className="roleList">
                    {rolesRows.length > 0 ?
                        rolesRows.map(item => {
                            return (
                                <div className="roleItem" key={item.id}>
                                    <div className="nameBox">{item.roleCode}</div>
                                    <div className="infoBox">
                                        <div className="roleInfo">
                                            <span className="roles">角色描述:</span>
                                            <span className="info">{item.description}</span>
                                        </div>
                                        <div className="roleInfo">
                                            <span className="roles">添加时间:</span>
                                            <span className="info">{moment(item.gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>
                                        </div>
                                        <div className="roleOperarion">
                                            <Button type="primary" size="small" onClick={this.showEdit.bind(this, item)}>修改</Button>
                                            <Button type="primary" size="small" onClick={this.showApiRoleManageModel.bind(this, item)}>接口权限</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : <Empty description="暂无数据，请添加角色" />
                    }
                </div>
                <AddRole addVisible={addVisible} closeModel={this.closeModel}  />
                <EditRole editVisible={editVisible} closeModel={this.closeModel} editForm={editForm} ref="editRoleRef" />
                <ApiRole apiVisible={apiVisible} closeModel={this.closeModel} currentApiList={currentApiList} apiList={apiList} ref="apiRoleRef" />
            </div>
        )
    }
}

export default RoleManage;