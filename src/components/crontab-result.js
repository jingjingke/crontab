export default {
	data() {
			return {
				maxYY: 0,
				minYY: 0,
				setpYY: 1,
				maxMM: 12,
				minMM: 1,
				setpMM: 1,
				maxDD: 31,
				minDD: 1,
				setpDD: 1,
				maxhh: 23,
				minhh: 0,
				setphh: 1,
				maxmm: 59,
				minmm: 0,
				setpmm: 1,
				maxss: 59,
				minss: 0,
				setpss: 1,
				dateArr: [],
				resultList: [],
				isShow: false
			}
		},
		name: 'crontab-result',
		methods: {
			// 表达式值变化时，开始去计算结果
			expressionChange() {
				//获取规则数组[0秒、1分、2时、3日、4月、5星期、6年]
				let ruleArr = this.$options.propsData.ex.split(' ');
				// 获取当前时间并将值切割为[0年、1月、2日、3时、4分、5秒]
				let nowTime = new Date('2017-09-26 17:59:58');
				let nowYear = nowTime.getFullYear();
				this.minYY = nowYear;
				this.maxYY = nowYear + 100;
				let nowMouth = nowTime.getMonth() + 1;
				let nowDay = nowTime.getDate();
				let nowHour = nowTime.getHours();
				let nowMin = nowTime.getMinutes();
				let nowSecond = nowTime.getSeconds();
				let timeArr = this.formatDate(nowTime).match(/[0-9]{1,4}/g);
				let timeNum = nowTime.getTime();
				timeNum = timeNum - timeNum % 1000;
				let timeWeek = this.formatDate(nowTime, 'week');

				// 根据规则获取到可能的时间
				this.getSecondArr(ruleArr[0]);
				this.getMinArr(ruleArr[1]);
				this.getHourArr(ruleArr[2]);
				this.getDayArr(ruleArr[3]);
				this.getMouthArr(ruleArr[4]);
				this.getWeekArr(ruleArr[5]);
				this.getYearArr(ruleArr[6], nowYear);
				let ssIdx = this.getIndex(this.dateArr[0], nowSecond);
				let mmIdx = this.getIndex(this.dateArr[1], nowMin);
				let nums = 0;
				let resultArr = [];

				// 利用for循环获取到时间值
				goYear: for(let YY = nowYear; YY < nowYear + 100; YY++) {
					if(nums === 5) break;
					goMouth: for(let MM = nowMouth; MM <= 12; MM++) {
						goDay: for(let DD = nowDay; DD <= 31; DD++) {
							
							goHour: for(let hh = nowHour; hh <= 23; hh++) {
								let mmDate = this.dateArr[1];
								goMin: for(let mi = mmIdx; mi < mmDate.length; mi++) {
									let mm = mmDate[mi];
									let ssDate = this.dateArr[0];
									if(nowSecond > ssDate[ssDate.length - 1]) {
										nowSecond = ssDate[0];
										if(mi === mmDate.length - 1) {
											mmIdx = 0;
										}
										break goMin;
									}
									//循环获取秒数（从索引开始）
									goSecond: for(let si = ssIdx; si <= ssDate.length - 1; si++) {
										let ss = ssDate[si];
										let time = YY + '-' + (MM < 10 ? '0' + MM : MM) + '-' + (DD < 10 ? '0' + DD : DD) + ' ' + (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
										// 当这个时间合法时才会添加进去
										if(this.checkDate(time)) {
											resultArr.push(time)
											nums++;
										} else {
											ssIdx = 0;
											continue goMin;
										}
										//如果条数满了就退出循环
										if(nums === 5) break goYear;
										//如果到达最大值时
										if(si === ssDate.length - 1 && mi !== mmDate.length - 1) {
											ssIdx = 0;
											continue goMin;
										}else if( si === ssDate.length - 1 && mi === mmDate.length - 1 ){
											ssIdx = 0;
											mmIdx = 0;
											continue goHour;
										}
									} //goSecond
								} //goMin
							}
						}
					}
				}
				this.resultList = resultArr;
				this.isShow = true;
				console.log(this.resultList)

				// *********************判断获取下一个时间开始

				//if(ruleArr[6] !== undefined && ruleArr[6] !== '*'){
				//if(ruleArr[6].match(/[0-9]{1,4}/g)[0] !== timeArr[0]){
				//timeArr = [ruleArr[6].match(/[0-9]{1,4}/g)[0],'01','01','00','00','00']
				//}
				//}
				// *********************判断获取下一个时间结束
			},

			getIndex(arr, value) {
				if(value <= arr[0] || value > arr[arr.length - 1]) {
					return 0;
				} else {
					for(let i = 0; i < arr.length - 1; i++) {
						if(value > arr[i] && value <= arr[i + 1]) {
							return i + 1;
						}
					}
				}
			},

			getYearArr(rule, year) {
				this.dateArr[6] = this.getOrderArr(year, year + 100);
				if(rule !== undefined) {
					if(rule.indexOf('-') >= 0) {
						this.dateArr[6] = this.getCycleArr(rule, year + 100, false)
					} else if(rule.indexOf('/') >= 0) {
						this.dateArr[6] = this.getAverageArr(rule, year + 100)
					} else if(rule !== '*') {
						this.dateArr[6] = this.getAssignArr(rule)
					}
				}
			},
			getWeekArr(rule) {
				this.dateArr[5] = this.getOrderArr(1, 7);
				if(rule.indexOf('-') >= 0) {
					this.dateArr[5] = this.getCycleArr(rule, 7, false)
				} else if(rule.indexOf('#') >= 0 || rule.indexOf('L') >= 0) {
					this.dateArr[5] = rule;
				} else if(rule !== '*' && rule !== '?') {
					this.dateArr[5] = this.getAssignArr(rule)
				}
			},
			getMouthArr(rule) {
				this.dateArr[4] = this.getOrderArr(1, 12);
				if(rule.indexOf('-') >= 0) {
					this.dateArr[4] = this.getCycleArr(rule, 12, false)
				} else if(rule.indexOf('/') >= 0) {
					this.dateArr[4] = this.getAverageArr(rule, 12)
				} else if(rule !== '*') {
					this.dateArr[4] = this.getAssignArr(rule)
				}
			},
			getDayArr(rule) {
				this.dateArr[3] = this.getOrderArr(1, 31);
				if(rule.indexOf('-') >= 0) {
					this.dateArr[3] = this.getCycleArr(rule, 31, false)
				} else if(rule.indexOf('/') >= 0) {
					this.dateArr[3] = this.getAverageArr(rule, 31)
				} else if(rule.indexOf('W') >= 0 || rule.indexOf('L') >= 0) {
					this.dateArr[3] = rule;
				} else if(rule !== '*' && rule !== '?') {
					this.dateArr[3] = this.getAssignArr(rule)
				}
			},
			getHourArr(rule) {
				this.dateArr[2] = this.getOrderArr(0, 23);
				if(rule.indexOf('-') >= 0) {
					this.dateArr[2] = this.getCycleArr(rule, 24, true)
				} else if(rule.indexOf('/') >= 0) {
					this.dateArr[2] = this.getAverageArr(rule, 23)
				} else if(rule !== '*') {
					this.dateArr[2] = this.getAssignArr(rule)
				}
			},
			getMinArr(rule) {
				this.dateArr[1] = this.getOrderArr(0, 59);
				if(rule.indexOf('-') >= 0) {
					this.dateArr[1] = this.getCycleArr(rule, 60, true)
				} else if(rule.indexOf('/') >= 0) {
					this.dateArr[1] = this.getAverageArr(rule, 59)
				} else if(rule !== '*') {
					this.dateArr[1] = this.getAssignArr(rule)
				}
			},
			getSecondArr(rule) {
				this.dateArr[0] = this.getOrderArr(0, 59);
				if(rule.indexOf('-') >= 0) {
					this.dateArr[0] = this.getCycleArr(rule, 60, true)
				} else if(rule.indexOf('/') >= 0) {
					this.dateArr[0] = this.getAverageArr(rule, 59)
				} else if(rule !== '*') {
					this.dateArr[0] = this.getAssignArr(rule)
				}
			},

			getOrderArr(min, max) {
				let arr = [];
				for(let i = min; i <= max; i++) {
					arr.push(i);
				}
				return arr;
			},

			getAssignArr(rule) {
				let arr = [];
				let assiginArr = rule.split(',');
				for(let i = 0; i < assiginArr.length; i++) {
					arr[i] = Number(assiginArr[i])
				}
				arr.sort(this.compare)
				return arr;
			},
			getAverageArr(rule, limit) {
				let arr = [];
				let agArr = rule.split('/');
				let min = Number(agArr[0]);
				let step = Number(agArr[1]);
				while(min <= limit) {
					arr.push(min);
					min += step;
				}
				return arr;
			},
			getCycleArr(rule, limit, status) {
				//status--表示是否从0开始（则从1开始）
				let arr = [];
				let cycleArr = rule.split('-');
				let min = Number(cycleArr[0]);
				let max = Number(cycleArr[1]);
				if(min > max) {
					max += limit;
				}
				for(let i = min; i <= max; i++) {
					let add = 0;
					if(status === false && i % limit === 0) {
						add = limit;
					}
					arr.push(Math.round(i % limit + add))
				}
				arr.sort(this.compare)
				return arr;
			},
			//比较数字大小
			compare(value1, value2) {
				if(value2 - value1 > 0) {
					return -1;
				} else {
					return 1;
				}
			},
			// 格式化日期格式如：2017-9-19 18:04:33
			formatDate(value, type) {
				let time = typeof value === 'number' ? new Date(value) : value;
				let YY = time.getFullYear();
				let MM = time.getMonth() + 1;
				let DD = time.getDate();
				let h = time.getHours();
				let m = time.getMinutes();
				let s = time.getSeconds();
				let week = time.getDay();
				if(type === undefined) {
					return YY + '-' + (MM < 10 ? '0' + MM : MM) + '-' + (DD < 10 ? '0' + DD : DD) + ' ' + (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
				} else if(type === 'YY') {
					return YY;
				} else if(type === 'MM') {
					return MM;
				} else if(type === 'DD') {
					return DD;
				} else if(type === 'h') {
					return h;
				} else if(type === 'm') {
					return m;
				} else if(type === 's') {
					return s;
				} else if(type === 'week') {
					return week;
				}
			},
			// 检查日期是否存在
			checkDate(value) {
				let time = new Date(value);
				let format = this.formatDate(time)
					//console.log(value,format)
				return value === format ? true : false;
			}
		},
		watch: {
			'ex': 'expressionChange'
		},
		computed: {

		},
		props: ['ex'],
		mounted: function() {
			// 初始化 获取一次结果
			this.expressionChange();

			//console.log(this.checkDate( '2017-9-40 04:5:6' ))
		}
}