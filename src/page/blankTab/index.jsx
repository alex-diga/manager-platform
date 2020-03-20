import React from 'react';
import './index.scss';
import ReactEcharts from 'echarts-for-react';

class BlankTab extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			num: 0,
			yArr: [],
			echartsOption: {}
		}
		this.timer = null
	}
	setLabel(index) {
		let l = this.state.num
		if(l <= 60) {
			return true
		} else {
			if (l < 360) {
				return index % 60 === 0 ? true : false
			} else {
				if (l < 3600) {
					return index % 360 === 0 ? true : false
				} else {
					return index % 3600 === 0 ? true : false
				}
			}
		}
	}
	setXArr() {
		let l = this.state.num
		let factor = 1
		let len = 60
		let i = 0
		let arr = []
		if(l <= 60) {
			factor = 1
			len = 60
		} else {
			if (l < 360) {
				factor = 60
				len = 360
			} else {
				if (l < 3600) {
					factor = 360
					len = 3600
				} else {
					factor = 3600
					len = 86400
				}
			}
		}
		while (i <= len) {
            arr.push(i/factor)
            i++
		}
		return arr
	}
	getOption(len, x, y) {
		return {
			animation: false,
			textStyle: {
				fontSize: 18
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: x,
				// name: '时间',
				// nameTextStyle: {
				//     color: 'red'
				// },
				// axisLine: {
				//     show: true,
				//     lineStyle: {
				//         color: '000'
				//     }
				// },
				axisTick: {
					show: true,
					// interval: len > 60 ? (len > 360 ? 3600 : 60) : 1
				},
				axisLabel: {
					show: true,
					interval: index => this.setLabel(index)
				},
				splitLine: {
					show: true,
					interval: len > 60 ? (len > 360 ? 3599 : 59) : 9
				}
			},
			yAxis: {
				type: 'value',
				// max:100,
				// minInterval: 0,
				// interval:10,
				axisLine: {
					show: true
				}
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
		}
	}
	setOption() {
		let num = this.state.num + 1
		let xArr = this.setXArr(num)
		let yArr = JSON.parse(JSON.stringify(this.state.yArr))
		yArr.push(Math.ceil(Math.random()*1000))
		this.setState({
			num: num,
			yArr: yArr,
			echartsOption: this.getOption(num, xArr, yArr)
		})
	}
	componentDidMount() {
		document.title = this.props.location.search.split('?')[1]
		this.timer = setInterval(this.setOption.bind(this), 1000)
	}
	componentWillUnmount() {
		if (this.timer) clearInterval(this.timer)
	}
	render() {
		return (
			<div className="noFoundPage">
				另外打开的一个tab页面
				<ReactEcharts style={{ height: '500px' }} option={this.state.echartsOption} />
			</div>
		)
	}
}

export default BlankTab