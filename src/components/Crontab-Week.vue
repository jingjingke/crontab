<template>
	<li>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="1" />周，允许的通配符[, - * / L #]
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="2" />不指定
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="3" />周期从星期<input type="number" v-model='cycle01' />-<input type="number" v-model='cycle02' />
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="4" />第<input type="number" v-model='average01' />周的星期<input type="number" v-model='average02' />
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="5" />本月最后一个星期<input type="number" v-model='weekday' />
		</div>
		<div class="popup-input-warp">
			<input type="radio" v-model='radioValue' value="6" />指定
			<div class="popup-check-warp">
				<label v-for='(item,index) of weekList'><input type="checkbox" :value='index+1' v-model='checkboxList'>{{item}}</label>
			</div>
		</div>
	</li>
</template>

<script>
	import crontabWeek from './crontab-week';
	export default crontabWeek;
</script>