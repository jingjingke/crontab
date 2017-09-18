<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" name="second" />周，允许的通配符[, - * / L #]
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />不指定
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />周期从星期<input type="number" />-<input type="number" />
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />第<input type="number" />周的星期<input type="number" />
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />本月最后一个星期<input type="number" />
		</div>
		<div class="popup-input-warp">
			<input type="radio" name="second" />指定
			<div class="popup-check-warp">
				<label v-for='(item,index) of weekList'><input type="checkbox" :value='index+1'>{{item}}</label>
			</div>
		</div>
	</li>
</template>

<script>
	import crontabWeek from './crontab-week';
	export default crontabWeek;
</script>