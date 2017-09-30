<template>
	<div class="popup-result">
		<p class="title">最近5次运行时间</p>
		<ul class="popup-result-scroll">
			<template v-if='isShow'>
				<li  v-for='item in resultList'>{{item}}</li>
			</template>
			<template v-else>
				<li>计算结果中...</li>
			</template>
		</ul>
	</div>
</template>

<script>
	import crontabResult from './crontab-result';
	export default crontabResult;
</script>