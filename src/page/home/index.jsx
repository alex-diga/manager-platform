import React from 'react';
import './index.scss';
import ReactEcharts from 'echarts-for-react';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 60,
            echartsOption: {},
            yData: []
        }
        this.time = null
    }
    getOption(x, y) {
        return {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: x
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: y,
                type: 'line',
                smooth: true,
                symbol: 'none',
                stack: 'a',
                areaStyle: {
                    normal: {}
                },
            }]
        };
    }
    setArr(length) {
        let arr = []
        let i = 59
        while (i >= 0) {
            arr.push(i)
            i --
        }
        return arr
    }
    setOption() {
        let limit = this.state.num + 1
        let xArr = this.setArr(limit)
        let yArr = JSON.parse(JSON.stringify(this.state.yData))
        if (yArr.length > 60) yArr.shift()
        yArr.push(Math.ceil(Math.random() * 100))
        this.setState({
            yData: yArr
        })
        this.setState({
            num: limit,
            echartsOption: this.getOption(xArr, this.state.yData)
        })
    }
    init() {
        let arr = [1, 2, 3]
        arr.push(4)
        console.log(arr)  //[1, 2, 3, 4]
        arr.push(5, 6, 7)
        console.log(arr)  //[1, 2, 3, 4, 5, 6, 7]
    }
    componentDidMount() {
        // this.setOption()
        this.init()
        let arr = []
        arr.length = 60
        this.setState({
            yData: arr
        })
        this.timer = setInterval(this.setOption.bind(this), 1000)
    }
    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer)
    }
    render() {
        const userName = localStorage.getItem("userName")
        return (
            <div className="homePage">
                <img src='https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3' alt="配置中心" className="imgbox" />
                <div className="homeTip">
                    欢迎{userName}使用配置中心
                </div>
                <ReactEcharts option={this.state.echartsOption} />
            </div>
        )
    }
}

export default Home;