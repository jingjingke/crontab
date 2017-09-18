<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" name="second" />日，允许的通配符[, - * / L M]
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />不指定
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />周期从<input type="number" />-<input type="number" />日
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />从<input type="number" />日开始，每<input type="number" />日执行一次
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />每月<input type="number" />号最近的那个工作日
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />本月最后一天
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />指定
			<div class="popup-check-warp popup-check-short">
				<label v-for='item in 31'><input type="checkbox" :value="item-1">{{item < 10 ? "0"+(item):item}}</label>
			</div>
		</div>
	</li>
</template>

<script>
	import crontabDay from './crontab-day';
	export default crontabDay;
</script>