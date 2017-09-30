export default {
	data() {
		return {
			radioValue:1,
			cycle01:1,
			cycle02:2,
			average01:0,
			average02:1,
			checkboxList:[],
			checkNum:this.$options.propsData.check
		}
	},
	name: 'crontab-second',
	props:['check'],
	methods: {
		// 单选按钮值变化时
		radioChange(){
			switch(this.radioValue){
				case '1':
					this.$emit('updata','second','*');
					break;
				case '2':
					this.$emit('updata','second',this.cycle01 + '-' + this.cycle02);
					break;
				case '3':
					this.$emit('updata','second',this.average01 + '/' + this.average02);
					break;
				case '4':
					this.$emit('updata','second',this.checkboxString);
					break;
			}
		},
		// 周期两个值变化时
		cycleChange(){
			if(this.radioValue==='2'){
				this.$emit('updata','second',this.cycleTotal);
			}
		},
		// 平均两个值变化时
		averageChange(){
			if(this.radioValue==='3'){
				this.$emit('updata','second',this.averageTotal);
			}
		},
		// checkbox值变化时
		checkboxChange(){
			if(this.radioValue==='4'){
				this.$emit('updata','second',this.checkboxString);
			}
		}
	},
	watch: {
		"radioValue":"radioChange",
		'cycleTotal':'cycleChange',
		'averageTotal':'averageChange',
		'checkboxString':'checkboxChange'
	},
	computed: {
		// 计算两个周期值
		cycleTotal:function(){
			this.cycle01 = this.checkNum(this.cycle01,0,59)
			this.cycle02 = this.checkNum(this.cycle02,0,59)
			return this.cycle01+'-'+this.cycle02;
		},
		// 计算平均用到的值
		averageTotal:function(){
			this.average01 = this.checkNum(this.average01,0,59)
			this.average02 = this.checkNum(this.average02,1,59)
			return this.average01+'/'+this.average02;
		},
		// 计算勾选的checkbox值合集
		checkboxString:function(){
			let str = this.checkboxList.join();
			return str===''?'*':str;
		}
	}
}