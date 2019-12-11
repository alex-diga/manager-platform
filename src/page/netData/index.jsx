import React from 'react'
import { Button, Input, Pagination, Table, DatePicker, Modal } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import moment from 'moment'
import './index.scss'

const { MonthPicker, RangePicker } = DatePicker
class NetData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            netKey: '',
            beginTime: null,
            endTime: null,
            searchState: false,
            pageNum: 1,
            pageSize: 10,
            pageTotal: 0,
            netData: [],
            showLog: false,
            errData: []
        }
        this.changeNetKey = this.changeNetKey.bind(this)
        this.searchNetKey = this.searchNetKey.bind(this)
        this.getNetDataFn = this.getNetDataFn.bind(this)
        this.changeDataPicker = this.changeDataPicker.bind(this)
        this.changePageNum = this.changePageNum.bind(this)
        this.changePagSize = this.changePagSize.bind(this)
        this.showErrorLog = this.showErrorLog.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    changeNetKey(e) {
        this.setState({
            netKey: e.target.value,
            searchState: true
        })
    }
    changeDataPicker(date, dateString) {
        this.setState({
            beginTime: moment(dateString[0], 'YYYY-MM-DD').valueOf(),
            endTime: moment(dateString[1], 'YYYY-MM-DD').valueOf() + 85399000,
            searchState: true
        })
    }
    searchNetKey() {
        if (this.state.searchState) {
            this.setState({
                pageNum: 1,
            }, () => this.getNetDataFn())
            
        }
    }
    changePageNum(page) {
        this.setState({
            pageNum: page
        }, () => this.getNetDataFn())

    }
    changePagSize(num, size) {
        this.setState({
            pageNum: 1,
            pageSize: size
        }, () => this.getNetDataFn())
    }
    showErrorLog(data) {
        this.setState({
            showLog: true,
            errData: data
        })
    }
    handleCancel() {
        this.setState({
            showLog: false
        })  
    }
    getNetDataFn() {
        ApiUtil.post("monitor.info.pagelist", {
            keyword: this.state.netKey,
            beginTime: this.state.beginTime,
            endTime: this.state.endTime,
            page: this.state.pageNum,
            rows: this.state.pageSize,
            app: this.props.match.params.name
        }, res => {
            if (res.code === '0') {
                this.setState({
                    searchState: false,
                    netData: res.data.rows,
                    pageTotal: res.data.total
                })
            }
        })
    }
    componentDidMount() {
        this.getNetDataFn()
    }
    render() {
        const columns = [
            {
                title: 'appKey',
                dataIndex: 'appKey',
            },
            {
                title: '接口名',
                dataIndex: 'name',
            },
            {
                title: '描述',
                dataIndex: 'description',
            },
            {
                title: '版本',
                dataIndex: 'version',
            },
            {
                title: '访问次数',
                dataIndex: 'visitCount'
            },
            {
                title: '错误次数',
                dataIndex: 'errorCount',
                render: (errorCount, reocrd) =>
                    <span>{errorCount > 0 ? <Button size="small" type="primary" onClick={this.showErrorLog.bind(this, reocrd)}>查看</Button> : 0}</span>
            },
            {
                title: '最大响应时间/毫秒',
                dataIndex: 'maxCost',
            },
            {
                title: '平均响应时间/毫秒',
                dataIndex: 'avgCost',
            },
            {
                title: '开始时间',
                dataIndex: 'beginTime',
                render: beginTime =>
                    <span>{moment(beginTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
            {
                title: '结束时间',
                dataIndex: 'endTime',
                render: endTime =>
                    <span>{moment(endTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            },
        ]
        const dateFormat = 'YYYY/MM/DD'
        const { pageNum, pageSize, pageTotal, netData, showLog, errData } = this.state
        return (
            <div className="netDataPage">
                <div className="searchBox">
                    <Input className="searchItem searchInput" allowClear placeholder="请输入" onChange={this.changeNetKey} value={this.state.netKey} />
                    <RangePicker className="searchItem" allowClear onChange={this.changeDataPicker} format={dateFormat} />
                    <Button className="searchItem" icon="search" type="primary" onClick={this.searchNetKey}>搜索</Button>
                </div>
                <Table rowKey="id" bordered columns={columns} dataSource={netData} pagination={false} />
                {pageTotal > 0 && <Pagination
                    defaultCurrent={pageNum}
                    pageSize={pageSize}
                    total={pageTotal}
                    onChange={this.changePageNum}
                    onShowSizeChange={this.changePagSize}
                    showTotal={pageTotal => `共 ${pageTotal} 条`}
                    showSizeChanger
                    showQuickJumper />}
                <Modal
                    title="错误日志"
                    className="netDataModalBox"
                    width="720px"
                    visible={showLog}
                    onCancel={this.handleCancel}
                    footer={[<Button key="back" onClick={this.handleCancel}>返回</Button>]}
                >
                    {showLog === true && <div className="errorLogBox">
                        {errData.map(en => {
                            return (
                            <div className="itemBox" key={en}>{en}</div>
                            )
                        })}
                    </div>}
                </Modal>
            </div>
        )
    }
}

export default NetData;