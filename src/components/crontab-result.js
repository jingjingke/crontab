export default {
	data() {
		return {
			
		}
	},
	name: 'crontab-result',
	methods: {
		// 表达式值变化时，开始去计算结果
		expressionChange(){
			let timeArr = this.$options.propsData.ex.split(' ');
			//获取当前时间
			let now = new Date();

		},
		formatDate(value){
			let time = typeof value === 'number'?new Date(value):value;
			return time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
		},
		// 检查日期是否存在
		checkDate(value){
			let time = new Date(value);
			let format = this.formatDate(time)
			return value===format?true:false;
		}
	},
	watch: {
		'ex':'expressionChange'
	},
	computed: {
		
	},
	props:['ex'],
	mounted: function() {
		// 初始化 获取一次结果
		this.expressionChange();
		console.log(this.checkDate('2017-9-31 0:0:0'))
	}
}