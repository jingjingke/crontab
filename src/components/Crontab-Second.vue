<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" name="second" />秒，允许的通配符[, - * /]
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />周期从<input type="number" />-<input type="number" />秒
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />从<input type="number" />秒开始，每<input type="number" />秒执行一次
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
	import crontabSecond from './crontab-second';
	export default crontabSecond;
</script>