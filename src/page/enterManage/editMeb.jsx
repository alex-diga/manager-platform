import React from 'react'
import { Modal, message } from 'antd'
import ApiUtil from '../../utils/ApiUtil'
import MebForm from './mebForm'
import './index.scss'

class EditMeb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            editMebVisible: props.editMebVisible
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
                    values.id = this.props.editForm.id
                    ApiUtil.post("app.client.update", values, res => {
                        if (res.code === '0') {
                            message.success("修改成功")
                            this.enterhandleCancel(true)
                            this.setState({
                                hasemit: true
                            })
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
            editMebVisible: false,
            loading: false
        }, () => {
            this.props.closeModel(type)
        })
    }
    componentDidMount() {

    }
    render() {
        const { editForm, roleList, mebFormType } = this.props
        return (
            <Modal
                title='修改接入方信息'
                width="720px"
                className="enterMebModalBox"
                visible={this.state.editMebVisible}
                onOk={this.enterhandleOk}
                onCancel={this.enterhandleCancel.bind(this, false)}
            >
                {this.state.editMebVisible && <MebForm
                    formType={mebFormType}
                    dataForm={editForm}
                    roleList={roleList}
                    ref="mebFormRef" />}
            </Modal>
        )
    }
}

export default EditMeb;