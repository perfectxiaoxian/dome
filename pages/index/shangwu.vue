<template>
	<view class="content">
		
		<view class="body-content">
			<view class="">
				公司名称：{{sW.company_name}}
			</view>
			<view class="">
				联系电话：{{sW.company_phone}}
			</view>
			<view class="">
				北京地址：{{sW.company_addr}}
			</view>
			<view class="">
				商务合作：{{sW.company_mailbox}}
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				sss: {

				},
				sW: {}

			}
		},
		onLoad() {
			this.GOhonme()
		},
		methods: {
			GOhonme() {
				let _this = this
				uni.getStorage({
					key: 'storage_key',
					success(e) {
						console.log(e)
						_this.sss = JSON.parse(e.data)
						console.log(md5(JSON.stringify({
							token: _this.sss.token,
							time: _this.sss.create_time,
							asskey: _this.sss.asskey,
							sig: _this.sss.sig
						})))
						// let www = md5(JSON.stringify({
						// 	token: _this.sss.token,
						// 	time: _this.sss.create_time,
						// 	asskey: _this.sss.asskey
						// })).substring(9, 17)
						let www = md5('token=' + _this.sss.token + 'time=' + _this.sss.create_time + 'asskey' + _this.sss.asskey).substring(
							9, 17)
						console.log(JSON.stringify({
							token: _this.sss.token,
							time: _this.sss.create_time,
							asskey: _this.sss.asskey,
							sig: www
						}))
						_this.$API.LOGIN.SHANGW(JSON.stringify({
							token: _this.sss.token,
							time: _this.sss.create_time,
							asskey: _this.sss.asskey,
							sig: www
						})).then(res => {
							console.log(res)
						}).catch(err => {
							console.log(err)
							_this.sW = err.data
							_this.sW.company_phone = _this.sW.company_phone.split(" ").join("-")
							console.log(_this.sW)
						})
						// uni.request({
						// 	url: "/api/index.php/Home/Member/getcolist",
						// 	method: "POST",
						// 	data: JSON.stringify({
						// 		token: _this.sss.token,
						// 		time: _this.sss.create_time,
						// 		asskey: _this.sss.asskey,
						// 		sig: www
						// 	}),
						// 	success(e) {
						// 		console.log(e)
						// 	}
						// })
					}
				})
				// console.log(this.paysm)

			},

		}
	}
</script>

<style scoped>
	.content {
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}

	.body-top {
		width: 100%;
		font-size: 26rpx;
		color: #666666;
		background-color: #EBEBEB;
		padding: 0 70rpx;
		box-sizing: border-box;
		margin-bottom: 50rpx;
	}

	.body-content {
		padding: 20rpx 70rpx 0;
		box-sizing: border-box;
		font-size: 34rpx;
		color: #333;
		line-height: 60rpx;
	}
</style>
