<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="1" />不填，允许的通配符[, - * /]
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="2" />每年
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="3" />周期从<input type="number" v-model='cycle01' />-<input type="number" v-model='cycle02' />年
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="4" />从<input type="number" v-model='average01' />年开始，每<input type="number" v-model='average02' />年执行一次
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="5" />指定
			<div class="popup-check-warp">
				<label v-for='item in 9'><input type="checkbox" :value="item - 1 + fullYear" v-model='checkboxList'>{{item -1 + fullYear}}</label>
			</div>
		</div>
	</li>
</template>

<script>
	import crontabYear from './crontab-year';
	export default crontabYear;
</script>