import React from 'react'
import { Button, Input, Select, Pagination, Table, Tag, message } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import NetModal from './netModal'
import './index.scss'

const { Option } = Select
class NetManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: 10,
            pageNum: 1,
            pageTotal: 0,
            netKey: '',
            selectStatus: null,
            selectLimit: null,
            // searchState: false,
            netTabList: [],
            selectedRowKeys: [],
            selectedBatchData: [],
            showModal: false,
            modalType: 'batch',
            singleData: {}
        }
        this.getNetTabList = this.getNetTabList.bind(this)
        this.changePageNum = this.changePageNum.bind(this)
        this.changePagSize = this.changePagSize.bind(this)
        this.searchNetKey = this.searchNetKey.bind(this)
        this.changeNetKey = this.changeNetKey.bind(this)
        this.select1Change = this.select1Change.bind(this)
        this.select2Change = this.select2Change.bind(this)
        this.batchSettingFn = this.batchSettingFn.bind(this)
        this.onTabSelectChange = this.onTabSelectChange.bind(this)
        this.editNetManage = this.editNetManage.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    // 改变页码数
    changePageNum(page) {
        // console.log(page)
        this.setState({
            pageNum: page
        }, () => this.getNetTabList())  
    }
    // 改变分页数
    changePagSize(current, size) {
        // console.log(current, size)
        this.setState({
            pageNum: 1,
            pageSize: size
        }, () => this.getNetTabList())
    }
    // 搜索
    changeNetKey(e) {
        this.setState({
            netKey: e.target.value,
            // searchState: true
        })
    }
    searchNetKey() {
        // if (this.state.searchState) {
            this.setState({
                pageNum: 1,
                netKey: this.state.netKey.trim()
            }, () => this.getNetTabList())
        // }
    }
    select1Change(e) {
        this.setState({
            selectStatus: e,
            // searchState: true
        })
    }
    select2Change(e) {
        this.setState({
            selectLimit: e,
            // searchState: true
        })
    }
    closeModal(state) {
        this.setState({
            showModal: false
        })
        if (state) {
            this.getNetTabList()
        }
    }
    // 修改设置
    editNetManage(data) {
        this.setState({
            showModal: true,
            modalType: 'single',
            singleData: data,
        })
    }
    // 批量设置
    onTabSelectChange(selectedRowKeys) {
        this.setState({
            selectedRowKeys: selectedRowKeys
        })
    }
    batchSettingFn() {
        if (this.state.selectedRowKeys.length > 0) {
            this.setState({
                showModal: true,
                modalType: 'batch',
                selectedBatchData: this.state.selectedRowKeys
            })
        } else {
            message.warn("请勾选数据项")
        }
    }
    getNetTabList() {
        ApiUtil.post("app.limit.pagelist", {
            name: this.state.netKey,
            status: this.state.selectStatus,
            limitType: this.state.selectLimit,
            page: this.state.pageNum,
            rows: this.state.pageSize,
            app: this.props.match.params.name
        }, res => {
            if (res.code === '0') {
                this.setState({
                    netTabList: res.data.rows,
                    // searchState: false,
                    pageTotal: res.data.total
                })
            }
        })
    }
    componentDidMount() {
        this.getNetTabList()
    }
    render() {
        const options1 = [
            {
                value: null,
                label: '全部'
            },
            {
                value: '1',
                label: '开启'
            }, {
                value: '0',
                label: '关闭'
            }
        ]
        const options2 = [
            {
                value: null,
                label: '全部'
            },
            {
                value: 'LIMIT',
                label: '限流策略'
            }, {
                value: 'TOKEN_BUCKET',
                label: '令牌桶策略'
            }
        ]
        const columns = [
            {
                title: '接口名',
                dataIndex: 'name',
                width: 250,
                fixed: 'left'
            },
            {
                title: '版本号',
                dataIndex: 'version',
                render: version =>
                    <span>{version ? version : '--'}</span>
            },
            {
                title: '每秒可处理请求数',
                dataIndex: 'limitCount',
                width: 160,
                // defaultSortOrder: 'descend',
                // sorter: (a, b) => a.limitCount - b.limitCount,
            },
            {
                title: 'code',
                dataIndex: 'limitCode',
                width: 120,
                render: code =>
                    <span>{code ? code : '--'}</span>
            },
            {
                title: 'msg',
                dataIndex: 'limitMsg',
                width: 220,
                ellipsis: true,
                render: limitMsg =>
                    <span>{limitMsg ? limitMsg : '--'}</span>
            },
            {
                title: '令牌桶容量',
                dataIndex: 'tokenBucketCount',
                width: 120,
                // defaultSortOrder: 'descend',
                // sorter: (a, b) => a.tokenBucketCount - b.tokenBucketCount,
            },
            {
                title: '开启状态',
                dataIndex: 'status',
                width: 160,
                render: status => {
                    let color = status === 1 ? '#87d068' : '#f50'
                    return (<Tag color={color}>{status === 1 ? '开启' : '关闭'}</Tag>)
                }
            },
            {
                title: '当前策略',
                dataIndex: 'limitType',
                width: 160,
                render: limitType =>
                    <span>{limitType === 'LIMIT' ? '限流策略' : '令牌桶策略'}</span>
            },
            {
                title: '操作',
                key: 'action',
                width: 160,
                fixed: 'right',
                render: (reocrd) =>
                    netTabList.length > 0
                        ? <Button type="primary" size="small" onClick={this.editNetManage.bind(this, reocrd)}>修改</Button>
                        : null
            },
        ]
        const { pageSize, pageNum, pageTotal, netTabList, selectedRowKeys,selectedBatchData, showModal, modalType, singleData } = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onTabSelectChange,
        }
        return (
            <div className="netManagePage">
                <div className="searchBox">
                    <Button className="searchItem settingButton" icon="edit" onClick={this.batchSettingFn}>批量设置</Button>
                    <Input className="searchItem searchInput" allowClear placeholder="请输入接口名" onPressEnter={this.searchNetKey} onChange={this.changeNetKey} value={this.state.netKey} />
                    <Select className="searchItem selectBox" defaultValue="全部" onChange={this.select1Change}>
                        {options1.map((en, index) => {
                            return (
                                <Option key={index} value={en.value}>{en.label}</Option>
                            )
                        })}
                    </Select>
                    <Select className="searchItem selectBox" defaultValue="全部" onChange={this.select2Change}>
                        {options2.map((en, index) => {
                            return (
                                <Option key={index} value={en.value}>{en.label}</Option>
                            )
                        })}
                    </Select>
                    <Button className="searchItem" icon="search" type="primary" onClick={this.searchNetKey}>搜索</Button>
                </div>
                {showModal && <NetModal
                    ref="netModalRef"
                    match={this.props.match}
                    closeModal={this.closeModal}
                    showModal={showModal}
                    selectedBatchData={selectedBatchData}
                    singleData={singleData}
                    modalType={modalType} />}
                <Table rowSelection={rowSelection} rowKey="apiId" bordered columns={columns} dataSource={netTabList} pagination={false}  scroll={{ x: 1520 }} scrollToFirstRowOnChange />
                {pageTotal > 0 && <div className="pageBox">
                    <Pagination
                        current={pageNum}
                        defaultCurrent={pageNum}
                        pageSize={pageSize}
                        total={pageTotal}
                        onChange={this.changePageNum}
                        onShowSizeChange={this.changePagSize}
                        showTotal={pageTotal => `共 ${pageTotal} 条`}
                        showSizeChanger
                        showQuickJumper />
                </div>}
            </div>
        )
    }
}

export default NetManage;