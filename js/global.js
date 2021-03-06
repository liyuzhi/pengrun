$(function(){

	$('.slider_container').mousewheel(function(event, delta) {
		if (doScroll) {
			return;
		}
		doScroll = true;
		for(var i=0;i<navList.length;i++){
			if(navList[i] === Router.currentUrl){
				if(delta < 0){
					if(navList[i+1]){
						window.location.href = '#'+navList[i+1];
					}else{
						window.location.href = '#'+navList[0];
					}
				}else{
					if(navList[i-1]){
						window.location.href = '#'+navList[i-1];
					}else{
						window.location.href = '#'+navList[navList.length-1];
					}
				}
			}
		}
		event.preventDefault();
	})

	$('.bottom__info-trigger').click(function(){
		$('.bottom__info').addClass('bottom__info--open')
	})
	$('.bottom__info-close').click(function(){
		$('.bottom__info').addClass('bottom__info--closing')
		setTimeout(function(){
			$('.bottom__info').removeClass('bottom__info--open')
			$('.bottom__info').removeClass('bottom__info--closing')
		},400)
	})
	setTimeout(function(){
		$('.tools__wechat_block').removeAttr('style');
	},2000)
	$(".tools__phone").hover(function (){  
		$(".tools__phone_block").addClass('open');  
	},function (){  
		$(".tools__phone_block").removeClass('open');  
	});

	// 发展历程事件
	var develop_data = [
		{name: "海门", value: 9},
		{name: "鄂尔多斯", value: 12},
		{name: "招远", value: 12},
		{name: "舟山", value: 12},
		{name: "齐齐哈尔", value: 14},
		{name: "盐城", value: 15},
		{name: "赤峰", value: 16},
		{name: "青岛", value: 18},
	];
	var develop_geoCoordMap = {
		"海门":[121.15,31.89],
	    "鄂尔多斯":[109.781327,39.608266],
	    "招远":[120.38,37.35],
	    "舟山":[122.207216,29.985295],
	    "齐齐哈尔":[123.97,47.33],
	    "盐城":[120.13,33.38],
	    "赤峰":[118.87,42.28],
	    "青岛":[120.33,36.07],
	};

	var develop_convertData = function (data) {
		var res = [];
		for (var i = 0; i < data.length; i++) {
			var geoCoord = develop_geoCoordMap[data[i].name];
			if (geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value)
				});
			}
		}
		return res;
	};
	$.get('/js/map/json/china.json', function (chinaJson) {
		echarts.registerMap('china', chinaJson);
		var mapChart = echarts.init(document.getElementById('china_map'));
		var option = {
			geo: {
				map: 'china',
				itemStyle: {
					normal: {
						areaColor: '#bababa',
						borderColor: '#605b5b'
					},
					emphasis: {
						areaColor: '#bababa'
					}
				},
			},
			series: [
				{
					type: 'scatter',
					coordinateSystem: 'geo',
					data: develop_convertData(develop_data),
					symbolSize: 8,
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: false
						},
						emphasis: {
						show: true
						}
					},
					itemStyle: {
						normal: {
							color: '#d70d1d'
						}
					}
				}
			]
		}
		mapChart.setOption(option);
	})

	let develop_timer,
		develop_index = -1,
		develop_times = 3000,
		develop_timeLine_block = $('.timeLine_wrap ul li.current').offset().left,
		develop_slide_number = $('.timeLine_wrap ul li').length-1;
	$('.timeLine_block').css({"left": develop_timeLine_block})
	develop_timer = setInterval(develop_play, develop_times);
	function develop_set() {
		$('.timeLine_wrap ul li').eq(develop_index).addClass('current').siblings().removeClass('current');
		$('.develop_conten_time h1').text($('.timeLine_wrap ul li').eq(develop_index).attr('data-date'));

		develop_timeLine_block = $('.timeLine_wrap ul li.current').offset().left;
		$(".timeLine_block").stop();
		$('.timeLine_block').animate({"left": develop_timeLine_block},600);
	}
	function develop_play() {
		develop_index++;
		if (develop_index > develop_slide_number) {
			develop_index = 0;
		}
		develop_set();
	};
	$(".timeLine_wrap ul li").click(function() {
		develop_index = $(this).index();
		develop_set();
	});
	$('.timeLine_wrap ul').hover(function() {
		clearInterval(develop_timer);
	}, function() {
		develop_timer = setInterval(develop_play, develop_times);
	});


	// 首页banner
	let home_timer,
		home_index = -1,
		home_times = 8000,
		home_slide_number = $('.home_banner_cont li').length-1;
		setTimeout(function(){
			home_play()
		},1500)
	home_timer = setInterval(home_play, home_times);
	function home_set() {
		$('.home_banner_bg li').eq(home_index).addClass('current').siblings().removeClass('current');
		$('.home_banner_cont li').eq(home_index).addClass('current').siblings().removeClass('current');
		$('.home_banner_dot .item').eq(home_index).addClass('current').siblings().removeClass('current');
		$('.home_banner_dot .item').removeClass('pass');
		for(let i = 0; i <= home_index; i++){
			$('.home_banner_dot .item').eq(i).addClass('pass');
		}
	};
	function home_play() {
		home_index++;
		if (home_index > home_slide_number) {
			home_index = 0
		}
		home_set()
	};
	$('.home_banner_dot .item').click(function() {
		home_index = $(this).index();
		home_set()
	});
	// $('.home_banner_dot .item').hover(function() {
	// 	clearInterval(home_timer)
	// }, function() {
	// 	home_timer = setInterval(home_play, home_times)
	// });

	// 团队介绍
	$('.team_picture_img').hover(function(){
		$('.team_intro_h1').text($(this).attr('data-h1'))
		$('.team_intro_h2').text($(this).attr('data-h2'))
		$('.team_intro_h3').text($(this).attr('data-h3'))
		$('.team_intro_h4').text($(this).attr('data-h4'))
	})



	// 服务内容
	let service_timer,
		service_index = -1,
		service_times = 3000,
		service_slide_number = $('.service_slide .banner li').length-1;
	service_timer = setInterval(service_play, service_times);
	function service_set() {
		$('.service_slide .banner li').eq(service_index).addClass('current').siblings().removeClass('current');
		$('.service_slide .dotbox li').eq(service_index).addClass('current').siblings().removeClass('current');
	};
	function service_play() {
		service_index++;
		if (service_index > service_slide_number) {
			service_index = 0
		}
		service_set()
	};
	$('.service_slide .dotbox li').click(function() {
		service_index = $(this).index();
		service_set()
	});
	$('.service_slide .pre').click(function() {
		service_index--
		if (service_index < 0) {
			service_index = service_slide_number
		};
		service_set()
	})
	$('.service_slide .next').click(function() {
		service_index++
		if (service_index > service_slide_number) {
			service_index = 0
		}
		service_set()
	});
	$('.service_slide .banner, .service_slide .operation').hover(function() {
		clearInterval(service_timer)
	}, function() {
		service_timer = setInterval(service_play, service_times)
	});

	$('.menus_list1>li').click(function(){
		$(this).parents('.menus_list1').children('li').removeClass('current');
		let curIdx = $(this).index();
		for(let i = 0; i <= curIdx; i++){
			$(this).parents('.menus_list1').children('li').eq(i).addClass('current');
		}
	})
	$('.menus_list2 .title2').click(function(){
		$(this).parent('li').toggleClass('current');
		$(this).next('.menus_list3').toggleClass('show');
	})
	

	// 行业研究
	let explore_width = 0;
	$('.page_explore ul li').each(function(){
		explore_width+=$(this).outerWidth(true);
	})
	$('.page_explore ul').width(explore_width);
	let explore_wrapper = document.getElementById('explore_slider_wrapper');//获取wrapper
	let explore_mouse = document.getElementById('explore_slider_mouse');//获取鼠标div
	let explore_position = explore_wrapper.getBoundingClientRect();
	let explore_eLeft = explore_position.left;//wrapper距离页面左边的距离
	let explore_eWidth = explore_position.width;//wrapper的宽度
	let explore_rule = explore_eWidth/2+explore_eLeft;//计算wrapper元素的中心点的x轴坐标
	let explore_liTotal = explore_wrapper.getElementsByTagName('li').length;//获取li的个数
	let explore_liWidth = explore_wrapper.getElementsByTagName('li')[0].offsetWidth;//获取li元素的宽度
	let explore_eVolume = parseInt(explore_eWidth/explore_liWidth);//计算wrapper容积
	let explore_currIndex=0;//当前滚动了几次
	let explore_scroll = new BScroll(explore_wrapper, {
		scrollY: false,
		scrollX: true,
		eventPassthrough: 'vertical',
		snap: {
			loop: false,
			threshold: 0.5,
			stepX: explore_liWidth
		}
	})
	$(".page_explore ul").mousedown(function(){
		$('.explore_slider_wrapper').addClass('is_pointer_down')
	})
	$(".page_explore ul").mouseup(function(){
		$('.explore_slider_wrapper').removeClass('is_pointer_down')
	})
	// $(".page_explore ul li .img").click(function(e){
	// 	if(e.clientX<explore_rule){
	// 		explore_scroll.prev();
	// 	}else{
	// 		if(explore_liTotal-explore_eVolume>explore_currIndex){
	// 			explore_scroll.next();
	// 		}
	// 		explore_currIndex=explore_scroll.getCurrentPage().pageX;
	// 	}
	// })
	// $(".page_explore ul li .img").mousemove(function(e){
	// 	explore_mouse.style.transform = `matrix(1, 0, 0, 1, ${e.clientX-35}, ${e.clientY-35})`;
	// 	if(e.clientX<explore_rule){
	// 		explore_mouse.classList.add('explore_slider_rotate')
	// 	}else{
	// 		explore_mouse.classList.remove('explore_slider_rotate')
	// 	}
	// })
	// $(".page_explore ul li .img").mouseenter(function(e){
	// 	explore_mouse.classList.add('show')
	// })
	// $(".page_explore ul li .img").mouseleave(function(e){
	// 	explore_mouse.classList.remove('show')
	// })

	// 行业动态
	$('.industry_time_line .item').click(function(){
		$(this).addClass('current').siblings().removeClass('current');
		$('.industry_time_article').eq($(this).index()).addClass('current').siblings().removeClass('current');
	})
	$('.industry_time_article ul').mCustomScrollbar({
		horizontalScroll:true
	});
	// $('.industry_time_article').each(function(){
	// 	let industry_width = 0;
	// 	$(this).find('ul li').each(function(){
	// 		industry_width+=$(this).outerWidth(true);
	// 	})
	// 	$(this).find('ul').width(industry_width);
	// })

	// $('.industry_time_article ul').mousewheel(function(event, delta) {
	// 	this.scrollLeft -= (delta * 60);
	// 	event.preventDefault();
	// });

	// 数据调研
	$('.page_data ul li .img').click(function(){
		$('.data_details').addClass('show');
	})

	$('.return_page_service').click(function(){
		$('.data_details').removeClass('show');
		self.location.href="#/service";
	})
	$('.industry_time_article ul li .img,.page_explore li .btn').click(function(){
		$('.article_details').addClass('show');
	})
})

