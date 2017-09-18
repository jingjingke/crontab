<template>
  <div id="app">
  	<div class="form-warp">
  		<input readonly="readonly" v-model='crontabValue' />
  		<button type="button" @click='showCrontab = !showCrontab'>选择时间规则</button>
  	</div>
    <Crontab v-if='showCrontab'></Crontab>
  </div>
</template>

<script>
import Crontab from './components/Crontab'

export default {
	data(){
		return {
			crontabValue:'',
			showCrontab:true
		}
	},
  name: 'app',
  components: {
    Crontab
  }
}
</script>
<style>
	html,body,div,input,button,ul,li {
		padding: 0;
		margin: 0;
	}
	ul,li {
		list-style: none;
	}
	html {
		height: 100%;
	}
	body {
		min-height: 100%;
	}
	.form-warp {
		text-align: center;
		padding-top: 200px;
	}
</style>