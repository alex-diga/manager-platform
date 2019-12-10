import React from 'react'
import moment from 'moment'
import { Button, Input, Table, Pagination, Tag } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import ApiRole from './apiRole'
import './index.scss'

class ApiManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apiKey: '',
            seatchState: false,
            pageNum: 1,
            pageSize: 10,
            pageTotal: 0,
            tabList: [],
            roleList: [],
            modalVisible: false,
            selectList: [],
            roleId: null
        }
        this.changeKey = this.changeKey.bind(this)
        this.searchApiKey = this.searchApiKey.bind(this)
        this.authorizationFn = this.authorizationFn.bind(this)
        this.changePageNum = this.changePageNum.bind(this)
        this.changePagSize = this.changePagSize.bind(this)
        this.closeModalFn = this.closeModalFn.bind(this)
    }
    // 根据搜索框关键字搜索数据
    changeKey(e) {
        this.setState({
            apiKey: e.target.value,
            seatchState: true
        })
    }
    searchApiKey() {
        if (this.state.seatchState) {
            this.setState({
                apiKey: this.state.apiKey.trim()
            })
            this.getApiList()
        }
    }
    // 换页
    changePageNum(page) {
        this.setState({
            pageNum: page
        })
        this.getApiList()
    }
    // 切换每页显示数据数量
    changePagSize(current, size) {
        this.setState({
            pageNum: 1,
            pageSize: size
        })
        this.getApiList()
    }
    closeModalFn(state) {
        this.setState({
            modalVisible: false
        })
        if (state) {
            this.getApiList()
        }
    }
    // 授权
    authorizationFn(data) {
        let arr = []
        ApiUtil.post("api.role.listall", {
            apiId: data.id
        }, res => {
            if (res.code === '0') {
                res.data.forEach(en => {
                    arr.push(en.roleCode)
                })
                this.setState({
                    selectList: arr,
                    modalVisible: true,
                    roleId: data.id
                })
                this.refs.apiRoleRef.setApiRole(arr)
            }
        })
    }
    getApiList() {
        ApiUtil.post("app.api.pagelist", {
            name: this.state.apiKey,
            page: this.state.pageNum,
            rows: this.state.pageSize,
            app: this.props.match.params.name,
        }, res => {
            if (res.code === '0') {
                this.setState({
                    tabList: res.data.rows,
                    seatchState: false,
                    pageTotal: res.data.total
                })
            }
        })
        ApiUtil.post("role.tree.listall", {}, res => {
            if (res.code === '0') {
                this.setState({
                    roleList: res.data[0].children
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            console.log('改变路由了')
        } 
     }
    componentDidMount() {
        this.getApiList()
    }
    render() {
        const columns = [
            {
                title: '接口名',
                dataIndex: 'name',
                width: '15%'
            },
            {
                title: '版本号',
                dataIndex: 'version',
                width: '15%',
                render: version =>
                    <span>{version ? version : '--'}</span>
            },
            {
                title: '描述',
                dataIndex: 'description',
                width: '20%',
            },
            {
                title: '添加时间',
                dataIndex: 'gmtCreate',
                width: '15%',
                render: gmtCreate =>
                    <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: '12%',
                render: status => {
                    let color = status === 0 ? '#87d068' : '#f50'
                    return (<Tag color={color}>{status === 0 ? '使用中' : '未使用'}</Tag>)
                }
            },
            {
                title: '授权状态',
                dataIndex: 'hasAuthed',
                width: '12%',
                render: hasAuthed => {
                    let color = hasAuthed === true ? '#87d068' : '#f50'
                    return (<Tag color={color}>{hasAuthed === true ? '已授权' : '未授权'}</Tag>)
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (reocrd) =>
                    tabList.length > 0 ? (
                        <span>
                            <Button type="primary" onClick={this.authorizationFn.bind(this, reocrd)}>授权</Button>
                        </span>) : null
            }
        ]
        const { tabList, pageNum, pageSize, pageTotal, modalVisible, selectList, roleList, roleId } = this.state
        return (
            <div className="apiManagePage">
                <div className="searchBox">
                    <Input placeholder="请输入接口名" allowClear onChange={this.changeKey} value={this.state.apiKey} />
                    <Button type="primary" icon="search" onClick={this.searchApiKey}>搜索</Button>
                </div>
                <ApiRole
                    ref="apiRoleRef"
                    roleId={roleId}
                    match={this.props.match}
                    modalVisible={modalVisible}
                    selectList={selectList}
                    roleList={roleList}
                    closeModal={this.closeModalFn} />
                <Table rowKey="id" bordered columns={columns} dataSource={tabList} pagination={false} />
                {pageTotal > 0 && <Pagination
                    defaultCurrent={pageNum}
                    pageSize={pageSize}
                    total={pageTotal}
                    onChange={this.changePageNum}
                    onShowSizeChange={this.changePagSize}
                    showTotal={() => `共 ${pageTotal} 条`}
                    showSizeChanger
                    showQuickJumper />}
            </div>
        )
    }
}

export default ApiManage;