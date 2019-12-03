import React from 'react';
import './index.scss';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() { }
    render() {
        return (
            <div className="homePage">
                <img src={require("../../assets/img/bg1.jpg")} alt="配置中心" className="imgbox"/>
            </div>
        )
    }
}

export default Home;