/**
请求示例：

var name = 'goods.get';
var version = '';

var jsonData = {};
 // form表单
 var formArray = _parent.find('form').serializeArray();

 jQuery.each(formArray, function(i, field){
     jsonData[field.name] = field.value;
 });

 ApiUtil.post(name,jsonData,version,function(resp,postDataStr){
     console.log(resp);
 });
*/

import sdk from './sdk'
import {
	message
} from 'antd'

var ApiUtil = (function () {
	var params = {};
	var JWT_KEY = "easyconf_jwt";

	// 开发环境
	//process.env.NODE_ENV === 'production'
	// http://172.16.119.44:9090/
	// http://172.16.119.185:7420/
	var url = process.env.NODE_ENV === 'development' ? "http://172.16.119.44:9090/api" : "/api"
	// var url = "http://172.20.1.237:7420/api"

	var app_key = 'test';
	var secret = '123456';

	(function () {
		var aPairs, aTmp;
		var queryString = window.location.search.toString();
		queryString = queryString.substr(1, queryString.length); //remove   "?"
		aPairs = queryString.split("&");
		for (var i = 0; i < aPairs.length; i++) {
			aTmp = aPairs[i].split("=");
			params[aTmp[0]] = aTmp[1];
		}
	})();

	/* **************私有方法************** */
	function getJwt() {
		let jwt = localStorage.getItem(JWT_KEY)
		// console.log('aaaaaa',jwt)
		return jwt || '';
	}

	//   //Html编码获取Html转义实体
	// 	function htmlEncode(value){
	// 		return $('<div/>').text(value).html();
	// 	}
	// 	//Html解码获取Html实体
	// 	function htmlDecode(value){
	// 		return $('<div/>').html(value).text();
	// 	}

	// 	function add0(m){return m<10?'0'+m:m }


	/* ************************************* */
	return {
		post: function (name, data, callback) {
			// if (!localStorage.getItem(JWT_KEY)) {
			// 	ApiUtil.logout()
			// }
			sdk.config({
				url: url,
				app_key: app_key,
				secret: secret,
				jwt: getJwt()
			});
			sdk.post({
				name: name // 接口名
					,
				data: data // 请求参数
					// ,jwt : getJwt()
					,
				callback: function (resp, postDataStr) { // 成功回调
					// console.log('resp',resp)
					var code = resp.code;
					if (!code || code === '-9') {
						message.error('系统错误,稍后再试')
						callback(resp, postDataStr);
						return
					}
					if (code === '-100' || code === '18' || code === '21') { // 未登录
						ApiUtil.logout();
						return;
					}
					if (code === '0') { // 成功
						callback(resp, postDataStr);
					} else {
						callback(resp, postDataStr);
						message.error(resp.msg)
					}
				}
			});
		},
		JWT_KEY: JWT_KEY,
		logout: function () {
			// this.post('nologin.admin.logout', {}, function (resp) {
				localStorage.removeItem(JWT_KEY);
				window.location.href = '/login'
			// })
		},
		getParam: function (key) {
			return params[key];
		},
		getUrl: function () {
			return url;
		}
		// get:function(name,callback) {
		//   sdk.get({
		//     name   : name // 接口名
		//     ,callback:function(resp,getDataStr) { // 成功回调
		//       var code = resp.code;
		//       if(!code || code == '-9') {
		//         MsgUtil.topMsg('系统错误');
		//         return;
		//       }
		//       if(code == '-100' || code == '18' || code == '21') { // 未登录
		//         ApiUtil.logout();
		//         return;
		//       }
		//       if(code == '0') { // 成功
		//         callback(resp,getDataStr);
		//       } else {
		//         MsgUtil.topMsg(resp.msg);
		//       }
		//     }
		//   });
		// }
		// ,logout:function() {
		//     this.post('nologin.admin.logout',{},function (resp) {
		// 		localStorage.removeItem("easyconf_jwt");
		//         router.push('/login')
		//     })
		// }
		// ,htmlEncode:function(value) {
		// 	return htmlEncode(value);
		// }
		// ,htmlDecode:function(value) {
		// 	return htmlDecode(value);
		// }

	};
})();

export default ApiUtil