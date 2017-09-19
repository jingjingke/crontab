<template>
	<div class="popup-result">
		<p class="title">最近5次运行时间</p>
		<ul class="popup-result-scroll">
			<li>{{ex}}</li>
		</ul>
	</div>
</template>

<script>
	import crontabResult from './crontab-result';
	export default crontabResult;
</script>