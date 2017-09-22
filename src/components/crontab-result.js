export default {
	data() {
		return {
			YY:'',
			MM:'',
			DD:'',
			hh:'',
			mm:'',
			ss:'',
			week:'',
		}
	},
	name: 'crontab-result',
	methods: {
		// 表达式值变化时，开始去计算结果
		expressionChange(){
			let timeArr = this.$options.propsData.ex.split(' ');
			let dataArr = [[],[],[],[],[],[],[]];
			//获取当前时间具体值
			this.getDateInfo();
			//根据日期开始向dataArr数组传递5个值
			//-----------判断年
			if(timeArr[6] === undefined || timeArr[6] === '*'){
				// 如果不指定年或者每年的话
				dataArr[0]=[this.YY,this.YY+1,this.YY+2,this.YY+3,this.YY+4];
			}else if(timeArr[6].indexOf('-') > -1){
				//如果指定一个周期
				let cycleArr = timeArr[6].split('-');
				let temp = cycleArr[0];
				//如果周期第一个数大于第二个数则需要置换位置
				if(cycleArr[0] > cycleArr[1]){
					cycleArr[0] = cycleArr[1];
					cycleArr[1] = temp;
				}
				//循环将数添加进去
				for(let i=cycleArr[0];i<=cycleArr[1];i++){
					dataArr[0].push(Number(i))
				}
			}else if(timeArr[6].indexOf('/') > -1){
				//如果指定一个平均值
				let averageArr = timeArr[6].split('/')
				//循环将数添加进去
				for(let i=0;i<5;i++){
					dataArr[0].push(Number(averageArr[0]) + i*Number(averageArr[1]));
				}
			}else{
				//其它-指定年份的情况
				let yearArr = timeArr[6].split(',');
				for(let i=0;i<yearArr.length;i++){
					dataArr[0].push(Number(yearArr[i]))
				}
			}
			//-----------判断月
			if(timeArr[4] === '*'){
				//不指定具体月
				for(let i=0; i<5; i++){
					let mouth = this.MM+i;
					dataArr[1].push(mouth)
				}
			}else if(timeArr[4].indexOf('-') > -1){
				//指定一个周期
				let cycleArr = timeArr[4].split('-');
				let temp = cycleArr[0];
				//如果周期第一个数大于第二个数则需要置换位置
				if(cycleArr[0] > cycleArr[1]){
					cycleArr[0] = cycleArr[1];
					cycleArr[1] = temp;
				}
				//循环将数添加进去
				for(let i=cycleArr[0];i<=cycleArr[1];i++){
					dataArr[1].push(Number(i))
				}
			}else if(timeArr[4].indexOf('/') > -1){
				//如果指定一个平均值
				let averageArr = timeArr[4].split('/')
				//循环将数添加进去
				for(let i=0;i<5;i++){
					dataArr[1].push(Number(averageArr[0]) + i*Number(averageArr[1]));
				}
			}else{
				//其它-指定月份的情况
				let mouthArr = timeArr[4].split(',');
				for(let i=0;i<mouthArr.length;i++){
					dataArr[1].push(Number(mouthArr[i]))
				}
				dataArr[1].sort(this.compare);
			}
			//-----------判断小时
			if(timeArr[2] === '*'){
				//不指定具体小时
				for(let i=0; i<5; i++){
					let hour = this.hh+i;
					dataArr[3].push(hour)
				}
			}else if(timeArr[2].indexOf('-') > -1){
				//指定一个周期
				let cycleArr = timeArr[2].split('-');
				let temp = cycleArr[0];
				//如果周期第一个数大于第二个数则需要置换位置
				if(cycleArr[0] > cycleArr[1]){
					cycleArr[0] = cycleArr[1];
					cycleArr[1] = temp;
				}
				//循环将数添加进去
				for(let i=cycleArr[0];i<=cycleArr[1];i++){
					dataArr[3].push(Number(i))
				}
			}else if(timeArr[2].indexOf('/') > -1){
				//如果指定一个平均值
				let averageArr = timeArr[2].split('/')
				//循环将数添加进去
				for(let i=0;i<5;i++){
					dataArr[3].push(Number(averageArr[0]) + i*Number(averageArr[1]));
				}
			}else{
				//其它-指定小时的情况
				let hourArr = timeArr[2].split(',');
				for(let i=0;i<hourArr.length;i++){
					dataArr[3].push(Number(hourArr[i]))
				}
				dataArr[3].sort(this.compare);
			}
			//-----------判断分钟
			if(timeArr[1] === '*'){
				//不指定具体分钟
				for(let i=0; i<5; i++){
					let min = this.hh+i;
					dataArr[4].push(min)
				}
			}else if(timeArr[1].indexOf('-') > -1){
				//指定一个周期
				let cycleArr = timeArr[1].split('-');
				let temp = cycleArr[0];
				//如果周期第一个数大于第二个数则需要置换位置
				if(cycleArr[0] > cycleArr[1]){
					cycleArr[0] = cycleArr[1];
					cycleArr[1] = temp;
				}
				//循环将数添加进去
				for(let i=cycleArr[0];i<=cycleArr[1];i++){
					dataArr[4].push(Number(i))
				}
			}else if(timeArr[1].indexOf('/') > -1){
				//如果指定一个平均值
				let averageArr = timeArr[1].split('/')
				//循环将数添加进去
				for(let i=0;i<5;i++){
					dataArr[4].push(Number(averageArr[0]) + i*Number(averageArr[1]));
				}
			}else{
				//其它-指定分钟的情况
				let minArr = timeArr[1].split(',');
				for(let i=0;i<minArr.length;i++){
					dataArr[4].push(Number(minArr[i]))
				}
				dataArr[4].sort(this.compare);
			}
			//-----------判断秒数
			if(timeArr[0] === '*'){
				//不指定具体分钟
				for(let i=0; i<5; i++){
					let second = this.hh+i;
					dataArr[5].push(second)
				}
			}else if(timeArr[0].indexOf('-') > -1){
				//指定一个周期
				let cycleArr = timeArr[0].split('-');
				let temp = cycleArr[0];
				//如果周期第一个数大于第二个数则需要置换位置
				if(cycleArr[0] > cycleArr[1]){
					cycleArr[0] = cycleArr[1];
					cycleArr[1] = temp;
				}
				//循环将数添加进去
				for(let i=cycleArr[0];i<=cycleArr[1];i++){
					dataArr[5].push(Number(i))
				}
			}else if(timeArr[0].indexOf('/') > -1){
				//如果指定一个平均值
				let averageArr = timeArr[0].split('/')
				//循环将数添加进去
				for(let i=0;i<5;i++){
					dataArr[5].push(Number(averageArr[0]) + i*Number(averageArr[1]));
				}
			}else{
				//其它-指定分钟的情况
				let minArr = timeArr[0].split(',');
				for(let i=0;i<minArr.length;i++){
					dataArr[5].push(Number(minArr[i]))
				}
				dataArr[5].sort(this.compare);
			}
			//判断日与星期的值（根据两种必须互斥的情况，一起来判断）
			
			
			
			
			
		},
		//比较数字大小
		compare(value1,value2){
			if(value2-value1>0){
				return -1;
			}else{
				return 1;
			}
		},
		// 获取当前时间具体的年月日等值
		getDateInfo(){
			let now = new Date();
			this.YY = now.getFullYear();
			this.MM = now.getMonth()+1;
			this.DD = now.getDate();
			this.hh = now.getHours();
			this.mm = now.getMinutes();
			this.ss = now.getSeconds();
			this.week = now.getDay();
			if(this.week === 0) this.week = 7;
		},
		// 格式化日期格式如：2017-9-19 18:04:33
		
		formatDate(value){
			let time = typeof value === 'number'?new Date(value):value;
			let MM = time.getMonth()+1;
			let DD = time.getDate();
			let h = time.getHours();
			let m = time.getMinutes();
			let s = time.getSeconds();
			return time.getFullYear() + '-' + (MM<10?'0'+MM:MM) + '-' + (DD<10?'0'+DD:DD) + ' ' + (h<10?'0'+h:h) + ':' + (m<10?'0'+m:m) + ':' + (s<10?'0'+s:s);
		},
		// 检查日期是否存在
		checkDate(value){
			let time = new Date(value);
			let format = this.formatDate(time)
			console.log(value,format)
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
		
//		console.log(this.checkDate( '2017-9-40 04:5:6' ))
	}
}