$.fn.countTo = function (options) {
	options = options || {};
	return $(this).each(function () {
		// set options for current element
		var settings = $.extend({}, $.fn.countTo.defaults, {
			from:            $(this).data('from'),
			to:              $(this).data('to'),
			speed:           $(this).data('speed'),
			refreshInterval: $(this).data('refresh-interval'),
			decimals:        $(this).data('decimals')
		}, options);
		
		// how many times to update the value, and how much to increment the value on each update
		var loops = Math.ceil(settings.speed / settings.refreshInterval),
			increment = (settings.to - settings.from) / loops;
		
		// references & variables that will change with each update
		var self = this,
			$self = $(this),
			loopCount = 0,
			value = settings.from,
			data = $self.data('countTo') || {};
		
		$self.data('countTo', data);
		
		// if an existing interval can be found, clear it first
		if (data.interval) {
			clearInterval(data.interval);
		}
		data.interval = setInterval(updateTimer, settings.refreshInterval);
		
		// initialize the element with the starting value
		render(value);
		
		function updateTimer() {
			value += increment;
			loopCount++;
			
			render(value);
			
			if (typeof(settings.onUpdate) == 'function') {
				settings.onUpdate.call(self, value);
			}
			
			if (loopCount >= loops) {
				// remove the interval
				$self.removeData('countTo');
				clearInterval(data.interval);
				value = settings.to;
				
				if (typeof(settings.onComplete) == 'function') {
					settings.onComplete.call(self, value);
				}
			}
		}
		
		function render(value) {
			var formattedValue = settings.formatter.call(self, value, settings);
			$self.html(formattedValue);
		}
	});
};
$.fn.countTo.defaults = {
	from: 0,               // the number the element should start at
	to: 0,                 // the number the element should end at
	speed: 1000,           // how long it should take to count between the target numbers
	refreshInterval: 100,  // how often the element should be updated
	decimals: 0,           // the number of decimal places to show
	formatter: formatter,  // handler for formatting the value before rendering
	onUpdate: null,        // callback method for every time the element is updated
	onComplete: null       // callback method for when the element finishes updating
};
function formatter(value, settings) {
	return value.toFixed(settings.decimals);
}
function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
}


