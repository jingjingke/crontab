import CrontabSecond from './Crontab-Second.vue'
import CrontabMin from './Crontab-Min.vue'
import CrontabHour from './Crontab-Hour.vue'
import CrontabDay from './Crontab-Day.vue'
import CrontabMouth from './Crontab-Mouth.vue'
import CrontabWeek from './Crontab-Week.vue'
import CrontabYear from './Crontab-Year.vue'
import CrontabResult from './Crontab-Result.vue'

export default {
	data() {
		return {
			tabTitles:["秒","分钟","小时","日","月","周","年"],
			tabActive:0,
			myindex:0,
			contabValueObj:{
				second:'*',
				min:'*',
				hour:'*',
				day:'*',
				mouth:'*',
				week:'?',
				year:'',
			}
		}
	},
	name: 'crontab',
	methods: {
		// tab切换值
		tabCheck(index){
			this.tabActive = index;
		},
		// 由子组件触发，更改表达式组成的字段值
		updataContabValue(name,value){
			this.contabValueObj[name] = value;
		},
		// 表单选项的子组件校验数字格式（通过-props传递）
		checkNumber(value,minLimit,maxLimit){
			//检查必须为整数
			value = Math.floor(value);
			if(value < minLimit){
				value = minLimit
			}else if(value > maxLimit){
				value = maxLimit
			}
			return value;
		},
		// 隐藏弹窗
		hidePopup(){
			this.$emit('hide');
		},
		// 填充表达式
		submitFill(){
			this.$emit('fill',this.contabValueString);
			this.hidePopup();
		}
	},
	computed: {
		contabValueString:function(){
			let obj = this.contabValueObj;
			let str = obj.second + " " + obj.min + " " + obj.hour + " " + obj.day + " " + obj.mouth + " " + obj.week + (obj.year===""?"":" "+obj.year)
			return str;
		}
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