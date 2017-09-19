export default {
	data() {
		return {
			radioValue:1,
			workday:1,
			cycle01:1,
			cycle02:2,
			average01:1,
			average02:1,
			checkboxList:[],
			checkNum:this.$options.propsData.check
		}
	},
	name: 'crontab-day',
	props:['check','week'],
	methods: {
		// 单选按钮值变化时
		radioChange(){
			switch(this.radioValue){
				case '1':
					this.$emit('updata','day','*');
					break;
				case '2':
					this.$emit('updata','day','?');
					break;
				case '3':
					this.$emit('updata','day',this.cycle01 + '-' + this.cycle02);
					break;
				case '4':
					this.$emit('updata','day',this.average01 + '/' + this.average02);
					break;
				case '5':
					this.$emit('updata','day',this.workday+'W');
					break;
				case '6':
					this.$emit('updata','day','L');
					break;
				case '7':
					this.$emit('updata','day',this.checkboxString);
					break;
			}
		},
		// 周期两个值变化时
		cycleChange(){
			if(this.radioValue==='3'){
				this.$emit('updata','day',this.cycleTotal);
			}
		},
		// 平均两个值变化时
		averageChange(){
			if(this.radioValue==='4'){
				this.$emit('updata','day',this.averageTotal);
			}
		},
		// 最近工作日值变化时
		workdayChange(){
			if(this.radioValue==='5'){
				this.$emit('updata','day',this.workday+'W');
			}
		},
		// checkbox值变化时
		checkboxChange(){
			if(this.radioValue==='7'){
				this.$emit('updata','day',this.checkboxString);
			}
		},
		// 父组件传递的week发生变化触发
		weekChange(){
			//判断week值与day不能同时为“?”
			if(this.$options.propsData.week === '?' && this.radioValue == '2'){
				this.radioValue = '1';
			}else if(this.$options.propsData.week !== '?' && this.radioValue != '2'){
				this.radioValue = '2';
			}
		}
	},
	watch: {
		"radioValue":"radioChange",
		'cycleTotal':'cycleChange',
		'averageTotal':'averageChange',
		'workdayCheck':'workdayChange',
		'checkboxString':'checkboxChange',
		'week':'weekChange'
	},
	computed: {
		// 计算两个周期值
		cycleTotal:function(){
			this.cycle01 = this.checkNum(this.cycle01,1,31)
			this.cycle02 = this.checkNum(this.cycle02,1,31)
			return this.cycle01+'-'+this.cycle02;
		},
		// 计算平均用到的值
		averageTotal:function(){
			this.average01 = this.checkNum(this.average01,1,31)
			this.average02 = this.checkNum(this.average02,1,31)
			return this.average01+'/'+this.average02;
		},
		// 计算工作日格式
		workdayCheck:function(){
			this.workday = this.checkNum(this.workday,1,31)
			return this.workday;
		},
		// 计算勾选的checkbox值合集
		checkboxString:function(){
			let str = this.checkboxList.join();
			return str===''?'*':str;
		}
	}
}