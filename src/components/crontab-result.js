export default {
	data() {
		return {
		}
	},
	name: 'crontab-result',
	methods: {
		// 表达式值变化时，开始去计算结果
		expressionChange(){
			console.log('表达式变化时执行')
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
	}
}