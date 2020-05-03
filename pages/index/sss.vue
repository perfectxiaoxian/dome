<template>
	<view class="content">
		<view class="body-top">
			最近更新：{{nut.create_time}}
		</view>
		<view class="body-content">
			<text style="display: flex;flex-direction: column;font-size: 30rpx;color: #666666;">{{nut.rang_name}}</text>
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
				nut: {}
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
						console.log(md5('token=' + _this.sss.token + 'time=' + _this.sss.create_time + 'asskey' + _this.sss.asskey))
						// .substring(9, 17)
						let www = md5('token=' + _this.sss.token + 'time=' + _this.sss.create_time + 'asskey' + _this.sss.asskey).substring(
							9, 17)
						console.log(JSON.stringify({
							token: _this.sss.token,
							time: _this.sss.create_time,
							asskey: _this.sss.asskey,
							sig: www
						}))
						
						_this.$API.LOGIN.YQGZ(JSON.stringify({
							token: _this.sss.token,
							time: _this.sss.create_time,
							asskey: _this.sss.asskey,
							sig: www
						})).then(res => {
							console.log(res)
							// _this.nut=res.data
						}).catch(err => {
							console.log(err)
							_this.nut = err.data.drc
							// _this.xS = JSON.parse(err)
							// console.log(_this.xS.data)
						})
					}
				})
	
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
	.body-top{
		width: 100%;
		font-size: 26rpx;
		color: #666666;
		background-color: #EBEBEB;
		padding: 0 70rpx;
		box-sizing: border-box;
	}
	.body-content{
		padding: 0 70rpx;
		box-sizing: border-box;
	}
</style>
