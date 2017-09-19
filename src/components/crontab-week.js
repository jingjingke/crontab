export default {
	data() {
		return {
			radioValue:2,
			weekday:1,
			cycle01:1,
			cycle02:2,
			average01:1,
			average02:1,
			checkboxList:[],
			weekList:['周一','周二','周三','周四','周五','周六','周日'],
			checkNum:this.$options.propsData.check
		}
	},
	name: 'crontab-week',
	props:['check','day'],
	methods: {
		// 单选按钮值变化时
		radioChange(){
			switch(this.radioValue){
				case '1':
					this.$emit('updata','week','*');
					break;
				case '2':
					this.$emit('updata','week','?');
					break;
				case '3':
					this.$emit('updata','week',this.cycle01 + '-' + this.cycle02);
					break;
				case '4':
					this.$emit('updata','week',this.average01 + '#' + this.average02);
					break;
				case '5':
					this.$emit('updata','week',this.weekday+'L');
					break;
				case '6':
					this.$emit('updata','week',this.checkboxString);
					break;
			}
		},
		// 根据互斥事件，更改radio的值
		
		// 周期两个值变化时
		cycleChange(){
			if(this.radioValue==='3'){
				this.$emit('updata','week',this.cycleTotal);
			}
		},
		// 平均两个值变化时
		averageChange(){
			if(this.radioValue==='4'){
				this.$emit('updata','week',this.averageTotal);
			}
		},
		// 最近工作日值变化时
		weekdayChange(){
			if(this.radioValue==='5'){
				this.$emit('updata','week',this.weekday+'L');
			}
		},
		// checkbox值变化时
		checkboxChange(){
			if(this.radioValue==='6'){
				this.$emit('updata','week',this.checkboxString);
			}
		},
		// 父组件传递的day发生变化触发
		dayChange(){
			//判断week值与day不能同时为“?”
			if(this.$options.propsData.day === '?' && this.radioValue == '2'){
				this.radioValue = '1';
			}else if(this.$options.propsData.day !== '?' && this.radioValue != '2'){
				this.radioValue = '2';
			}
		}
	},
	watch: {
		"radioValue":"radioChange",
		'cycleTotal':'cycleChange',
		'averageTotal':'averageChange',
		'weekdayCheck':'weekdayChange',
		'checkboxString':'checkboxChange',
		'day':'dayChange'
	},
	computed: {
		// 计算两个周期值
		cycleTotal:function(){
			this.cycle01 = this.checkNum(this.cycle01,1,7)
			this.cycle02 = this.checkNum(this.cycle02,1,7)
			return this.cycle01+'-'+this.cycle02;
		},
		// 计算平均用到的值
		averageTotal:function(){
			this.average01 = this.checkNum(this.average01,1,4)
			this.average02 = this.checkNum(this.average02,1,7)
			return this.average01+'#'+this.average02;
		},
		// 最近的工作日（格式）
		weekdayCheck:function(){
			this.weekday = this.checkNum(this.weekday,1,7)
			return this.weekday;
		},
		// 计算勾选的checkbox值合集
		checkboxString:function(){
			let str = this.checkboxList.join();
			return str===''?'*':str;
		}
	}
}