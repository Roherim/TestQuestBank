//Выполняем код при загрузке страницы
window.onload= function(){
//Получаем параметр из url
var search = window.location.search.substr(1),
keys = {};
search.split('&').forEach(function(item) {
item = item.split('=');
keys[item[0]] = item[1];
});
//передаём параметр в переменную
as = keys.id;

//переключаемся на вкладку, соответствующую переменной
$('.'+as+' '+'label').trigger('click');

//Передаём значение переменной as в функцию, для вывода соответствующего активной вкладке содержимого в шапке
$(changeSomething(as));

var as, mwidth;

mwidth = $( document ).width();

if(mwidth > 768) {
// Получаем все классы
;!(function ($) {
    $.fn.classes = function (callback) {
        var classes = [];
        $.each(this, function (i, v) {
            var splitClassName = v.className.split(/\s+/);
            for (var j = 0; j < splitClassName.length; j++) {
                var className = splitClassName[j];
                if (-1 === classes.indexOf(className)) {
                    classes.push(className);
                }
            }
        });
        if ('function' === typeof callback) {
            for (var i in classes) {
                callback(classes[i]);
            }
        }
        return classes;
    };
})(jQuery);

// Передаём полученный массив данных в переменную
var u = $('.calc-menu li').classes();
 
$(".calc-menu li").click(function(e){
  
  //по клику получаем классы элемента, на котором кликнули
  var o = $(this).attr('class');
  
  //Берём нужный класс - это второй элемент массива и присваем его переменной as
	var as = o.split(' ',2)[1];

	//alert(as);
	changeSomething(as);
  });
 } else if(mwidth < 767) {
	$(".calc-menu-mobile-select").change(function() {
	var th = $(".calc-menu-mobile-select").val();
	
	var as = th;
	changeSomething(as);
})
 }
 
  
/*Получить все классы -конец*/

//Функция замены содержимого в шапке
function changeSomething(as) {

var idv = as;

// ?id=p-easy-five
// ?id=p-easy
// ?id=p-vip
// ?id=p-refinancing
// ?id=p-comfort
// ?id=p-support 
// ?id=gos 
// ?id=foreign
// ?id=p-mortgage-gos

if (idv == 'p-easy-five' || idv == 'easy-five') {
		$(".b-product_promo_cont").removeClass("foreign");
		$('.landing_easy_mort_icon').html('Ипотека на готовое жилье');
		$('.usloviya').html('<span class="usloviya_procent text_center"><span class="font_medium">от</span> <span class="font_large">12,74</span><span class="font_medium">%</span><br/> ставка годовых</span><span class="usloviya_firstinstallment text_center border_left border_right"><span class="font_medium">от</span> <span class="font_large">5</span><span class="font_medium">%</span><br/>первый взнос</span><span class="usloviya_date text_center"><span class="font_medium">до</span> <span class="font_large">25</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"></br>Дистанционная подача</br>Оформление по 2 документам</br>Решение за один день и действует 3 месяца<br/><span class="mintext">Возможность снизить ставку до <b>5,9%</b> (господдержка)</span></span>');
		} else if (idv == 'p-easy' || idv == 'easy') {
					$(".b-product_promo_cont").removeClass("foreign");
					$('.landing_easy_mort_icon').html('<span class="zag">Ипотека на новостройки</span> <span class="familyandchildren">Господдержка</span>');
					$('.usloviya').html('<span class="usloviya_procent text_center"><span class="font_medium">от</span> <span class="font_large">12,74</span><span class="font_medium">%</span><br/> ставка годовых</span><span class="usloviya_firstinstallment text_center border_left border_right"><span class="font_medium">от</span> <span class="font_large">5</span><span class="font_medium">%</span><br/>первый взнос</span><span class="usloviya_date text_center"><span class="font_medium">до</span> <span class="font_large">25</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"><br/>Дистанционная подача<br/>Оформление по 2 документам<br/>Решение за один день и действует 3 месяца<br/><span class="mintext">Возможность снизить ставку до <b>5.9%</b> (господдержка)</span></span>');
			       } else if (idv == 'p-vip' || idv == 'vip') {
							$(".b-product_promo_cont").removeClass("foreign");
							$('.b-mainmenu_item.other label').click();
							$('.landing_easy_mort_icon').html('Ипотека на нежилую недвижимость');
							$('.usloviya').html('<span class="usloviya_procent text_center"><span class="font_medium">от</span> <span class="font_large">14,99</span><span class="font_medium">%</span><br/> ставка годовых</span><span class="usloviya_firstinstallment text_center border_left border_right"><span class="font_medium">от</span> <span class="font_large">50</span><span class="font_medium">%</span><br/>первый взнос</span><span class="usloviya_date text_center"><span class="font_medium">до</span> <span class="font_large">25</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"></br>Возможно получение ИП и собственниками бизнеса<br/>Решение за один день и действует 3 месяца</span>');
							} else if (idv == 'p-refinancing' || idv == 'refinancing') {
										$(".b-product_promo_cont").removeClass("foreign");
										$('.landing_easy_mort_icon').html('Рефинансирование ипотеки');
										$('.usloviya').html('<span class="usloviya_procent usl_ref text_center width2"><span class="font_medium">от</span> <span class="font_large">12,74</span><span class="font_medium">%</span><br/> ставка годовых</span><span class="usloviya_date text_center border_left width2"><span class="font_medium">до</span> <span class="font_large">25</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"><br/>Дистанционная подача<br/>Оформление по 2 документам<br/>Решение за один день и действует 3 месяца<span class="mintext"></span></span>');
										} else if (idv == 'p-comfort' || idv == 'comfort') {
													$(".b-product_promo_cont").removeClass("foreign");
													$('.landing_easy_mort_icon').html('<span class="zag">Кредит под залог<br> недвижимости</span> <span class="familyandchildren">Наличными на любые цели</span>');
													$('.usloviya').html('<span class="usloviya_procent usl_zalog text_center width2"><span class="font_medium">от</span> <span class="font_large">11,24</span><span class="font_medium">%</span><br/> ставка годовых</span><span class="usloviya_date text_center border_left width2"><span class="font_medium">до</span> <span class="font_large">15</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"><br/>Возможно получение ИП и собственниками бизнеса<br/>Консультации по самым сложным вопросам<br/>Решение за один день и действует 3 месяца</span>');
													} else if (idv == 'p-support' || idv == 'support') {
																$(".b-product_promo_cont").removeClass("foreign");
																$('.b-mainmenu_item.other label').click();
																$('.landing_easy_mort_icon').html('<span class="zag">Ипотека в ползунках</span> <span class="familyandchildren"><span class="familyandchildren">Ипотека и рефинансирование для семей <br>с детьми младше 1 января 2018 года</span></span>');
																$('.usloviya').html('<span class="usloviya_procent text_center"><span class="font_medium">от</span> <span class="font_large">5,75</span><span class="font_medium">%</span><br/> ставка годовых*</span><span class="usloviya_firstinstallment text_center border_left border_right"><span class="font_medium">от</span> <span class="font_large">0</span><span class="font_medium">%</span><br/>первый взнос</span><span class="usloviya_date text_center"><span class="font_medium">до</span> <span class="font_large">25</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"><br/>Дистанционная подача<br/>Оформление по 3 документам<br/>Решение за один день и действует 3 месяца</span>');
																	} else if (idv == 'gos') {
																				$(".b-product_promo_cont").removeClass("foreign");
																				$('.landing_easy_mort_icon').html('<img src="/images/gossluzhazshie-banner.svg" style="width:57%;" />');
																				$('.usloviya').html('<span class="usloviya_procent text_center"><span class="font_medium">от</span> <span class="font_large">12,74</span><span class="font_medium">%</span><br/> ставка годовых</span><span class="usloviya_firstinstallment text_center border_left border_right"><span class="font_medium">от</span> <span class="font_large">20</span><span class="font_medium">%</span><br/>первый взнос</span><span class="usloviya_date text_center"><span class="font_medium">до</span> <span class="font_large">25</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"><br/>Дистанционная подача<br/>Оформление по двум документам<br/>Консультации по самым сложным вопросам</span>');
																				} else if (idv == 'itb') {
																					$(".b-product_promo_cont").removeClass("foreign");
																					$('.landing_easy_mort_icon').html('<span class="zag">Ипотека и рефинансирование</span><img src="/landing/mortgage3/images/itb-logo.svg" style="width:37%;margin-top:15px;" />');
																					$('.usloviya').html('<span class="usloviya_procent text_center"><span class="font_medium">от</span> <span class="font_large">12,74</span><span class="font_medium">%</span><br/> ставка годовых</span><span class="usloviya_firstinstallment text_center border_left border_right"><span class="font_medium">от</span> <span class="font_large">20</span><span class="font_medium">%</span><br/>первый взнос</span><span class="usloviya_date text_center"><span class="font_medium">до</span> <span class="font_large">25</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"><br/>Дистанционная подача<br/>Оформление по двум документам<br/>Консультации по самым сложным вопросам<br/><span class="mintext">возможность снизить ставку до 5,9%</span></span>');
																					} else if (idv == 'foreign') {
																						$(".b-product_promo_cont").addClass("foreign");
																						$('.landing_easy_mort_icon').html('<span class="zag" style="color:#f59d15;">Ипотека для иностранцев</span>');
																						$('.usloviya').html('<span class="usloviya_procent text_center"><span class="font_medium">от</span> <span class="font_large">12,74</span><span class="font_medium">%</span><br/> ставка годовых</span><span class="usloviya_firstinstallment text_center border_left border_right"><span class="font_medium">от</span> <span class="font_large">20</span><span class="font_medium">%</span><br/>первый взнос</span><span class="usloviya_date text_center"><span class="font_medium">до</span> <span class="font_large">25</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"><br/>Дистанционная подача<br/>Оформление по двум документам<br/>Консультации по самым сложным вопросам</span>');
																						} else if (idv == 'p-mortgage-gos' || idv == 'mortgage-gos') {
																							$(".b-product_promo_cont").removeClass("foreign");
																							$('.b-mainmenu_item.other label').click();
																							$('.landing_easy_mort_icon').html('<span class="zag">Ипотека на новостройки</span> <span class="familyandchildren">Господдержка</span>');
																							$('.usloviya').html('<span class="usloviya_procent text_center"><span class="font_medium">от</span> <span class="font_large">12,74</span><span class="font_medium">%</span><br/> ставка годовых</span><span class="usloviya_firstinstallment text_center border_left border_right"><span class="font_medium">от</span> <span class="font_large">20</span><span class="font_medium">%</span><br/>первый взнос</span><span class="usloviya_date text_center"><span class="font_medium">до</span> <span class="font_large">25</span> <span class="font_medium">лет</span><br/>Срок ипотеки</span><span class="usloviya_info text_center"><br/>Дистанционная подача<br/>Оформление по 2 документам<br/>Решение за один день и действует 3 месяца</span>');
																							};
		if(idv == 'p-support' || idv == 'support') {
			$("#js-primPolzunki").show();
		} else {
			$("#js-primPolzunki").hide();
		};
}

}





