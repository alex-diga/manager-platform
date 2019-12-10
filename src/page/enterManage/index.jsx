import React from 'react'
import moment from 'moment'
import { Button, Input, Table, Pagination, Tag } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import AddMeb from './addMeb'
import EditMeb from './editMeb'
import ShowKey from './showKey'
import './index.scss'

class EnterManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            appkey: '',
            searchState: false,
            pageSize: 10,
            pageNum: 1,
            pageTotal: 0,
            tabList: [],
            roleList: [],
            editForm: {},
            showKeyData: {},
            addMebVisible: false,
            editMebVisible: false,
            mebFormType: 'add',
            showKeyVisible: false
        }
        this.changePageNum = this.changePageNum.bind(this)
        this.changePagSize = this.changePagSize.bind(this)
        this.editSource = this.editSource.bind(this)
        this.getDataFn = this.getDataFn.bind(this)
        this.searchTabKey = this.searchTabKey.bind(this)
        this.changeKey = this.changeKey.bind(this)
        this.addEnterMeb = this.addEnterMeb.bind(this)
        this.showPubKeyFn = this.showPubKeyFn.bind(this)
        this.closeModel = this.closeModel.bind(this)
    }
    // 新增接入方
    addEnterMeb() {
        this.setState({
            mebFormType: 'add',
            addMebVisible: true
        })
    }
    // 编辑接入方信息
    editSource(data) {
        this.setState({
            editForm: data,
            mebFormType: 'edit',
            editMebVisible: true,
        })
        this.refs.mebModalRef.setMebFormData(data)
    }
    // 展示公私钥对话框
    showPubKeyFn(data) {
        this.setState({
            showKeyVisible: true,
            showKeyData: data
        })
    }
    // 通过关键字搜索接入方
    changeKey(e) {
        this.setState({
            appkey: e.target.value,
            searchState: true
        })
    }
    searchTabKey() {
        if (this.state.searchState) {
            this.setState({
                appkey: this.state.appkey.trim()
            })
            this.getDataFn()
        }
    }
    // 改变页码数
    changePageNum(page) {
        // console.log(page)
        this.setState({
            pageNum: page
        })
        this.getDataFn()
    }
    // 改变分页数
    changePagSize(current, size) {
        console.log(current, size)
        this.setState({
            pageNum: 1,
            pageSize: size
        })
        this.getDataFn()
    }
    closeModel(type) {
        this.setState({
            showKeyVisible: false,
            addMebVisible: false,
            editMebVisible: false
        })
        if (type) {
            this.getDataFn()
        }
    }
    getDataFn() {
        let paramsName = this.props.match.params.name
        // 根据搜索内容和分页获取列表数据
        ApiUtil.post("app.client.list", {
            appkey: this.state.appkey,
            page: this.state.pageNum,
            rows: this.state.pageSize,
            app: paramsName,
        }, res => {
            if (res.code === '0') {
                this.setState({
                    tabList: res.data.rows,
                    pageTotal: res.data.total,
                    searchState: false
                })
            }
        })
        // 获取所有角色信息
        ApiUtil.post("role.tree.listall", {}, res => {
            if (res.code === '0') {
                this.setState({
                    roleList: res.data[0].children
                })
            }
        })
    }
    componentDidMount() {
        this.getDataFn()
    }
    render() {
        const columns = [
            {
                title: 'appKey',
                dataIndex: 'appKey',
                width: '18%',
                ellipsis: true
            },
            {
                title: 'secret',
                dataIndex: 'secret',
                width: '18%',
                ellipsis: true
            },
            {
                title: '角色',
                dataIndex: 'roleList',
                width: '18%',
                ellipsis: true,
                render: roleList => (
                    <span>
                        {roleList.map(item => {
                            return (
                                <Tag color="green" key={item.id}>
                                    {item.description}
                                </Tag>
                            );
                        })}
                    </span>
                )
            },
            {
                title: '添加时间',
                dataIndex: 'gmtCreate',
                width: '13%',
                ellipsis: true,
                render: gmtCreate => {
                    return <span>{moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</span>
                }
            },
            {
                title: '公钥/私钥',
                dataIndex: 'pubKey',
                width: '10%',
                render: (pubKey, reocrd) => {
                    let state = pubKey.length > 0 ? true : false
                    return (<span>{state
                        ? <span onClick={this.showPubKeyFn.bind(this, reocrd)} style={{ color: '#40a9ff', cursor: 'pointer' }}>查看</span>
                        : '未设置'}</span>)
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: '10%',
                render: status => {
                    let color = status === 0 ? '#87d068' : '#f50'
                    return (<Tag color={color}>{status === 0 ? '启用' : '禁用'}</Tag>)
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (reocrd) =>
                    tabList.length > 0 ? (
                        <span>
                            <Button type="primary" onClick={this.editSource.bind(this, reocrd)}>修改</Button>
                        </span>) : null
            }

        ]
        const { pageSize, pageNum, pageTotal, addMebVisible, editMebVisible, tabList, roleList, showKeyData, showKeyVisible, mebFormType, editForm } = this.state
        return (
            <div className="enterManagePage">
                <div className="searchBox">
                    <Input placeholder="请输入appKey" allowClear onChange={this.changeKey} value={this.state.appkey} />
                    <Button type="primary" icon="search" onClick={this.searchTabKey}>搜索</Button>
                    <Button type="primary" icon="edit" onClick={this.addEnterMeb}>添加</Button>
                </div>
                <AddMeb
                    match={this.props.match}
                    mebFormType={mebFormType}
                    addMebVisible={addMebVisible}
                    roleList={roleList}
                    closeModel={this.closeModel}
                    ref="mebModalRef" />       
                <ShowKey showKeyData={showKeyData} showKeyVisible={showKeyVisible} closeModel={this.closeModel} />
                <EditMeb
                    match={this.props.match}
                    mebFormType={mebFormType}
                    editMebVisible={editMebVisible}
                    roleList={roleList}
                    editForm={editForm}
                    closeModel={this.closeModel}
                    ref="mebModalRef" />
                <Table rowKey="id" bordered columns={columns} dataSource={tabList} pagination={false} />
                {pageTotal > 0 && <div className="pageBox">
                    <Pagination
                        defaultCurrent={pageNum}
                        pageSize={pageSize}
                        total={pageTotal}
                        onChange={this.changePageNum}
                        onShowSizeChange={this.changePagSize}
                        showTotal={() => `共 ${pageTotal} 条`}
                        showSizeChanger
                        showQuickJumper />
                </div>}
            </div>
        )
    }
}

export default EnterManage;