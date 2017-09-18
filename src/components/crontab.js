import CrontabSecond from './Crontab-Second'
import CrontabMin from './Crontab-Min'
import CrontabHour from './Crontab-Hour'
import CrontabDay from './Crontab-Day'
import CrontabMouth from './Crontab-Mouth'
import CrontabWeek from './Crontab-Week'
import CrontabYear from './Crontab-Year'
import CrontabResult from './Crontab-Result'

export default {
	data() {
		return {
			tabTitles:["秒","分钟","小时","日","月","周","年"],
			tabActive:0
		}
	},
	name: 'crontab',
	methods: {
		// tab切换值
		tabCheck(index){
			this.tabActive = index;
		}
	},
	watch: {
		
	},
	computed: {
		
	},
	components:{
		CrontabSecond,
		CrontabMin,
		CrontabHour,
		CrontabDay,
		CrontabMouth,
		CrontabWeek,
		CrontabYear,
		CrontabResult
	},
	mounted: function() {
		
	}
}