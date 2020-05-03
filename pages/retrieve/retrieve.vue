<template>
	<view class="register">
		<view class="rlogo">
			<image src="../../static/images/signIn.jpg"></image>
		</view>
		<view class="formbtn">
			<form @submit="register">
				<view class="formput">
					注册账号
					<input type="number" v-model="phone" name="phone" value="" placeholder="请输入手机号" />
				</view>
				<view class="formput verification">
					验证码
					<input type="text" value="" name="code" placeholder="请输入验证码" />
					<text class="verification_code" @click="verificationCode()">获取验证码</text>
				</view>
				<view class="formput">
					登录密码
					<input type="password" value="" name="password" placeholder="请设置密码" />
				</view>
				<view class="formput">
					确认密码
					<input type="password" value="" name="repassword" placeholder="重新输入密码" />
				</view>
				<view class="password_notice">
					密码须有英文字母和数字组成 最少6位
				</view>
				<button form-type="submit" type="primary">提交</button>
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
				uni.request({
					url: "/api/Home/Public/forget_pwd",
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
					},
					fail(e) {
						console.log(e)
					}

				})
			},
			verificationCode() {
				console.log(this.phone)
				uni.request({
					url: "/api/Home/Public/getcode",
					data: {
						tel: this.phone,
						type: "2"
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
			goLogin() {
				uni.redirectTo({
					url: '../index/index'
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

		}

		.password_notice {
			color: #cccccc;
			font-size: 28rpx;
			line-height: 78rpx;
		}

		.goLogin {
			color: #007AFF;
			font-size: 34rpx;
			margin-top: 38rpx;
			text-align: center;
		}
	}
</style>
