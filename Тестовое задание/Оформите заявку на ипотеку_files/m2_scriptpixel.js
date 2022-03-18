/*var TIME_FROM = 9;
var TIME_TO = 19;

var TIME_FROM2 = 10;
var TIME_TO2 = 17;*/

var date = new Date();
var clientLocalHour = date.getHours();
var landing2 = {};
//$(document).ready(function(){
landing2.afterFormSendEvent = function(data){
data['credit-sum'] = oip.cMortgageCalc.calcResult.creditSum;
		if ('success' in data && data['success'] === true && 'id' in data) {
			
			var search = window.location.search.substr(1),
			keys = {};
			search.split('&').forEach(function(item) {
				item = item.split('=');
				keys[item[0]] = item[1];
			});
			var utmcampaign, utmsource;
			utmcampaign = keys.utm_campaign;
			utmsource = keys.utm_source;
			
			if (clientLocalHour >= 9 && clientLocalHour < 18) {
				if (utmsource == 'banki.ru') {
					var pixel = new Image();
					pixel.src = 'https://tracking.banki.ru/SLtn?adv_sub='+data['id'];
					}
				} 

			if (clientLocalHour >= 9 && clientLocalHour < 18) {
				if (utmsource == 'sravni.ru') {
						var pixel = new Image();
						pixel.src = 'https://sravni.go2cloud.org/aff_l?offer_id=257&adv_sub='+data['id'];
							} else if (utmsource == 'mirkvartir.ru') {	
								var pixel = new Image();
								pixel.src = 'https://ad.adriver.ru/cgi-bin/rle.cgi?sid=1&ad=658113&bt=21&pid=2750525&bid=5625933&bn=5625933&rnd=2097031494';
									} else if (utmcampaign == 'bankiros_mortgage_tkb') {
										var pixel = new Image();
										pixel.src = 'http://analytics.mainfin.ru/tracking.gif?uid='+uidname+'&adv_tkb_mort='+data['id'];
											} else if (utmcampaign == 'mainfin_refin_tkb') {
												var pixel = new Image();
												pixel.src = 'http://analytics.mainfin.ru/tracking.gif?uid='+uidname+'&adv_tkb_ref='+data['id'];
													}
				}
			
			if (utmsource == 'vbr.ru') {
					var pixel = new Image(), pixel2 = new Image(), pixel3 = new Image(), pixel4 = new Image();
					pixel.src = 'https://adv.vbr.ru/api/postback/img?lid=5c014e500f6ea0165cb4cc37&poid=' +data['id'];
					pixel2.src = 'https://adv.vbr.ru/api/postback/img?lid=5c014e660f6ea0165cb4cc3e&poid=' +data['id'];
					pixel3.src = 'https://adv.vbr.ru/api/postback/img?lid=5c014e740f6ea0165cb4cc42&poid=' +data['id'];
					pixel4.src = 'https://adv.vbr.ru/api/postback/img?lid=5c014e740f6ea0165cb4cc42&poid=' +data['id'];
					};
					
			var pixel5 = new Image();
			pixel5.src = 'https://adv.vbr.ru/api/postback/img?lid=5c014e660f6ea0165cb4cc3e';
					
					var prog = $( ".calc-menu .current" ).first().text();
		
		prog = prog.replace(/(^\s*)|(\s*)$/g, '');
		dataLayer = window.dataLayer || []; 
		dataLayer.push({ 
			'event':'successful_order_form', 
			'ecommerce': { 
				'purchase': { 
					'actionField': { 
						'id': data['id'], 
						'affiliation': 'tkbbank.ru', 
						'revenue': data['credit-sum'] 
						}, 
					'products': [{ 
						'name': 'Ипотека',
						'id': 'Ипотека',
						'price': data['credit-sum'], 
						'category': window.location.pathname,
						'variant': prog,
						'quantity': 1 
						}] 
					} 
				} 
			});
			
			}
		}
//	});

