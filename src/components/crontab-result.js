export default {
	data() {
			return {
				dayRule:'',
				dayRuleSup:'',
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

//				console.log('dayRule:'+this.dayRule,'dayRuleSup:'+this.dayRuleSup)
				
				let nums = 0;
				let resultArr = [];

				// 获取当前时间并将值切割为[0年、1月、2日、3时、4分、5秒]
				let nowTime = new Date('2017-09-30 23:59:58');

				let timeNum = nowTime.getTime();
				timeNum = timeNum - timeNum % 1000;
				let timeWeek = this.formatDate(nowTime, 'week');

				let nowYear = nowTime.getFullYear();
				let nowMouth = nowTime.getMonth() + 1;
				let nowDay = nowTime.getDate();
				let nowHour = nowTime.getHours();
				let nowMin = nowTime.getMinutes();
				let nowSecond = nowTime.getSeconds();
				let timeArr = this.formatDate(nowTime).match(/[0-9]{1,4}/g);
				
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
				let hhIdx = this.getIndex(this.dateArr[2], nowHour);
				let DDIdx = this.getIndex(this.dateArr[3], nowDay);
				let MMIdx = this.getIndex(this.dateArr[4], nowMouth);
				let YYIdx = this.getIndex(this.dateArr[5], nowYear);

				let ssDate = this.dateArr[0];
				let mmDate = this.dateArr[1];
				let hhDate = this.dateArr[2];
				let DDDate = this.dateArr[3];
				let MMDate = this.dateArr[4];
				let YYDate = this.dateArr[5];
				
				
				function resetMouth() {
					MMIdx = 0;
					nowMouth = MMDate[MMIdx]
				}
				function resetDay() {
					DDIdx = 0;
					nowDay = DDDate[DDIdx]
				}
				function resetHour() {
					hhIdx = 0;
					nowHour = hhDate[hhIdx]
				}
				function resetMin() {
					mmIdx = 0;
					nowMin = mmDate[mmIdx]
				}
				function resetSecond() {
					ssIdx = 0;
					nowSecond = ssDate[ssIdx]
				}

				// 利用for循环获取到时间值
				if(nowYear < YYDate[0]){
					resetSecond();
					resetMin();
					resetHour();
					resetDay();
					resetMouth();
				}
				goYear: for(let Yi = YYIdx; Yi < YYDate.length; Yi++) {
					let YY = YYDate[Yi];
					//如果当前月份小于最小的月份则将几个数置0
					if(nowMouth < MMDate[0]){
						resetSecond();
						resetMin();
						resetHour();
						resetDay();
						resetMouth();
					}
					
					goMouth: for(let Mi = MMIdx; Mi < MMDate.length; Mi++) {
						//判断当前“月”是否超出范围，超出时将月日时分秒重置并跳出当月循环
						if(nowMouth > MMDate[MMDate.length-1]){
							resetSecond();
							resetMin();
							resetHour();
							resetDay();
							resetMouth();
							continue goYear;
						}
						let MM = MMDate[Mi];
						MM = MM < 10 ? '0' + MM : MM;
						
						goDay: for(let Di = DDIdx; Di < DDDate.length; Di++) {
							//判断当前“日”是否超出范围，超出时将日时分秒重置并跳出当月循环
							if(nowDay > DDDate[DDDate.length -1]){
								resetSecond();
								resetMin();
								resetHour();
								resetDay();
								continue goMouth;
							}
							let DD = DDDate[Di];
							DD = DD < 10 ? '0' + DD : DD;
							
							// 判断日期的合法性
							if(this.checkDate(YY + '-' + MM + '-' + DD + ' 00:00:00') !== true && this.dayRule !== 'workDay') {
								resetSecond();
								resetMin();
								resetHour();
								resetDay();
								continue goMouth;
							}
							
							// 如果日期规则中有值时
							if(this.dayRule === 'lastDay'){
								//****获取每月最后一天
								//获取下一天
								let myDD = Number(DD)+1;
								myDD = myDD < 10 ? '0' + myDD : myDD;
								//校验它的下一天，true-说明下一天不是月末--跳出当前循环
								if(this.checkDate(YY + '-' + MM + '-' + myDD + ' 00:00:00') === true){
									continue goDay;
								}
							}else if(this.dayRule === 'workDay'){
								DD = Number(DD);
								let thisDD = DD < 10?'0'+DD:DD;
								//校验并调整如果是2月30号这种日期传进来时需调整至正常月底
								if(this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true){
									while(this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true){
										DD --;
										thisDD = DD < 10?'0'+DD:DD;
									}
								}
								// 获取达到条件的日期是星期X
								let thisWeek = this.formatDate(new Date(YY + '-' + MM + '-' + DD + ' 00:00:00'),'week');
								// 当星期日时
								if(thisWeek === 0){
									//先找下一个日，并判断是否为月底
									DD ++;
									thisDD = DD < 10?'0'+DD:DD;
									//判断下一日已经不是合法日期
									if(this.checkDate(YY + '-' + MM + '-' + thisDD + ' 00:00:00') !== true){
										DD -= 3;
									}
								}else if(thisWeek === 6){
									//当星期6时只需判断不是1号就可进行操作
									if(this.dayRuleSup !== 1){
										DD --;
									}else{
										DD += 2;
									}
								}
								DD = DD < 10 ? '0' + DD : DD;
							}
							
							
							
							goHour: for(let hi = hhIdx; hi < hhDate.length; hi++) {
								// 判断当前“时”是否超出范围，超出时将时分秒重置并跳出当前日循环
								if(nowHour > hhDate[hhDate.length - 1]) {
									resetSecond();
									resetMin();
									resetHour();
									continue goDay;
								}
								let hh = hhDate[hi] < 10 ? '0' + hhDate[hi] : hhDate[hi]
								//  循环分
								goMin: for(let mi = mmIdx; mi < mmDate.length; mi++) {
									// 判断当前“分”是否超出范围，超出时将
									if(nowMin > mmDate[mmDate.length - 1]) {
										resetSecond();
										resetMin();
										continue goHour;
									}
									let mm = mmDate[mi] < 10 ? '0' + mmDate[mi] : mmDate[mi];
									//循环获取秒数（从索引开始）
									goSecond: for(let si = ssIdx; si <= ssDate.length - 1; si++) {
										if(nowSecond > ssDate[ssDate.length - 1]) {
											resetSecond();
											continue goMin;
										}
										let ss = ssDate[si] < 10 ? '0' + ssDate[si] : ssDate[si];
										// 添加当前时间（时间合法性在日期循环时已经判断）
										resultArr.push(YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss)
										nums++;
										//如果条数满了就退出循环
										if(nums === 5) break goYear;
										//如果到达最大值时
										if(si === ssDate.length - 1 && mi !== mmDate.length - 1) {
											resetSecond();
											continue goMin;
										} else if(si === ssDate.length - 1 && mi === mmDate.length - 1 && hi !== hhDate.length - 1) {
											resetSecond();
											resetMin();
											continue goHour;
										} else if(si === ssDate.length - 1 && mi === mmDate.length - 1 && hi === hhDate.length - 1 && Di !== DDDate.length - 1) {
											resetSecond();
											resetMin();
											resetHour();
											continue goDay;
										} else if(si === ssDate.length - 1 && mi === mmDate.length - 1 && hi === hhDate.length - 1 && Di === DDDate.length - 1 && Mi !== MMDate.length-1) {
											resetSecond();
											resetMin();
											resetHour();
											resetDay();
											continue goMouth;
										} else if(si === ssDate.length - 1 && mi === mmDate.length - 1 && hi === hhDate.length - 1 && Di === DDDate.length - 1 && Mi === MMDate.length-1 && Yi !== YYDate.length-1) {
											resetSecond();
											resetMin();
											resetHour();
											resetDay();
											resetMouth();
											continue goYear;
										}
									} //goSecond
								} //goMin
							}//goHour
						}//goDay
					}//goMouth
				}
				//判断100年内的结果
				if(resultArr.length === 0){
					this.resultList = ['没有达到条件的结果！'];
				}else{
					this.resultList = resultArr;
					if(resultArr.length !== 5){
						this.resultList.push('最近100年内只有上面'+resultArr.length+'条结果！')
					}
				}
				this.isShow = true;
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
				this.dateArr[5] = this.getOrderArr(year, year + 100);
				if(rule !== undefined) {
					if(rule.indexOf('-') >= 0) {
						this.dateArr[5] = this.getCycleArr(rule, year + 100, false)
					} else if(rule.indexOf('/') >= 0) {
						this.dateArr[5] = this.getAverageArr(rule, year + 100)
					} else if(rule !== '*') {
						this.dateArr[5] = this.getAssignArr(rule)
					}
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
			getWeekArr(rule) {
				//只有当日期规则的两个值均为“”时则表达日期是有选项的
				if(this.dayRule === '' && this.dayRuleSup === ''){
					if(rule.indexOf('-') >= 0) {
						this.dayRule  = 'weekDay';
						this.dayRuleSup = this.getCycleArr(rule, 7, false)
					} else if(rule.indexOf('#') >= 0) {
						this.dayRule  = 'assWeek';
						let matchRule = rule.match(/[0-9]{1}/g);
						this.dayRuleSup = [Number(matchRule[0]),Number(matchRule[1]),];
					} else if(rule.indexOf('L') >= 0) {
						this.dayRule  = 'lastWeek';
						this.dayRuleSup = Number(rule.match(/[0-9]{1,2}/g)[0]);
					} else if(rule !== '*' && rule !== '?') {
						this.dayRule  = 'weekDay';
						this.dayRuleSup = this.getAssignArr(rule)
					}
				}
			},
			getDayArr(rule) {
				this.dateArr[3] = this.getOrderArr(1, 31);
				this.dayRule = '';
				this.dayRuleSup = '';
				if(rule.indexOf('-') >= 0) {
					this.dateArr[3] = this.getCycleArr(rule, 31, false)
					this.dayRuleSup = 'null';
				} else if(rule.indexOf('/') >= 0) {
					this.dateArr[3] = this.getAverageArr(rule, 31)
					this.dayRuleSup = 'null';
				} else if(rule.indexOf('W') >= 0) {
					this.dayRule  = 'workDay';
					this.dayRuleSup = Number(rule.match(/[0-9]{1,2}/g)[0]);
					this.dateArr[3] = [this.dayRuleSup];
				} else if( rule.indexOf('L') >= 0 ) {
					this.dayRule = 'lastDay';
					this.dayRuleSup = 'null';
				} else if(rule !== '*' && rule !== '?') {
					this.dateArr[3] = this.getAssignArr(rule)
					this.dayRuleSup = 'null';
				} else if(rule === '*'){
					this.dayRuleSup = 'null';
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
				return value === format ? true : false;
			}
		},
		watch: {
			'ex': 'expressionChange'
		},
		props: ['ex'],
		mounted: function() {
			// 初始化 获取一次结果
			this.expressionChange();
		}
}