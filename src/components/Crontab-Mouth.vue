<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" name="second" />月，允许的通配符[, - * /]
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />周期从<input type="number" />-<input type="number" />月
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />从<input type="number" />月开始，每<input type="number" />月执行一次
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />指定
			<div class="popup-check-warp popup-check-short">
				<label v-for='item in 12'><input type="checkbox" :value="item-1">{{item < 10 ? "0"+(item):item}}</label>
			</div>
		</div>
	</li>
</template>

<script>
	import crontabMouth from './crontab-mouth';
	export default crontabMouth;
</script>