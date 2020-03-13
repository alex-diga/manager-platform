import React from 'react';
import './index.scss';
import ReactEcharts from 'echarts-for-react';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    getOption() {
        return {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }]
        };
    }
    init() {
    }
    componentDidMount() {
        // this.init()
    }
    render() {
        const userName = localStorage.getItem("userName")
        return (
            <div className="homePage">
                <img src='https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3' alt="配置中心" className="imgbox"/>
                <div className="homeTip">
                    欢迎{userName}使用配置中心
                </div>
                <ReactEcharts option={this.getOption()} />
            </div>
        )
    }
}

export default Home;