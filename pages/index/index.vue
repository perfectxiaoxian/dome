<template>
	<view class="content">
		<image class="logo" src="../../static/2411587701112_.pic.png"></image>
		<view class="text-area">
			<view class="title">账号</view>
			<input class="uni-input" type="text" placeholder="请输入手机号" v-model="username" />
		</view>
		<view class="text-area">
			<view class="title">密码</view>
			<input class="uni-input" password type="text" placeholder="请输入密码" v-model="password" />
		</view>
		<view class="text">
			<text @click="noPassword()">忘记密码</text>
		</view>
		<view class="buttons">
			<button style="color: #FFFFFF;
		background-color: #00A2FF;" @click="GOhonme">立即登录</button>
		</view>
		<view class="zhuce">
			<view style="margin-bottom: 80rpx;" @click="goRetrieve()">去注册</view>
			<view style="color: #999999;">其他方式登录</view>
			<image src="../../static/wxdl.png" mode="" style="width: 90rpx;height: 90rpx;margin-top: 40rpx;" @click="wxsq"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '15652653114',
				password: '123456'

			}
		},
		onLoad() {

		},
		methods: {
			GOhonme() {
				this.$API.LOGIN.LOGIN(JSON.stringify({
					username: this.username,
					password: this.password
				})).then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
					if (err.code == "0") {
						uni.setStorage({
							key: 'storage_key',
							data: JSON.stringify(err.data),
							success: function() {
								console.log('success');
							}
						});
						var $cookie = this.$cookie;
						//赋值
						this.$cookie.set('token', err.data.token)
						uni.navigateTo({
							url: '../bannerX/bannerX'
						});
					}
					if (err.code == "1") {
						uni.showToast({
							title: '账号密码错误',
							duration: 5000,
							icon: 'none'
						});
					}

				})
			},
			wxsq() {
				let _this = this
				uni.request({
					url: "/api/Home/Public/weixredirect_uri",
					method: "POST",
					success(res) {
						console.log(res.data.data)
						let {
							appID,
							appsecret
						} = res.data.data
						window.location.replace(
							"https://open.weixin.qq.com/connect/oauth2/authorize?" +
							"appid=" + appID + "&" +
							"redirect_uri=" + encodeURIComponent('http://saas.yjshangmao.com/Home/Public/redirect_uri') + "&" +
							"scope=snsapi_base#wechat_redirect")
					}
				})
			},
			goRetrieve() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			noPassword() {
				uni.navigateTo({
					url: "../retrieve/retrieve"
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0 90rpx;
	}

	.logo {
		height: 145rpx;
		width: 145rpx;
		margin-top: 318rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		width: 100%;
		/* padding-left: 106rpx; */
		padding: 40rpx 0 20px 0;
		font-size: 28rpx;
		border-bottom: rgba(51, 51, 51, 0.06) 1rpx solid;
		/* justify-content: center; */
	}

	.title {
		font-size: 28rpx;
		color: #999999;
		padding-right: 30rpx;
	}

	.uni-input {
		width: 80%;
		font-size: 28rpx;
		color: #999999;
	}

	.text {
		padding: 30rpx 0;
		color: #ccc;
		font-size: 28rpx;
		display: flex;
		width: 100%;
		justify-content: flex-end;
	}

	.buttons {
		width: 100%;

	}

	.zhuce {
		width: 100%;
		text-align: center;
		color: #00A2FF;
		font-size: 32rpx;
		margin-top: 30rpx;
	}
</style>
