//创建一个类
function Person() {};
//在原型上定义相关方法
Person.prototype = {
	post: function(url, params) {
		// console.log(url)
		return new Promise(function(resolve, reject) {
			uni.request({
				url: url, //仅为示例，并非真实接口地址。
				data: params,
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					switch (res.data.code) {
						case 0:
							resolve(res.data)
							break;
						default:
							reject(res.data);
							break;
					}
				},
				fail: (err) => {
					reject(err);
				}
			});
		})
	},
	get: function(url, params) {
		return new Promise(function(resolve, reject) {
			uni.request({
				url: url, //仅为示例，并非真实接口地址。
				data: params,
				method: 'GET',
				// header: {
				// 	'Content-Type':'application/x-www-form-urlencoded'
				// },
				success: (res) => {
					switch (res.data.code) {
						case 0:
							resolve(res.data)
							break;
						default:
							reject(res);
							break;
					}
				},
				fail: (err) => {
					reject(err);
				}
			});
		})
	}
}
//实例化
var ajax = new Person();
export default ajax
