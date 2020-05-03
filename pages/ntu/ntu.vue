<template>
	<view>
		<view class="ntu_text">
			<text v-text="ntu"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ntu: ""
			};
		},
		created() {
			let _this = this
			let api = "/api"
			uni.request({
				url: `/api/Home/Public/getstauser`,
				method: "POST",
				success(res) {
					console.log(res)
					// let {title} = res.data.data
					_this.ntu = res.data.data.title
					// console.log(this.ntu)
				}
			})
		}
	}
</script>

<style lang="less">
	.ntu_text {
		box-sizing: border-box;
		width: 100%;
		font-size: 32rpx;
		line-height: 53rpx;
		color: #666666;
		padding: 0 36rpx;
		padding-top: 50rpx;
	}
</style>