let navList = [],
	initialize = true,
	doScroll = false,
	screenWidth = $(window).width(),
	screenHeigth = $(window).height(),
	cooperation_slide_number = 0,cooperation_index = 0,cooperation_times = 1500,cooperation_timer = '';
function pageFun(url){
	$('body').removeClass().addClass('body_page_'+url.replace('/',''));
	$('.main_bg .bg').removeAttr('style');
	$('.main_bg .bg_'+url.replace('/','')).css({'opacity': '1'})
	$('#nav_list li').removeClass('nav_item_current')
	$('#nav_list li').each(function(){
		if($(this).find('a').attr('href') == '#'+url){
			$(this).addClass('nav_item_current')
		}
	});

	$('#slider_container .rsSlide').removeClass('rsActiveSlide');
	$('#slider_container .rsSlide').each(function(i){
		if(initialize){
			$(this).css("top",screenHeigth*i+'px')
		}
		if($(this).attr('data-html') == url){
			var _this = this;
			setTimeout(function() {
				$('.page_line .line').css('height','100%');
				$(_this).addClass('rsActiveSlide');
				doScroll = false;
			},1500)
			$('.rsContainer').css({'transition-duration': '1500ms','transform': 'translate3d(0px, -'+ screenHeigth*i +'px, 0px)','transition-timing-function': 'cubic-bezier(0.645, 0.045, 0.355, 1)'});
		};
	})
	initialize = false;
};


