import React from 'react'
import { Button, Modal, message } from 'antd'
import copy from 'copy-to-clipboard'
import './index.scss'

class ShowKey extends React.Component {
    constructor(props) {
        super(props)
        this.copyPubKey = this.copyPubKey.bind(this)
        this.copyPriKey = this.copyPriKey.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }
    copyPubKey(data) {
        copy(data)
        message.success("复制成功")
    }
    copyPriKey(data) {
        copy(data)
        message.success("复制成功")
    }
    handleCancel() {
        this.props.closeModel(false)
    }
    componentDidMount() {

    }
    render() {
        const { showKeyData, showKeyVisible } = this.props
        return (
            <Modal
                title="查看公钥私钥"
                visible={showKeyVisible}
                onCancel={this.handleCancel}
                className="enterManageModel"
                width="720px"
                footer={[<Button key="back" onClick={this.handleCancel}>返回</Button>]}
            >
                <div className="keyContent">
                    <div className="title">
                        公钥
                        <span className="copyBox" onClick={this.copyPubKey.bind(this, showKeyData.pubKey)}>复制</span>
                    </div>
                    <div className="content">{showKeyData.pubKey}</div>
                </div>
                <div className="keyContent">
                    <div className="title">
                        私钥
                        <span className="copyBox" onClick={this.copyPriKey.bind(this, showKeyData.priKey)}>复制</span>
                    </div>
                    <div className="content">{showKeyData.priKey}</div>
                </div>
            </Modal>
        )
    }
}

export default ShowKey;