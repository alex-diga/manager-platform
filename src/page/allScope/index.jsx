import React from 'react'
import { Button, Pagination, Table } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import Deploy from './deploy'
import './index.scss'

class AllScope extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNum: 1,
            pageSize: 10,
            pageTotal: 1,
            allScopeList: [],
            modalType: 'add',
            modalForm: {},
            showModal: false

        }
        this.addScopeDeploy = this.addScopeDeploy.bind(this)
        this.changePageNum = this.changePageNum.bind(this)
        this.changePagSize = this.changePagSize.bind(this)
        this.editDeploy = this.editDeploy.bind(this)
        this.getAllDeployData = this.getAllDeployData.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    // 添加配置
    addScopeDeploy() {
        this.setState({
            modalType: 'add',
            showModal: true
        })
    }
    // 修改配置
    editDeploy(data) {
        this.setState({
            modalType: 'edit',
            modalForm: data,
            showModal: true
        })
    }
    closeModal(state) {
        this.setState({
            showModal: false
        })
        if (state) {
            this.getAllDeployData()
        }
    }
    changePageNum(page) {
        this.setState({
            pageNum: page
        })
        this.getAllDeployData()
    }
    changePagSize(current, size) {
        this.setState({
            pageNum: 1,
            pageSize: size
        })
        this.getAllDeployData()
    }
    getAllDeployData() {
        ApiUtil.post("global.config.pagelist", {
            pageIndex: this.state.pageNum,
            pageSize: this.state.pageSize,
        }, res => {
            if (res.code === '0') {
                this.setState({
                    pageTotal: res.data.total,
                    allScopeList: res.data.rows
                })
            }
        })
    }
    componentDidMount() {
        this.getAllDeployData()
    }
    render() {
        const columns = [
            {
                title: '配置域',
                dataIndex: 'keyName',
                width: '18%'
            },
            {
                title: '配置项',
                dataIndex: 'fieldName',
                width: '24%'
            },
            {
                title: '配置值',
                dataIndex: 'fieldValue',
                width: '18%'
            },
            {
                title: '描述',
                dataIndex: 'remark',
                width: '24%'
            },
            {
                title: '操作',
                key: 'action',
                render: (reocrd) =>
                    allScopeList.length > 0
                        ? <Button type="primary" onClick={this.editDeploy.bind(this, reocrd)}>修改</Button>
                        : null
            },
        ]
        const { pageSize, pageNum, pageTotal, allScopeList, modalType, modalForm, showModal } = this.state
        return (
            <div className="allScopePage">
                <div className="pageHeader">
                    <Button type="primary" icon="edit" onClick={this.addScopeDeploy}>添加设置</Button>
                </div>
                <Deploy modalType={modalType} modalForm={modalForm} showModal={showModal} closeModal={this.closeModal} />
                <Table rowKey="id" bordered columns={columns} dataSource={allScopeList} pagination={false} />
                {pageTotal && <Pagination
                    defaultCurrent={pageNum}
                    pageSize={pageSize}
                    total={pageTotal}
                    onChange={this.changePageNum}
                    onShowSizeChange={this.changePagSize}
                    showTotal={pageTotal => `共 ${pageTotal} 条`}
                    showSizeChanger
                    showQuickJumper />}
            </div>
        )
    }
}

export default AllScope;