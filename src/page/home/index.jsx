import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom'

class Home extends React.Component {
    componentDidMount() {
    }
    render() {
        const userName = localStorage.getItem("userName")
        return (
            <div className="homePage">
                <Link
                    to={{ pathname: "/maker/blank", search: '123' }}
                    target="_blank"
                >
                    另开一tab页
                </Link>
                <img src='https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3' alt="配置中心" className="imgbox" />
                <div className="homeTip">
                    欢迎{userName}使用配置中心
                </div>
            </div>
        )
    }
}

export default Home;