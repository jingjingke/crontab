<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" name="second" />年，允许的通配符[, - * /]（非必填）
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />每年
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />周期从<input type="number" />-<input type="number" />秒
		</div>
	</li>
</template>

<script>
	import crontabYear from './crontab-year';
	export default crontabYear;
</script>