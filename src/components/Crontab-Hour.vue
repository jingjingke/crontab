<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" name="second" />小时，允许的通配符[, - * /]
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />周期从<input type="number" />-<input type="number" />小时
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />从<input type="number" />小时开始，每<input type="number" />小时执行一次
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />指定
			<div class="popup-check-warp">
				<label v-for='item in 24'><input type="checkbox" :value="item-1">{{item-1 < 10 ? "0"+(item-1):item-1}}</label>
			</div>
		</div>
	</li>
</template>

<script>
	import crontabHour from './crontab-hour';
	export default crontabHour;
</script>