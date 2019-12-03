import React from 'react'
import './index.scss'
import { Button, Input, Select, Modal, Pagination } from 'antd'

const { Option } = Select

class NetManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: 8,
            pageNum: 1,
            pageTotal: 200
        }
        this.changePageNum = this.changePageNum.bind(this)
        this.changePagSize = this.changePagSize.bind(this)
    }
    // 改变页码数
    changePageNum(page) {
        // console.log(page)
        this.setState({
            pageNum: page
        })
    }
    // 改变分页数
    changePagSize(current, size) {
        console.log(current, size)
        this.setState({
            pageNum: current,
            pageSize: size
        })
    }
    componentDidMount() { }
    render() {
        const {pageSize, pageNum, pageTotal } = this.state
        return (
            <div className="netManagePage">
                <div className="searchBox">
                    <Button icon="edit" onClick={en => { console.log(en) }}>批量设置</Button>
                    {/* <Input placeholder="请输入接口名" /> */}
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="jack">Jack1</Option>
                        <Option value="lucy">Lucy1</Option>
                        <Option value="Yiminghe">yiminghe1</Option>
                    </Select>
                    <Select defaultValue="lucy" style={{ width: 120 }}>
                        <Option value="jack">Jack1</Option>
                        <Option value="lucy">Lucy1</Option>
                        <Option value="Yiminghe">yiminghe1</Option>
                    </Select>
                </div>
                <div className="pageBox">
                    <Pagination 
                    defaultCurrent={pageNum} 
                    pageSize={pageSize} 
                    total={pageTotal} 
                    pageSizeOptions={['8', '10', '20', '30', '40']}
                    onChange={this.changePageNum} 
                    onShowSizeChange={this.changePagSize}
                    showTotal={total => `共 ${pageTotal} 条`}
                    showSizeChanger 
                    showQuickJumper />
                </div>
            </div>
        )
    }
}

export default NetManage;