<template>
  <div class="popup-warp">
    <div class="popup-main">
    	<ul class="popup-title">
    		<li>规则类型</li>
    		<li v-for='(item,index) of tabTitles' :class='{on:index===tabActive}' @click='tabCheck(index)' >{{item}}</li>
    	</ul>
    	<ul class="popup-body">
    		<CrontabSecond :class='{ on:tabActive===0 }'></CrontabSecond>
    		<CrontabMin :class='{ on:tabActive===1 }'></CrontabMin>
    		<CrontabHour :class='{ on:tabActive===2 }'></CrontabHour>
    		<CrontabDay :class='{ on:tabActive===3 }'></CrontabDay>
    		<CrontabMouth :class='{ on:tabActive===4 }'></CrontabMouth>
    		<CrontabWeek :class='{ on:tabActive===5 }'></CrontabWeek>
    		<CrontabYear :class='{ on:tabActive===6 }'></CrontabYear>
    	</ul>
    	<div class="popup-result">
				<p class="title">时间表达式</p>
				<table>
					<thead>
						<th v-for='item of tabTitles' width='40'>{{item}}</th>
						<th>Cron完成表达式</th>
					</thead>
					<tbody>
						<td><span>*</span></td>
						<td><span>*</span></td>
						<td><span>*</span></td>
						<td><span>*</span></td>
						<td><span>*</span></td>
						<td><span>?</span></td>
						<td><span></span></td>
						<td><span>* * * * * ?</span></td>
					</tbody>
				</table>
			</div>
    	<CrontabResult></CrontabResult>
    	<div class="popup-btns">
    		<button type="button">确定</button>
    		<button type="button">取消</button>
    	</div>
    </div>
  </div>
</template>

<script>
	import crontab from './crontab';
	export default crontab;
</script>
<style>
	@import '../assets/popup.css';
</style>