function Router() {
	this.routes = {};
	this.currentUrl = '';
}
Router.prototype.route = function(path, callback) {
	navList.push(path)
	this.routes[path] = callback || function(){};
};
Router.prototype.refresh = function() {
	this.currentUrl = location.hash.slice(1) || '/';
	let service_setTimeout;
	if(this.currentUrl == '/service'){
		service_setTimeout = setTimeout(function(){
			if(Router.currentUrl == '/service'){
				$('.service_slide').addClass('show');
			}
		},4000)
	}else{
		clearTimeout(service_setTimeout);
		$('.service_slide').removeClass('show')
	}

	this.routes[this.currentUrl]();
	pageFun(this.currentUrl);
};
Router.prototype.init = function() {
	window.addEventListener('load', this.refresh.bind(this), false);
	//监听hashchange，hash的改变
	window.addEventListener('hashchange', this.refresh.bind(this), false);
}
//定义完了，初始化
window.Router = new Router();
window.Router.init();
Router.route('/', function() {
	// console.log('首页')
});
Router.route('/service', function() {
	// console.log('服务内容')
});
Router.route('/develop', function() {
	// console.log('发展历程')
});
Router.route('/scale', function() {
	// console.log('彭润规模')
	setTimeout(function(){
		$('.scale_number').data('countToOptions', {
			formatter: function (value, options) {
				return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
			}
		});
		$('.scale_number').each(count);
	},400)
});
Router.route('/industry', function() {
	// console.log('行业动态')
});
Router.route('/explore', function() {
	// console.log('行业研究')
});
Router.route('/data', function() {
	// console.log('数据调研')
});
Router.route('/team', function() {
	// console.log('团队介绍')
});
Router.route('/cooperation', function() {
	// console.log('合作伙伴')
	// 合作伙伴事件
	clearInterval(cooperation_timer);
	$(".page_cooperation ul li").removeClass('current');
	cooperation_slide_number = $('.page_cooperation ul li').length-1;
	cooperation_index = 0;
	cooperation_timer = setInterval(function(){
		if(cooperation_index > cooperation_slide_number){
			cooperation_index = 0;
		}
		$(".page_cooperation ul li").eq(cooperation_index).addClass('current').siblings().removeClass('current');
		cooperation_index++;
	}, cooperation_times);
});
Router.route('/contact', function() {
	// console.log('联系我们')
});