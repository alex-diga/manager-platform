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
		if (l <= 60) {
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
	setXArr(type, unit) {
		// let l = this.state.num
		let l = type === 'real' ? 60 : this.state.yArr.length
		// console.log(Math.ceil(Math.log(Math.ceil(l / unit)) / Math.log(2)))
		// let len = this.state.num
		// let constant = len > 3600 ? 3600 :len > 60 ? 60 : 1
		// console.log(constant)
		let arr = []
		let i = 0
		if (l <= unit) {
			for (i = 0; i <= unit; i++) {
				arr.push(i)
			}
		} else {
			// let coef = Math.ceil(l / unit)
			let coef = Math.pow(2, Math.ceil(Math.log(Math.ceil(l / unit)) / Math.log(2)))
			while (i <= coef * unit) {
				arr.push(i)
				i += coef
			}
		}
		// console.log(arr)
		return arr
	}
	setYArr(arr, unit) {
		// arr.length > 10 && console.log(arr.length)
		let result = []
		if (arr.length <= unit) {
			result = arr
		} else {
			// let coef = Math.ceil(arr.length / unit)
			let coef = Math.pow(2, Math.ceil(Math.log(Math.ceil(arr.length / unit)) / Math.log(2)))
			for (let i = 0; i <= arr.length; i += coef) {
				let sum = 0
				for (let j = 0; j < coef; j++) {
					if (i + j < arr.length) {
						sum += arr[i + j]
					}
				}
				sum = sum / coef
				result.push(sum)
			}
			if ((arr.length % coef) > 1) {
				result.pop()
				let sum = 0
				for (let j = arr.length - 1; j > arr.length - (arr.length % coef); j--) {
					sum += arr[j]
				}
				result.push(sum / (arr.length % coef))
			} else {
				result.pop()
				result.push(arr[arr.length-1])
			}
		}
		// console.log(arr.length, result.length)
		return result
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
					// interval: index => this.setLabel(index)
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
		let xArr = this.setXArr('all', 10)
		let yArr = JSON.parse(JSON.stringify(this.state.yArr))
		yArr.push(Math.ceil(Math.random() * 100))
		let arr = this.setYArr(yArr, 10)
		this.setState({
			num: num,
			yArr: yArr,
			echartsOption: this.getOption(num, xArr, arr)
		})
	}
	init() {
		// 冒泡排序
		let arr = [145, 248, 31, 45, 9, 11, 145, 300];
		function arrSort(arr) {
			for (let i = 0; i < arr.length - 1; i++) {
				for (let j = i + 1; j < arr.length; j++) {
					if (arr[i] > arr[j]) {
						let tmp = arr[i]
						arr[i] = arr[j]
						arr[j] = tmp
					}
				}
			}
			return arr
		}
		// 插入排序
		function arrSort1(arr) {
			for (let i = 1; i < arr.length; i++) {
				let j = i - 1
				let key = arr[i]
				while (j >= 0 && arr[j] > key) {
					arr[j + 1] = arr[j]
					j--
				}
				arr[j + 1] = key
			}
			return arr
		}
		console.log(arrSort(arr))
		console.log(arrSort1(arr))
	}
	componentDidMount() {
		// this.init()
		// this.setYArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 10)
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
				<ReactEcharts style={{ height: '500px', width: '50%' }} option={this.state.echartsOption} />
			</div>
		)
	}
}

export default BlankTab