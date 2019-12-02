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
            <div className="homePage">首页</div>
        )
    }
}

export default Home;