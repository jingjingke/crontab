<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="1" />日，允许的通配符[, - * / L M]
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="2" />不指定
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="3" />周期从<input type="number" v-model='cycle01' />-<input type="number" v-model='cycle02' />日
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="4" />从<input type="number" v-model='average01' />号开始，每<input type="number" v-model='average02' />日执行一次
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="5" />每月<input type="number" v-model='workday' />号最近的那个工作日
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="6" />本月最后一天
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="7" />指定
			<div class="popup-check-warp popup-check-short">
				<label v-for='item in 31'><input type="checkbox" :value="item" v-model='checkboxList'>{{item < 10 ? "0"+(item):item}}</label>
			</div>
		</div>
	</li>
</template>

<script>
	import crontabDay from './crontab-day';
	export default crontabDay;
</script>