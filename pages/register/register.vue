<template>
	<view class="register">
		<view class="rlogo">
			<image src="../../static/images/signIn.jpg"></image>
		</view>
		<view class="formbtn">
			<form @submit="register">
				<view class="formput">
					注册账号
					<input type="number" v-model="phone" name="username" value="" placeholder="请输入手机号" />
				</view>
				<view class="formput verification">
					验证码
					<input type="text" value="" name="code" placeholder="请输入验证码" />
					<text class="verification_code" @click="verificationCode()">获取验证码</text>
				</view>
				<view class="formput">
					您的姓名
					<input type="text" value="" placeholder="请输入姓名" name="nickname" />
				</view>
				<view class="formput">
					登录密码
					<input type="password" value="" name="password" placeholder="请设置密码" />
				</view>
				<view class="formput">
					确认密码
					<input type="password" value="" name="repassword" placeholder="重新输入密码" />
				</view>
				<view class="formput">
					邀请码
					<input type="text" value="" name="invite_code" placeholder="没有可不填" />
				</view>
				<view class="notice_to_users">
					<view class="radio" @click="radiosFun()">
						<image :src="radios" mode=""></image>
					</view>
					<text>请您阅读</text>
					<text class="ntu" @click="ntu()">《用户注册须知》</text>
				</view>
				<button form-type="submit" type="primary">注册</button>
				<view class="goLogin" @click="goLogin()">
					去登陆
				</view>
			</form>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				radios: "../../static/images/radio.png",
				r: 0,
				phone: ""
			}
		},
		methods: {
			radiosFun() {
				if (this.r == 0) {
					this.radios = "../../static/images/radio-active.png"
					this.r = 1
				} else {
					this.radios = "../../static/images/radio.png"
					this.r = 0
				}
			},
			register(e) {
				let a = e.detail.value
				if (this.r == 0) {
					uni.showToast({
						title: "请阅读《用户注册须知》",
						icon: "none"
					});
				} else if (this.r == 1) {
					uni.request({
						url: "/api/Home/Public/reg",
						method: "POST",
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: a,
						success(res) {
							console.log(res)
							if (res.data.code == 0) {
								uni.showToast({
									title: res.data.data.title,
									icon: "none"
								});
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								});
							}
						}
					})
				}
			},
			verificationCode() {
				// this.phone
				uni.request({
					url: "/api/Home/Public/getcode",
					data: {
						tel: this.phone,
						type: "1"
					},
					success(res) {
						console.log(res)
						if (res.data.code == 0) {
							uni.showToast({
								title: res.data.data.title,
								icon: "none"
							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							});
						}
					}

				})
			},
			ntu() {
				uni.navigateTo({
					url: "../ntu/ntu"
				})
			},
			goLogin() {
				uni.redirectTo({
					url: "../index/index"
				})
			}

		},
	}
</script>

<style lang="less" scoped>
	.register {
		width: 750rpx;

		.rlogo {
			width: 100%;
			height: 144rpx;
			padding-top: 136rpx;
			text-align: center;

			image {
				width: 144rpx;
				height: 144rpx;
			}
		}

		.formbtn {
			width: 610rpx;
			margin: 0 auto;
			font-size: 28rpx;
			padding-top: 72rpx;

			.formput {
				display: flex;
				justify-content: space-between;
				line-height: 80rpx;
				border-bottom: 1rpx solid #f3f3f3;
			}

			.formput:nth-of-type(n+2) {
				margin-top: 18rpx;
			}

			.formput:nth-of-type(2n-1) {
				padding-bottom: 10rpx;
			}

			input {
				line-height: 80rpx;
				color: #999999;
				padding-left: 16rpx;
				height: 80rpx;
				width: 470rpx;
			}

			.verification {
				input {
					width: 294rpx;
				}

				.verification_code {
					color: #00a2ff;
				}
			}

			button {
				margin-top: 25rpx;
			}

			.notice_to_users {
				display: flex;
				line-height: 90rpx;

				.radio {
					width: 35rpx;
					height: 35rpx;
					padding-top: 9rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.ntu {
					color: #00a2ff;
				}
			}

			.goLogin {
				color: #007AFF;
				font-size: 34rpx;
				margin-top: 38rpx;
				text-align: center;
			}
		}
	}
</style>