landing2.sendFormEvents = function(){
	$('.send-tip',oip.cMortgageCalc.container).text('');
	ga('send', 'event', 'credits_mortgage_order', 'order');
	yaCounter31783466.reachGoal('credits_mortgage_order');
	$('#advantages-list .b-teaser_group').each(function() {
		var $img = $('.b-teaser_pic img', this);
		var img = $img.attr('src');
		var hover = $img.data('hover');
		if (typeof hover == 'undefined') return;
		(new Image()).src = hover; // предзагрузка

		$(this).hover(function() {
			$img.attr('src', hover);
		}, function() {
			$img.attr('src', img);
		});
	});
};

var obErrors = {
	age : 'К сожалению Ваш возраст на момент погашения кредита превысит 75 лет. Попробуйте уменьшить срок кредитования и повторить расчет',
	childAge: 'Ваш запрос не соответствует программе господдержки. Выберите другую программу',
	work: 'К сожалению, Вы не сможете получить кредит без трудовой занятости',
	incomeDoc: 'К сожалению, Вы не сможете получить кредит без трудовой занятости'
};
landing2.beforeFormSendEvent = function(data,err) {
	$('.mg-calc .fieldcell.error').removeClass('error');
	oip.cMortgageCalc.beforeFormSendEvent(data)
	data['mg-tariff'] = data['mg-gos'] = '';

	// доход
	if(!$('.mg-calc #income-doc').val()) {
		err.errors = err.errors || [];
		err.errors.push({message:obErrors.incomeDoc, field: $('.mg-calc #income-doc')})
	}
	// др ребенка
	if($('.mg-calc #child-age').val()) {
		if(!checkChildAge()) {
			err.errors = err.errors || [];
			err.errors.push({message: obErrors.childAge, field: $('.mg-calc #child-age')})
		}
	}
	//возраст
	if(!checkAge()) {
		err.errors = err.errors || [];
		err.errors.push({message:obErrors.age, field: $('.mg-calc #age')})
	}

	// работы

	if(!$('.mg-calc #work').val()) {
		err.errors = err.errors || [];
		err.errors.push({message:obErrors.work, field: $('.mg-calc #work')})
	}
};
function checkAge() {
	let age = parseInt($('.mg-calc #age').val()),
		period = parseInt($('.mg-calc #period').val());

	return age + period <= 75;
}
function checkChildAge() {
	let val = $('.mg-calc #child-age').val(),
		minDate = new Date(2018, 0,1),
		selectedDate = new Date(val.split('.')[2], val.split('.')[1] - 1,val.split('.')[0]);

	return selectedDate >= minDate;
}
function showError (error, item){
	var $cell = item.closest('.fieldcell'),
		$error = $('.error-txt', $cell);
	if (!$error.length) $error = $('<div class="error-txt"></div>').appendTo($cell);
	let errText = typeof error == 'string' ? error : error.text();
	$error.text(errText);
	$cell.addClass('error');
}
$(document).ready(function(){
	$('.mg-calc input,.mg-calc select,.mg-calc textarea').on('change selectmenuchange ', function(){
		$(this).closest('.fieldcell').removeClass('error')
	});
	$('.mg-calc #work').on('change selectmenuchange', function(){
		if($(this).find(':selected').hasClass('ip')) {
			$('.mg-calc .field_business12').show();
			$('#income-doc .ndfl').attr('disabled', false);
			$('#income-doc').selectmenu('refresh');
		} else {
			$('.mg-calc .field_business12').hide();
			$('#income-doc .ndfl').attr('disabled', true);
			$('#income-doc').val($('#income-doc .bank').val());
			$('#income-doc').selectmenu('refresh');
		}
		if(!$(this).val()) {
			showError(obErrors.work, $(this))
		}

	});
	$('.mg-calc #income-doc').on('change selectmenuchange', function(){
		if(!$(this).val()) {
			showError(obErrors.incomeDoc, $(this));
		}
	});

	$('.mg-calc #age,.mg-calc #period').on('slidechange', function(){
		if(!checkAge()) {
			showError(obErrors.age, $(this));
		}
	});
	$('.mg-calc #child-age').on('change', function(){
		if(!checkChildAge()) {
			showError(obErrors.childAge, $(this));
		}

	});
});