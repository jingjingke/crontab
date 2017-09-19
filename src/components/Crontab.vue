<template>
  <div class="popup-warp">
    <div class="popup-main">
    	<ul class="popup-title">
    		<li>规则类型</li>
    		<li v-for='(item,index) of tabTitles' :class='{on:index===tabActive}' @click='tabCheck(index)' >{{item}}</li>
    	</ul>
    	<ul class="popup-body">
    		<CrontabSecond :class='{ on:tabActive===0 }' @updata='updataContabValue' :check='checkNumber'></CrontabSecond>
    		<CrontabMin :class='{ on:tabActive===1 }' @updata='updataContabValue' :check='checkNumber'></CrontabMin>
    		<CrontabHour :class='{ on:tabActive===2 }' @updata='updataContabValue' :check='checkNumber'></CrontabHour>
    		<CrontabDay :class='{ on:tabActive===3 }' @updata='updataContabValue' :check='checkNumber' :week='contabValueObj.week'></CrontabDay>
    		<CrontabMouth :class='{ on:tabActive===4 }' @updata='updataContabValue' :check='checkNumber'></CrontabMouth>
    		<CrontabWeek :class='{ on:tabActive===5 }' @updata='updataContabValue' :check='checkNumber' :day='contabValueObj.day'></CrontabWeek>
    		<CrontabYear :class='{ on:tabActive===6 }' @updata='updataContabValue' :check='checkNumber'></CrontabYear>
    	</ul>
    	<div class="popup-result">
				<p class="title">时间表达式</p>
				<table>
					<thead>
						<th v-for='item of tabTitles' width='40'>{{item}}</th>
						<th>Cron完成表达式</th>
					</thead>
					<tbody>
						<td><span>{{contabValueObj.second}}</span></td>
						<td><span>{{contabValueObj.min}}</span></td>
						<td><span>{{contabValueObj.hour}}</span></td>
						<td><span>{{contabValueObj.day}}</span></td>
						<td><span>{{contabValueObj.mouth}}</span></td>
						<td><span>{{contabValueObj.week}}</span></td>
						<td><span>{{contabValueObj.year}}</span></td>
						<td><span>{{contabValueString}}</span></td>
					</tbody>
				</table>
			</div>
    	<CrontabResult :ex='contabValueString'></CrontabResult>
    	<div class="popup-btns">
    		<button type="button" @click='submitFill'>确定</button>
    		<button type="button" @click='hidePopup'>取消</button>
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
