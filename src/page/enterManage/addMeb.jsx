import React from 'react'
import { Modal, message } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import MebForm from './mebForm'
import './index.scss'

class AddMeb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            addMebVisible: props.addMebVisible
        }
        this.enterhandleOk = this.enterhandleOk.bind(this)
        this.enterhandleCancel = this.enterhandleCancel.bind(this)
    }
    enterhandleOk() {
        if (!this.state.loading) {
        this.refs.mebFormRef.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                let paramsName = this.props.match.params.name
                values.app = paramsName
                ApiUtil.post("app.client.add", values, res => {
                    if (res.code === '0') {
                        message.success("添加成功")
                        this.enterhandleCancel(true)
                    } else if (res.code === '-9') {
                        message.error('appKey已存在')
                        this.setState({
                            loading: false
                        })
                    } else {
                        this.setState({
                            loading: false
                        })
                    }
                })
            }
        })
    }
    }
    enterhandleCancel(type) {
        this.setState({
            addMebVisible: false,
            loading: false
        }, () => {
            this.refs.mebFormRef.resetFields()
            this.props.closeModel(type)
        })
    }
    setMebFormData(data) {
        console.log(data)
        console.log(this.props.editForm)
        if (this.refs.mebFormRef) {
            let arr = []
            data.roleList.forEach(en => {
                arr.push(en.roleCode)
            })
            this.refs.mebFormRef.setFieldsValue({
                appKey: data.appKey,
                secret: data.secret,
                pubKey: data.pubKey ? data.pubKey : '',
                priKey: data.priKey ? data.priKey : '',
                roleCode: arr,
                status: data.status
            })
        }
    }
    componentDidMount() {

    }
    render() {
        const { roleList, mebFormType } = this.props
        return (
            <Modal
                title="新增接入方"
                width="720px"
                className="enterMebModalBox"
                visible={this.state.addMebVisible}
                onOk={this.enterhandleOk}
                onCancel={this.enterhandleCancel.bind(this, false)}
            >
                <MebForm
                    formType={mebFormType}
                    roleList={roleList}
                    ref="mebFormRef" />
            </Modal>
        )
    }
}

export default AddMeb;