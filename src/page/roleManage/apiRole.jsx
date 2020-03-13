import React from 'react'
import { Modal, Tree, message, Spin } from 'antd'
import ApiUtil from '../../utils/ApiUtil'

const { TreeNode } = Tree
class RoleManage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roleCode: '',
            loading: false,
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            apiVisible: props.apiVisible
        }
        this.apiRoleModelhandleOk = this.apiRoleModelhandleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.onSelectChange = this.onSelectChange.bind(this)
    }
    // 确定添加角色、修改角色信息
    apiRoleModelhandleOk() {
        if (!this.state.loading) {
            let arr = this.state.checkedKeys.filter(en => {
                return en > 0
            })
            this.setState({
                loading: true
            })
            ApiUtil.post("role.api.update", {
                apiIds: arr,
                roleCode: this.state.roleCode,
                app: this.props.match.params.name
            }, res => {
                if (res.code === '0') {
                    message.success('修改接口权限成功')
                    this.handleCancel(true)
                } else {
                    this.setState({
                        loading: false
                    })
                }
            })
        }
    }
    // 关闭对话框、清除form表单信息
    handleCancel(type) {
        this.setState({
            apiVisible: false,
            loading: false
        }, () => {
            this.props.closeModel(type)
        })
    }
    onSelectChange(selectList) {
        this.setState({
            selectList: selectList
        })
    }
    onExpand = expandedKeys => {
        // console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }
    onSelect = (selectedKeys, info) => {
        // console.log('onSelect', info);
        this.setState({ selectedKeys });
    }
    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.text} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} {...item} />;
        });
    componentDidMount() {
        this.setState({
            checkedKeys: this.props.currentApiList,
            roleCode: this.props.roleCode
        })
    }
    render() {
        return (
            <Spin spinning={this.state.loading} delay={500}>
                <Modal
                    title="接口权限"
                    className="roleApimanageModal"
                    visible={this.state.apiVisible}
                    onOk={this.apiRoleModelhandleOk}
                    onCancel={this.handleCancel.bind(this, false)}
                >
                    <Tree
                        checkable
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                    >
                        {this.renderTreeNodes(this.props.apiList)}
                    </Tree>
                </Modal>
            </Spin>
        )
    }
}

export default RoleManage;