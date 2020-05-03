<template>
	<view>
		<view class="" v-if="xSS.url">
			<view class="bannerX">
				<image :src="xSS.thumb" mode="widthFix"></image>
			</view>
		</view>
		<view style="padding: 0 40rpx;">
			<text style="color: #333333;font-size: 38rpx;"> {{xSS.title}}</text>
		</view>
		<view style="padding: 0 40rpx;">
			<text style="color: #999999;font-size: 28rpx;"> {{tiime}} {{tiime1}}</text>
		</view>
		<view class="ntu_text">
			<text>{{xSS.rang_name}}</text>
		</view>
	</view>
</template>

<script>
	import md5 from 'js-md5'
	export default {
		data() {
			return {
				xSS: {},
				tiime: '',
				tiime1:""
			};
		},
		onLoad() {
			this.bannerX()
		},
		methods: {
			bannerX() {
				let _this = this
				uni.getStorage({
					key: "storage_key",
					success(e) {
						console.log(e)
						_this.sss = JSON.parse(e.data)
						console.log(md5(JSON.stringify({
							token: _this.sss.token,
							time: _this.sss.create_time,
							asskey: _this.sss.asskey,
							sig: _this.sss.sig
						})))
						let www = md5('token=' + _this.sss.token + 'time=' + _this.sss.create_time + 'asskey' + _this.sss.asskey).substring(
							9, 17)

						console.log(JSON.stringify({
							token: _this.sss.token,
							time: _this.sss.create_time,
							asskey: _this.sss.asskey,
							sig: www,
						}))
						let dataX = JSON.stringify({
							token: _this.sss.token,
							time: _this.sss.create_time,
							asskey: _this.sss.asskey,
							sig: www,
						})
						uni.request({
							url: "/api/Home/Index/getbanner",
							method: "POST",
							data: dataX,
							success(res) {
								console.log(res.data.data.thumb[2])
								_this.xSS = res.data.data.thumb[2]
								var da = res.data.data.thumb[2].create_time;
								console.log(Number(da))

								da = new Date(Number(da));
								var year = _this.nTime(da.getFullYear());
								var month = _this.nTime(da.getMonth() + 1);
								var date = _this.nTime(da.getDate());
								var h = _this.nTime(da.getHours());
								var m = _this.nTime(da.getMinutes());
								var s = _this.nTime(da.getSeconds())
								console.log([year, month, date].join('-'));
								_this.tiime = [year, month, date].join('-');
								
								_this.tiime1 = [h,m,s].join(":")
							}
						})
					}
				})
			},
			nTime(e){
				let t = ""
				if(e<10){
					t = "0"+e
				}else{
					t = e
				}
				return t
			}
		}

	}
</script>

<style lang="less">
	.bannerX {
		width: 100%;
		text-align: center;
		padding-top: 20rpx;
	}

	.ntu_text {
		box-sizing: border-box;
		width: 100%;
		font-size: 32rpx;
		line-height: 53rpx;
		color: #666666;
		padding: 20rpx 36rpx 0;
	}
</style>
