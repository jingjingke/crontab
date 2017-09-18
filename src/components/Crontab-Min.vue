<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" name="second" />分钟，允许的通配符[, - * /]
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />周期从<input type="number" />-<input type="number" />分钟
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />从<input type="number" />分钟开始，每<input type="number" />分钟执行一次
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />指定
			<div class="popup-check-warp">
				<label v-for='item in 60'><input type="checkbox" :value="item-1">{{item-1 < 10 ? "0"+(item-1):item-1}}</label>
			</div>
		</div>
	</li>
</template>

<script>
	import crontabMin from './crontab-min';
	export default crontabMin;
</script>