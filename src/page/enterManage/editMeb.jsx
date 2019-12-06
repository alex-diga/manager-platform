import React from 'react'
import { Modal, message } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import MebForm from './mebForm'
import './index.scss'

class EditMeb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        this.enterhandleOk = this.enterhandleOk.bind(this)
        this.enterhandleCancel = this.enterhandleCancel.bind(this)
    }
    enterhandleOk() {
        this.refs.mebFormRef.validateFields((err, values) => {
            if (!err) {
                let paramsName = this.props.match.params.name
                values.app = paramsName
                values.id = this.props.editForm.id
                ApiUtil.post("app.client.update", values, res => {
                    if (res.code === '0') {
                        message.success("添加成功")
                        this.enterhandleCancel(true)
                    } else if (res.code === '-9') {
                        message.error('appKey已存在')
                        return false
                    }
                })
            }
        })

    }
    enterhandleCancel(type) {
        this.refs.mebFormRef.resetFields()
        this.props.closeModel(type)
    }
    setMebFormData(data) {
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
        const { editForm, roleList, editMebVisible, mebFormType } = this.props
        return (
            <Modal
                title='修改接入方信息'
                width="720px"
                className="enterMebModalBox"
                visible={editMebVisible}
                onOk={this.enterhandleOk}
                onCancel={this.enterhandleCancel.bind(this, false)}
            >
                <MebForm
                    formType={mebFormType}
                    dataForm={editForm}
                    roleList={roleList}
                    ref="mebFormRef" />
            </Modal>
        )
    }
}

export default EditMeb;