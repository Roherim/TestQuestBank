lock = 0;
var doc_width = 0,
    dp_top = 0;

$(document).on('ready', function () {
    $('#mainPromoSlider').slick({
        autoplay: true,
        autoplaySpeed: 7000
    }); // слайдер на главной
    $('#callback-toogle_menu').callbackToogleMenu(); // mini-dropdown в шапке
    $('#more-toogle_menu').callbackToogleMenu();
    $('#feedback-toogle_menu').feedbackToogleMenu(); // mini-dropdown в шапке
    $('.slider_calculate-widget').customSlider(); // ползунки

    $('#previewNewsSlider').previewNewsSlider(); // малый слайдер в блоках на главной
    $("#toggle_offices").toggleSwitcher(); // swipe switcher
    $('.b-main_nav_switcher').buttonset();

    $('.js-rating_btn').ajaxMoreBlocks2(); // ajax подгрузка блоков
    $("#js-switcher_city").citiesSubMenu(); // dropdown cities menu
    $("#map_lens").mapLens(); // карта с лупой
    $('.b-title_box').widgetTitleSlide();  // выпадашка для заголовков в блоках на главной
    $('#js-tbl_switcher').tblSwitcher(); // таблица с переключателями 
    $('#list_accordion').accordionList();
    if ($('.search_inp-ajax').length) {
        $('.search_inp-ajax').selectRegion(); // ajax autocomplete
    }
    $('.b-form select:not(.vanilla)').selectmenu({
        change: function (event, ui) {
            var closestForm = $(this).closest('form'),
                closestSelect = $(this);
            if (closestSelect && 'validate' in closestForm && closestForm.validate()) {
                closestForm.validate().element(closestSelect)
            }
        }
    });
    $('.b-form input[type="checkbox"]').button().next().addClass('b-form_checkbox');
    $('.b-form input[type="radio"]').button().next().addClass('b-form_radio');
    $('.b-form').customValidation();
    $('.datepicker').datePickerForm();
    $('.b-callback_bottom').callBackDropdown();
    $('.js-header').siteNavDropdown();  // весь сайт в header top
    $('.num_regexp').regExpNumberInput(); // регэксп через 3 символа
    $('#list_accordion').accordionList(); // accordion "условия кредитования"    

    $('.hint_btn').on('mouseenter', function () {
        $(this).next('.hint_block').stop().slideDown();
    });

    $('.hint_btn').on('mouseleave', function () {
        $(this).next('.hint_block').stop().slideUp();
    });
    //label
    if ($('.label-placeholder').length) {
        $('.label-placeholder').each(function () {
            var input = $(this).children('input').length ? $(this).children('input') : $(this).children('textarea'),
                self = $(this);
            if (input.val() && input.val() != '') {
                $(this).addClass('focus');
            }
            input.on('focusin', function () {
                self.addClass('focus');
            });
            input.on('focusout', function () {
                if (!$(this).val())
                    self.removeClass('focus');
            });
        });
    }
    // masks
    if ($('[data-mask]').length) {
        $('[data-mask]').each(function () {
            if ($(this).data('mask') == 'phone') {
                if (isAndroid()) {
                    $(this).inputmask('+79999999999', {
                        showMaskOnHover: false,
                        clearIncomplete: true
                    });
                } else {
                    $(this).inputmask('+7(999) 999 99 99', {
                        showMaskOnHover: false,
                        clearIncomplete: true
                    });
                }
            } else {
                var mask = "" + $(this).data('mask');
                if (isAndroid()) {
                    mask = mask.replace(/\s/g, '');
                }
                $(this).inputmask(mask, {
                    showMaskOnHover: false,
                    clearIncomplete: true
                });
            }
        });
    }

    // Menu dropdown

    $(".parentMenu").on('mouseenter', function () {
        $(this).children('.childMenu').css('width', $(this).css('width'));
        $(this).children('.childMenu').stop().slideDown();
    });
    $(".parentMenu").on('mouseleave', function () {
        $(this).children('.childMenu').stop().slideUp();
    });

    $('#list_accordion2').accordionList(); // accordion "условия кредитования"
    $('#list_accordion3').accordionList(); // accordion "условия кредитования"

    $('.list_accordion_next').accordionList();

    $('.tab_nav_list li').on('click', function () {
        $('.tab_nav_list li').removeClass('active');
        var tab_n = '.tab.' + $(this).attr('class');
        $('.tabbed .tab').hide();
        $('.tabbed').find(tab_n).show();
        $(this).addClass('active');
    });

    $(document).on('click', '.change_rate_btn .pseudo', function () {
        $('.change_rate .n_1').fadeToggle();
        $('.b-widget_type-5 .currencyRatesSubtitle').fadeToggle();
        $('.b-widget_type-5 .cardsSubtitle').toggleClass('show');

        $('.change_rate .n_2').fadeToggle();
        $('.change_rate_btn .n_1').fadeToggle();
        $('.change_rate_btn .n_2').fadeToggle();
    });

    /*function main_change() {
        var val = $('#testregion option:selected').val(),
            selector = '#testcities option[main-value="' + val + '"]';
        $('#testcities option').removeAttr('selected').hide();
        $(selector).show();
        $(selector + ':first').attr('selected', 'selected');
    }

    $(function() {
        $('.ui-selectmenu-button').on('click', main_change);
        main_change();

    });*/
    $(function () {
        $("#region1 #testcities").selectmenu();

        $("#region1 #testregion").selectmenu({
            change: function (event, ui) {
                var self = this;
                alert(self);
                main_elemnt = ui.item.value;


                alert(main_elemnt);

                $.each($("#region1 #testcities > option"),

                    function () {


                        if (main_elemnt != $("#region1 #testcities > option").val()) {

                            $('#region1 #testcities > option').children().not(main_elemnt).remove();

                            //$(i).remove();

                        }
                        //todo----
                        $("#region1 #testcities").selectmenu();
                    });
            }
        });
    });

    PopUp();

    $('#list_accordion2').accordionList(); // accordion "условия кредитования"
    $('#list_accordion3').accordionList(); // accordion "условия кредитования"

    if (window.PIE) {
        $('.btn, .slider_calculate_radio, .slider_calculate_radio label, .short_list, .badge .text, .b-main_nav_switcher, .ui-button, .full_list, .l-site_nav_close, .b-title_box, .btn_xs, .b-year_slider, .ico, .badge, .b-map_search input, .slick-prev, .slick-next, .ui-slider-horizontal, .ui-slider-handle, .slider_calculate label, .slider_calculate input, .l-social_lnk, .l-calculate_ico, .calculate_category, .b-calculate_add_ico, .slider_calculate_inner input, .b-list.type_2 .b-list_item .icomoon, .b-callback_info .icomoon').each(function () {
            PIE.attach(this);
        });
    }

    MenuMove();

    $('.continueForm').click(function () {
        $('.loginForm').toggle();
    });

    $('.btn.loader').loaderBtn();

    if ($('.p2ptransfer .btn.p2p').length) {
        $('.p2ptransfer .btn.p2p').on('click keyup', function () {
            /**
             * Обработка результата
             */
            var p2pSum = $('#amountp2p').val();
            var responseChecker = function () {
                $.ajax({
                    method: "POST",
                    url: "/ajax/p2p.php",
                    data: {'sum': p2pSum},
                    beforeSend: function (xhr) {
                        xhr.overrideMimeType("text/plain; charset=x-user-defined");
                        // $('.progress').html('Идет проверка оплаты...');
                    }
                })
                    .done(function (data) {
                        if (data) {
                            data = jQuery.parseJSON(data);
                            if (data.formUrl) {
                                document.location.href = data.formUrl;
                            }
                        }
                    });
            }
            responseChecker();
            // var periodicalResponseChecker = setInterval(responseChecker,3000);

        });
    }

    doc_width = $(document).width();
    var ct_status = 'desktop',
        ct_block = $('.b-callback_bottom_dropdown table, .b-callback_bottom table'),
        ct_func = function () {
            if (ct_block.length !== 0) {
                ct_block.each(function () {
                    var ct_lines = [];
                    $('tr', this).each(function (y) {
                        $('td', this).each(function (i) {
                            if (typeof ct_lines[i] != 'object') {
                                ct_lines[i] = [];
                            }
                            ct_lines[i][y] = $(this).html();
                        });
                    });
                    var ct_html = '<ul class="b-colback_cols">';
                    $.each(ct_lines, function (i) {
                        ct_html += '<li>' + ct_lines[i][2] + ct_lines[i][0] + ct_lines[i][1];
                        if (ct_lines[i][3] != '' && ct_lines[i][3] !== undefined) {
                            ct_html += '<div class="add_num">' + ct_lines[i][3].split('<br>').join(' ') + '</div>';
                        }
                        ct_html += '</li>';
                    });
                    ct_html += '</ul>';
                    $('p.b-callback_subinfo', $(this).parent()).before(ct_html);
                    $('ul.b-colback_cols', $(this).parent()).hide();
                });
            }
        },
        ct_check = function () {
            if (doc_width > 1037 && ct_status != 'desktop') {
                ct_block.show();
                $('ul.b-colback_cols').hide();
                ct_status = 'desktop';
                dp_top = 0;
            } else if (doc_width > 679 && doc_width <= 1037 && ct_status != 'tablet') {
                ct_block.hide();
                $('ul.b-colback_cols').show();
                ct_status = 'tablet';
                dp_top = 49;
            } else if (doc_width <= 679 && ct_status != 'mobile') {
                ct_block.hide();
                $('ul.b-colback_cols').show();
                ct_status = 'mobile';
                dp_top = 49;
            }
        };
    ct_func();
    ct_check();
    $(window).resize(function () {
        doc_width = $(document).width();
        ct_check();
    });

    $('table.tbl-switcher, table.catalog-items, table.reports, table.noborders, table.tbl-map_result, table.tablejurist, table#inner, table.acquiring_table').wrap('<div class="table-wrap"></div>');
    $('.b-cities_sub > .wrapper').prepend('<div class="b-cities_filter"><input type="text" placeholder="Введите свой город" /></div>');
    $('.b-cities_sub > .wrapper > .b-cities_menu').append('<div class="b-cities_notfound">Ничего не найдено</div>');

    jQuery.expr[':'].Contains = function (a, i, m) {
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };
    $('.b-cities_filter input').change(function () {
        var filter = $(this).val(),
            f_parent = $(this).parent().parent(),
            list = $('.b-cities_menu > .b-cities_col .city', f_parent);
        if (filter) {
            $(list).find("a:not(:Contains(" + filter + "))").parent().slideUp();
            $(list).find("a:Contains(" + filter + ")").parent().slideDown();
            if ($(list).find("a:Contains(" + filter + ")").length == 0) {
                $('.b-cities_menu > .b-cities_notfound', f_parent).slideDown();
            } else {
                $('.b-cities_menu > .b-cities_notfound', f_parent).slideUp();
            }
        } else {
            $(list).find("a").parent().slideDown();
        }
        return false;
    }).keyup(function () {
        $(this).change();
    });


// сообщения для валидации
    if (typeof $.validator == 'function') {
        $.extend($.validator.messages, {
            required: "Это поле необходимо заполнить.",
            remote: "Пожалуйста, введите правильное значение.",
            email: "Пожалуйста, введите корректный адрес электронной почты.",
            url: "Пожалуйста, введите корректный URL.",
            date: "Пожалуйста, введите корректную дату.",
            dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
            number: "Пожалуйста, введите число.",
            digits: "Пожалуйста, вводите только цифры.",
            creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
            equalTo: "Пожалуйста, введите такое же значение ещё раз.",
            extension: "Пожалуйста, выберите файл с правильным расширением.",
            maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
            minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
            rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
            range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
            max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
            min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
        });

        $.validator.addMethod("cyrillic", function (value, element) {
            return this.optional(element) || /^[а-яёА-ЯЁ ]+$/.test(value);
        }, "Пожалуйста, вводите только кириллицу");

        $.validator.addMethod("phone", function (value, element) {

            if (!value) return true;
            var rawPhone = value.replace(/[^0-9]/g, '');

            if (rawPhone.length == 11 && rawPhone.indexOf(7) === 0)
                rawPhone = rawPhone.substr(1, 10);

            if (rawPhone.length !== 10) {
                return false;
            }
            if (rawPhone.match(new RegExp(rawPhone.substr(0, 1), 'g')).length >= 10) {
                return false;
            }
            return this.optional(element) || true;
        }, "Пожалуйста, введите корректный номер телефона");

        $('[data-validation]').each(function () {
            var self = $(this),
                rules = $(this).data('validation').split(',');
            for (var i in rules) {
                if (rules[i].indexOf(':') === -1) {
                    rules[i] = rules[i] + ":true";
                }
            }
            rules = JSON.parse('{"' + rules.join(',"').split(':').join('":') + '}');
            setTimeout(function () {
                self.rules('add', rules);
            }, 0);
        });
    }

    $('.tbl-mobile').each(function () {
        var tbl = $(this);
        $('.tm-title', tbl).on('click', function () {
            $('.tm-title', tbl).removeClass('active');
            $(this).addClass('active');
        });
    });


    $('.toggle-switcher .switcher').each(function () {
        var self = $(this);
        if (window.location.pathname === "/landing/rko3/" || window.location.pathname === "/landing/rko/" || window.location.pathname === "/landing/rko-partners/" || window.location.pathname === "/landing/rkoworker/" || window.location.pathname === "/landing/reg/anketaForm/") {
            self.slider({
                value: typeof self.data('val') != 'undefined' ? self.data('val') : 1,
                min: 0,
                max: 5,
                step: 1,
                create: function () {
                    $('.toggle-switcher .switcher-wrap, .toggle-switcher .switcher .ui-slider-handle').on('click', function () {
                        var val = ($('.switcher', $(this).closest('.toggle-switcher')).slider('option', 'value') + 1) % 3;
                        $('.switcher', $(this).closest('.toggle-switcher')).slider('option', 'value', val);

                    });
                }
            });
        } else {
            self.slider({
                value: typeof self.data('val') != 'undefined' ? self.data('val') : 1,
                min: 0,
                max: 1,
                step: 1,
                create: function () {
                    $('.toggle-switcher .switcher-wrap, .toggle-switcher .switcher .ui-slider-handle').on('click', function () {
                        var val = $('.switcher', $(this).closest('.toggle-switcher')).slider('option', 'value') == 1 ? 0 : 1;
                        $('.switcher', $(this).closest('.toggle-switcher')).slider('option', 'value', val);
                    });
                }
            });
        }
    });

    $('.toggle-switcher .switcher').on('slidechange', function (e, ui) {
        var parent = $(this).closest('.toggle-switcher'),
            first = parent.find('[data-val=0]'),
            last = parent.find('[data-val=1]');


        parent.find('[data-val].active').find('[type="radio"]').prop('checked', false);
        parent.find('[data-val].active').removeClass('active');
        parent.find('[data-val=' + ui.value + ']').addClass('active');
        parent.find('[data-val=' + ui.value + ']').find('[type="radio"]').prop('checked', true);
    });

    $('.toggle-switcher .opt')
        .on('mouseover', function () {

            if ($(this).hasClass('active')) return false;

            $('.switcher-wrap', $(this).closest('.toggle-switcher')).addClass('hover')
        })
        .on('mouseout', function () {
            $('.switcher-wrap', $(this).closest('.toggle-switcher')).removeClass('hover');
        })
        .on('click', function () {
            $('.switcher-wrap', $(this).closest('.toggle-switcher')).removeClass('hover')

            if ($(this).hasClass('active')) return false;

            if (window.location.pathname === "/landing/rko3/" || window.location.pathname === "/landing/rko/" || window.location.pathname === "/landing/rko-partners/" || window.location.pathname === "/landing/rkoworker/" || window.location.pathname === "/landing/reg/anketaForm/") {
                var val = $(this).attr('data-val');
                $('.switcher', $(this).closest('.toggle-switcher')).slider('option', 'value', val);
                // if (val == 0) {
                //     $('.tariff-h input').val('base_month');
                // }else if (val == 1){
                //     $('.tariff-h input').val('base_year');
                // }else $('.tariff-h input').val('professional');
            } else {
                var val = $('.switcher', $(this).closest('.toggle-switcher')).slider('option', 'value') == 1 ? 0 : 1;
                $('.switcher', $(this).closest('.toggle-switcher')).slider('option', 'value', val);
            }
        });


    $(document).on('mouseup', function () {
        $('.hor-scroll-area.dragging').removeClass('dragging');
    });
    $(document).on('mousemove', '.hor-scroll-area.dragging', function (e) {
        var left = e.pageX - $(this).data('pageX');
        // self.css({left: left});
        $(this).scrollLeft($(this).data('scrollX') - left);
    });
    $(document).on('mousedown', '.hor-scroll-area', function (e) {
        var x = e.pageX;
        $(this).data('pageX', x);
        $(this).data('scrollX', $(this).scrollLeft());
        $(this).addClass('dragging');
        $(this).on('mouseup', function () {
            $(this).removeClass('dragging');
        });
        e.preventDefault();
    })
    $(document).on('change', '.hor-scroll-area .ui-helper-hidden-accessible', function () {
        if ($(this).prop('checked')) {
            $('[name="' + $(this).attr('name') + '"]').parent().find('.scroll-btn').remove()
            $(this).parent().prepend('<i class="scroll-btn scroll-l"></i>');
            $(this).parent().append('<i class="scroll-btn scroll-r"></i>');
        }

    });
    $(document).on('buttoncreate', '.hor-scroll-area [type="radio"]:checked', function () {
        $(this).parent().prepend('<i class="scroll-btn scroll-l"></i>');
        $(this).parent().append('<i class="scroll-btn scroll-r"></i>');
    })
    $(document).on('click', '.hor-scroll-area .scroll-r', function () {
        $(this).parent().next().find('label').trigger('click');
    })
    $(document).on('click', '.hor-scroll-area .scroll-l', function () {
        $(this).parent().prev().find('label').trigger('click');
    })

});

$(window).scroll(MenuMove);


// Popup 
$('body').on('click', '.popup .close, .popup-tcb .close, [popup] .close', function () {
    $(this).closest('.popup').hide();
    $(this).closest('[popup]').hide();
    $(this).closest('.popup-tcb').hide();
})

function PopUp() {
    $('.popup_show').on('click', function (e) {
        var choise = $(this).attr('id');
        var $message = $('body').find('.' + choise);

        $('body').prepend('<div id="popup-fade"></div>');

        if ($message.css('display') != 'block') {
            $message.show();

            var firstClick = true;
            $(document).bind('click.event', function (e) {
                if (!firstClick && $(e.target).closest('.popup_cover').length == 0) {
                    $message.hide();
                    $(document).unbind('click.event');
                    $('#popup-fade').remove();
                }

                $('.close_popup_x').on('click', function () {
                    $message.hide();
                    $(document).unbind('click.event');
                    $('#popup-fade').remove();
                });
                firstClick = false;
            });
        }

        e.preventDefault();
    });

}


// Menu 
function MenuMove() {

    var hh = $("#header").height();
    var ph = $('.b-product_switcher_wrap').height();
    var $nav = $(".js-fixed_nav");

    if ($(window).scrollTop() > hh + ph) {
        $nav.addClass('fixed');
    } else {
        $nav.removeClass('fixed');
    }
}

(function ($) {
    $.fn.loaderBtn = function () {
        return this.each(function () {
            var active = false;
            var $btn = $(this).append('<img src="/ico/ajax-loader.gif" />');
            var onclick = function () {
            };

            this._loaderBtnCallback = function (callback) {
                onclick = $.proxy(callback, this);
            };

            this._loaderBtnState = function (activeState) {
                active = activeState;
                $btn[active ? 'addClass' : 'removeClass']('active');
                return $btn;
            };

            $btn.off('click').on('click', function (e) {
                if (active) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                $btn.loaderBtnState(true);
                onclick(e);
                return true;
            });
        });
    };

    $.fn.loaderBtnCallback = function (callback) {
        return this.each(function () {
            this._loaderBtnCallback(callback)
        });
    };
    $.fn.loaderBtnState = function (activeState) {
        return this.each(function () {
            this._loaderBtnState(activeState)
        });
    };

})(jQuery);

(function ($) {
    $.fn.accordionList = function () {
        var $cont = $(this);

        $cont.accordion({
            header: '.b-list_accordion_h',
            collapsible: true
        })
    }
})(jQuery);

$(window).on('load resize', function () {
    $('.hegiht_adjust').not('.no-clear').heightAdjustment();
});

(function ($) {
    $.fn.accordionList = function () {
        var $cont = $(this);

        $cont.accordion({
            header: '.b-list_accordion_h',
            collapsible: false
        })
    }
})(jQuery);

$(window).on('load resize', function () {
    $('.hegiht_adjust').not('.no-clear').heightAdjustment();
});

(function ($) {
    $.fn.cleanWS = function (options) {
        this.each(function () {
            var iblock = this, par = iblock.parentNode, prev = iblock.previousSibling, next = iblock.nextSibling;
            while (prev) {
                var newprev = prev.previousSibling;
                if (prev.nodeType == 3 && prev.nodeValue) {
                    for (var i = prev.nodeValue.length - 1; i > -1; i--) {
                        var cc = prev.nodeValue.charCodeAt(i);
                        if (cc == 9 || cc == 10 || cc == 32) {
                            prev.nodeValue = prev.nodeValue.slice(0, i);
                        } else {
                            break;
                        }
                    }
                }
                if (prev.nodeType == 8) par.removeChild(prev); // remove comment
                prev = newprev;
            }
            while (next) {
                var newnext = next.nextSibling;
                if (next.nodeType == 3 && next.nodeValue) {
                    while (next.nodeValue.length) {
                        var cc = next.nodeValue.charCodeAt(0);
                        if (cc == 9 || cc == 10 || cc == 32) {
                            next.nodeValue = next.nodeValue.slice(1);
                        } else {
                            break;
                        }
                    }
                }
                if (next.nodeType == 8) par.removeChild(next); // remove comment
                next = newnext;
            }

        });
    };
})(jQuery);


(function ($) {
    $.fn.heightAdjustment = function (options) {
        return this.each(function () {
            var cont = $(this);
            var H = 0, el = $(this).children(), min = parseInt($(this).data('min') || 0);
            el.height('').removeClass('evenlyready');
            el.each(function () {
                if (cont.hasClass('b-nav-container')) {
                    H = Math.max(H, $(this).height(true));
                } else {
                    H = Math.max(H, $(this).height());
                }
            });

            el.height(H < min ? min : H).addClass('evenlyready');
        });
    }
})(jQuery);

(function ($) {
    $.fn.callbackToogleMenu = function () {
        var btn = $(this);

        $('html').on('click', function (e) {
            btn.addClass('closed').removeClass('opened');
        });

        btn.on('click', function (event) {
            event.stopPropagation();
            if (btn.hasClass('closed')) {
                btn.addClass('opened').removeClass('closed');
            } else {
                btn.addClass('closed').removeClass('opened');
            }
        });
    };
})(jQuery);

(function ($) {
    $.fn.feedbackToogleMenu = function () {
        var btn = $(this);

        $('html').on('click', function (e) {
            btn.addClass('closed').removeClass('opened');
        });

        btn.on('click', function (event) {

            event.stopPropagation();

            if (btn.hasClass('closed')) {
                btn.addClass('opened').removeClass('closed');
            } else {
                btn.addClass('closed').removeClass('opened');
            }

        });
    };
})(jQuery);

function isAndroid() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("android") > -1;
}

(function ($) {
    $.fn.customValidation = function () {
        var errors = typeof errorsText == 'undefined' ? {} : errorsText;
        errors = $.extend({
            name: '',
            email: 'email не может содержать кириллицу'
        }, errors);

        return this.each(function () {
            var $form = $(this);
            if (isAndroid()) {
                $('input.phone', $form).inputmask('+79999999999', {
                    showMaskOnHover: false,
                    clearIncomplete: true
                });
            } else {
                $('input.phone', $form).inputmask('(999) 999 99 99', {
                    showMaskOnHover: false,
                    clearIncomplete: true
                });
            }

            $('input.name', $form).inputmask('A{+}', {
                showMaskOnHover: false,
                showMaskOnFocus: false,
                definitions: {
                    'A': {
                        validator: '[А-Я а-я\-]',
                        cardinality: 1,
                        casing: 'upper'
                    }
                },
                onKeyValidation: function (valid) {
                    if (valid === false) {
                        var $cell = $(this).closest('.fieldcell').addClass('error');
                        $('.error-txt', $cell).text(errors.name);
                    }
                }
            }).on('blur', function () {
                $(this).closest('.fieldcell').removeClass('error')
            });

            $('input.email', $form).inputmask({
                alias: 'email',
                showMaskOnHover: false,
                clearIncomplete: true,
                onKeyValidation: function (valid) {
                    if (valid === false) {
                        var $cell = $(this).closest('.fieldcell').addClass('error');
                        $('.error-txt', $cell).text(errors.email);
                    }
                }
            }).on('blur', function () {
                $(this).closest('.fieldcell').removeClass('error')
            });

            $('input.datepicker', $form).inputmask('99.99.9999', {
                showMaskOnHover: false,
                clearIncomplete: true
            });
        });
    };
})(jQuery);

(function ($) {
    var re = /(?=\B(?:\d{3})+(?!\d))/g;

    $.toFloat = function (number) {
        return parseFloat(number.replace(/,/g, '.').replace(/\s+/g, ''));
    };

    $.round = function (number, precision) {
        return Number(Math.round(parseFloat(number) + 'e' + precision) + 'e-' + precision)
    };

    $.formatInput = function (number, precision) {
        return $.round(number, precision || 0).toString().replace(/\s+/g, '').replace(/\./g, ',').replace(re, ' ');
    };

    $.fn.numberInput = function (onChange) {
        return this.each(function () {
            var value = 0;
            var callback = $.proxy(onChange, this);

            $(this).on('keyup', function (e, initial) {
                if (typeof initial == 'undefined') initial = false;

                var newValue = parseInt($(this).val().toString().replace(/\s+/g, '')) || 0;

                if (newValue != value) {
                    $(this).val($.formatInput(newValue));
                    if (typeof callback == 'function' && !initial) callback(newValue, e);
                    value = newValue;
                }
            }).trigger('keyup', true);

            $(this).on('keydown', function (e) {
                // Разрешаем: backspace, пробел, delete, tab и escape
                if (e.keyCode == 46 || e.keyCode == 32 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 ||
                    // Разрешаем: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Разрешаем: home, end, влево, вправо
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // Ничего не делаем
                    return;
                } else {
                    // Обеждаемся, что это цифра, и останавливаем событие keypress
                    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                    }
                }
            });
        });
    };

    $.fn.customSlider = function (conf) {

        conf = $.extend({
            sliderClass: 'slider_calculate-widget',
            displayBorders: true,
            input: false
        }, conf);

        return this.each(function () {
            var min = parseInt(conf.min || $.toFloat($(this).attr('data-min'))),
                max = parseInt(conf.max || $.toFloat($(this).attr('data-max'))),
                minPrefix = (conf.minPrefix || $(this).attr('data-minprefix')) || '',
                maxPrefix = (conf.maxPrefix || $(this).attr('data-maxprefix')) || '',
                vale = parseInt(conf.value || $.toFloat($(this).attr('data-value') || (min + ''))),
                step = parseInt(conf.step || ($.toFloat($(this).attr('data-step') || '1'))),
                $slider = $(this),
                $input = (conf.input === false ? $(this).siblings('input') : $(conf.input)),
                $text = $(this).find('[data-text]').length ? $(this).find('[data-text]') : ($(this).next('[data-text]').length ? $(this).next('[data-text]') : ''),
                arCases = [];

            if ($text.length && $text.data('text') && typeof $text.data('text') == "object") {
                arCases = $text.data('text');
                let maxLen = 0;
                for (let i in arCases) {
                    maxLen = arCases[i].length > maxLen ? arCases[i].length : maxLen;
                }
                $input.css('padding-right', (parseInt($input.css('padding-right')) + maxLen * 2) + 'px');
            }

            if ($slider.hasClass('ui-slider')) $slider.slider('destroy');
            $slider.addClass(conf.sliderClass);

            $slider.slider({
                value: vale,
                min: min,
                max: max,
                step: step,
                create: function (event, ui) {
                    $input.val($.formatInput($(this).slider('value')));
                },
                slide: function (event, ui) {
                    $input.val($.formatInput(ui.value));
                },
                change: function (event, ui) {
                    if (unRange($input.val) != ui.value) $input.val($.formatInput(ui.value));

                    if (conf.displayBorders) {
                        $('.l-slider_val.larr', this).text(minPrefix + $.formatInput($(this).slider('option', 'min')));
                        $('.l-slider_val.rarr', this).text(maxPrefix + $.formatInput($(this).slider('option', 'max')));
                    }
                    if ($text.length && arCases) {
                        $text.text(getTextCaseByNumber(ui.value, arCases));
                    }
                }
            });

            $input.numberInput();
            $input.on('change', function () {
                value = unRange($(this).val());
                $slider.slider('value', value);
            });

            if (conf.displayBorders) {
                $('.l-slider_val', this).remove();
                $('<span />').prependTo($(this)).addClass('l-slider_val larr').text(minPrefix + $.formatInput(min));
                $('<span />').appendTo($(this)).addClass('l-slider_val rarr').text(maxPrefix + $.formatInput(max));
            }
        });
    };

    $.fn.setVal = function (val) {
        if (this.slider('value') != val && val >= this.slider('option', 'min') && val <= this.slider('option', 'max')) {
            this.slider('value', val);
            $(this).siblings('input').val(Range(val));
        }
        return this;
    };
    $.fn.setMin = function (min) {
        if (this.slider('value') < min) {
            this.slider('value', min);
            $(this).siblings('input').val(Range(min));
        }
        this.slider('option', 'min', min);
        this.data('min', min);
        this.find('.larr').text(Range(min));
        return this;
    };
    $.fn.setMax = function (max) {
        if (this.slider('value') > max) {
            this.slider('value', max);
            $(this).siblings('input').val(Range(max));
        }
        this.slider('option', 'max', max);
        this.data('max', max);
        this.find('.rarr').text(Range(max));
        return this;
    };

    $.fn.timeSlider = function (conf) {
        conf = $.extend({
            sliderClass: 'res__slider time-slider',
            values: [],
            value: false,
            change: function () {
            }
        }, conf);

        if (!conf.values.length) return this;

        if (typeof conf.displayValues == 'undefined') conf.displayValues = conf.values;
        var valueWidth = (100 / (conf.values.length - 1)) + '%';
        var valueMargin = (100 / (conf.values.length - 2) + 5) + 'px';
        var valueWidthLR = (50 / (conf.values.length - 1)) + '%';

        return this.each(function () {
            var $slider = $(this);
            var value = 0;

            if (conf.value !== false) {
                value = $.inArray(conf.value, conf.values);
                if (value < 0) value = 0;
            }

            if ($slider.hasClass('ui-slider')) $slider.slider('destroy');
            $slider.addClass(conf.sliderClass);

            $slider.slider({
                max: conf.values.length - 1,
                value: value,
                slide: function (e, ui) {
                    conf.change(conf.values[ui.value]);
                },
                change: function (e, ui) {
                    conf.change(conf.values[ui.value]);
                }
            });

            $slider.next('.res__scale').remove();
            var $values = $('<ul class="res__scale"></ul>').insertAfter($slider);
            $.each(conf.displayValues, function (i, value) {

                var $elem =
                    $('<li>' + value + '</li>')
                        .css('width', valueWidth)
                        .appendTo($values);

                $elem.on('click', function () {
                    $slider.slider('value', i);
                })
            });

            $('li', $values).last().addClass('last').css('width', valueWidthLR);
            $('li', $values).first().css('width', valueWidthLR);

            $values.next('.res_convert__scale').remove();

            var $values_convert = $('<ul class="res_convert__scale"></ul>').insertAfter($values);
            $('.res_convert__scale').css('display', 'inline-flex');
            $('.res_convert__scale').css('position', 'absolute');
            $.each(conf.displayValues, function (i, value) {
                $value_month_year = Math.round(value / 30);
                if ($value_month_year > 12) {
                    $value_month_year = ($value_month_year / 12).toFixed(1);
                    if ($value_month_year != 1.5) $value_month_year = Math.round($value_month_year);
                    if ($value_month_year == 1) $value_month_year += ' год';
                    else if ($value_month_year < 5) $value_month_year += ' года';
                    else $value_month_year += ' лет';
                } else $value_month_year += ' мес';

                var $elem =
                    $('<li class="li_month">' + $value_month_year + '</li>').css('width', '50px').appendTo($values_convert);

                $elem.on('click', function () {
                    $slider.slider('value', i);
                })
            });
            $('.li_month', $values_convert).css('margin-right', valueMargin);
            $('.li_month', $values_convert).last().addClass('last').css('position', 'absolute');
            $('.last', $values_convert).css('margin-left', '355px');
            $('.last', $values_convert).css('', '355px');


            // $('li_month', $values).last().addClass('last').css('width', valueWidthLR);
            // $('.li_month', $values_convert).first().addClass('first').css('margin-left', '0px');
            // $('.li_month', $values_convert).css('padding-right', '2%');
            // $('.li_month', $values_convert).css('padding-top', '10px');
            $('.li_month', $values_convert).css('margin-top', '-70px');
        });
    };

    $.getSliderAttr = function ($slider) {
        return {
            min: parseInt($slider.slider('option', 'min')),
            max: parseInt($slider.slider('option', 'max')),
            step: parseInt($slider.slider('option', 'step')),
            value: parseInt($slider.slider('value'))
        };
    };
    // Работа с матрицей ставок
    $.rateMatrix = function (values) {
        if (!values.length) return false;

        var matrix = {
            matrix: values
        };

        matrix.limits = function () {
            var result = {};
            var from, to, value;

            $.each(this.matrix, function (i, row) {
                if (row.from.length) {
                    from = $.toFloat(row.from);
                    if (typeof result.rmin == 'undefined' || from < result.rmin) result.rmin = from;
                }

                if (row.to.length) {
                    to = $.toFloat(row.to);
                    if (typeof result.rmax == 'undefined' || to > result.rmax) result.rmax = to;
                }

                $.each(row.cols, function (k, col) {
                    if (col.from.length) {
                        from = $.toFloat(col.from);
                        if (typeof result.cmin == 'undefined' || from < result.cmin) result.cmin = from;
                    }

                    if (col.to.length) {
                        to = $.toFloat(col.to);
                        if (typeof result.cmax == 'undefined' || to > result.cmax) result.cmax = to;
                    }

                    if (col.value.length) {
                        value = $.toFloat(col.value);
                        if (typeof result.rateMin == 'undefined' || value < result.rateMin) result.rateMin = value;
                        if (typeof result.rateMax == 'undefined' || value > result.rateMax) result.rateMax = value;
                    }
                });
            });

            return result;
        };

        matrix.search = function (rowValue, colValue, emptyAlias) {
            if (typeof emptyAlias == 'undefined') emptyAlias = false;
            var rate = false;
            $.each(this.matrix, function (i, row) {
                if (
                    !(!row.to.length || $.toFloat(row.to) >= rowValue) ||
                    !(!row.from.length || $.toFloat(row.from) <= rowValue)
                ) return;

                $.each(row.cols, function (j, col) {
                    if (
                        (!col.to.length || $.toFloat(col.to) >= colValue) &&
                        (!col.from.length || $.toFloat(col.from) <= colValue)
                    ) rate = col.value.length ? ($.toFloat(col.value) / 100) : emptyAlias;
                });
            });

            return rate;
        };

        return matrix;
    };

    $.rateMatrixDep = function (values) {
        if (!values.length) return false;

        var matrix = {
            matrix: values
        };

        matrix.search = function (rowValue, colValue, oneDelay, emptyAlias) {
            if (typeof oneDelay == 'undefined') oneDelay = false;
            if (typeof emptyAlias == 'undefined') emptyAlias = false;
            var rate = false,
                delay = false;
            colValue = colValue * 32;
            if (oneDelay) colValue = oneDelay;
            $.each(this.matrix, function (i, row) {
                if ($.toFloat(row.to) != $.toFloat(row.from)) {
                    if (
                        !(!row.to.length || $.toFloat(row.to) >= rowValue) ||
                        !(!row.from.length || $.toFloat(row.from) <= rowValue)
                    ) {
                        return;
                    }
                } else {
                    if (
                        !(!row.to.length || $.toFloat(row.to) <= rowValue)
                    ) {
                        return;
                    }
                }

                $.each(row.cols, function (j, col) {
                    if (
                        ((!col.to.length || $.toFloat(col.to) >= colValue) &&
                            (!col.from.length || $.toFloat(col.from) <= colValue)) ||
                        ((!col.to.length || $.toFloat(col.to) >= (colValue - 30)) &&
                            (!col.from.length || $.toFloat(col.from) <= (colValue - 30))) ||
                        ((!col.to.length || $.toFloat(col.to) >= (colValue + 30)) &&
                            (!col.from.length || $.toFloat(col.from) <= (colValue + 30)))
                    ) {
                        rate = col.value.length ? ($.toFloat(col.value) / 100) : emptyAlias;
                        delay = $.toFloat(col.to);
                        return false;
                    } else if ((row.cols.length - 1) == j &&
                        (
                            (!col.to.length || $.toFloat(col.to) <= colValue) ||
                            (!col.to.length || $.toFloat(col.to) <= (colValue - 30)) ||
                            (!col.to.length || $.toFloat(col.to) <= (colValue + 30))
                        )
                    ) {
                        rate = col.value.length ? ($.toFloat(col.value) / 100) : emptyAlias;
                        delay = $.toFloat(col.to);
                        return false;
                    }
                });
            });

            return [rate, delay];
        };

        return matrix;
    };

})(jQuery);


(function ($) {
    $.fn.previewNewsSlider = function () {
        var cont = $(this);

        cont.slick({
            dots: true
        });

        $('.dots-length', cont).remove();

        var dots = $('.slick-dots', cont),
            dotsLng = $('.slick-dots li', cont).length;

        dots.append('<li class="dots-length">' + dotsLng + '</li>');
    };
})(jQuery);

(function ($) {
    $.fn.yearSlider = function (options) {
        var defaults = {
            lnk: '.l-year_lnk',
            items: '.l-year'
        };

        return this.each(function () {
            var conf = $.extend(defaults, options);
            var $this = $(this);

            $this.slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 600,
                variableWidth: true,
                focusOnSelect: true,
                initialSlide: $(conf.items, $this).index($(conf.items + '.active', $this))
            });

            $('.slick-slide', $this).on('click', function (e) {
                e.preventDefault();
                $('input[type="hidden"]', $this).val($(conf.lnk, this).text());
                $this.closest('form').submit();
            });
        });
    }
})(jQuery);

var ajaxComponent = function (sequence, options) {
    if (typeof options.query == 'undefined') {
        options.query = {};
    } else {
        if (typeof options.query != 'object') return;
    }
    options.query.sequence = sequence;

    $.get('/ajax/component.php?ajax=y&' + $.param(options.query), options.callback);
};

var ajaxFunction = function (sequence, options) {
    options = options || {};
    if (typeof options.data == 'undefined') {
        options.data = [];
    } else {
        if (typeof options.data != 'object') return;
    }
    $.post('/ajax/function.php', {sequence: sequence, data: options.data}, options.callback);
};

(function ($) {
    $.fn.ajaxNavigation = function (options) {
        var defaults = {
            nav: '.b-more_news',
            btn: '.ajax_news',
            content: '.b-news_list',
            sequence: 'nav',
            callback: function () {
            }
        };

        return this.each(function () {
            var conf = $.extend(defaults, options);
            var $this = $(this);

            var loadPage = function (e) {
                e.preventDefault();

                var query = {};
                $.each(this.search.slice(1).split('&'), function (i, pair) {
                    pair = pair.split('=');
                    query[pair[0]] = decodeURIComponent(pair[1] || '');
                });

                ajaxComponent(conf.sequence, {
                    query: query,
                    callback: function (data) {
                        var $data = $(data);

                        conf.callback($data);
                        $(conf.content, $this).last().after($data.find(conf.content));

                        var loc = document.location.href.split('/');
                        if (loc[5] != 'news' && loc[4] != 'tenders') {
                            $($(conf.content, $this)[0]).append($($(conf.content, $this)[1]).html());
                            $($(conf.content, $this)[1]).remove();
                        }


                        $(conf.btn, $data).on('click', loadPage);
                        $(conf.nav, $this).replaceWith($data.find(conf.nav));
                    }
                });
            };

            $(conf.btn, $this).on('click', loadPage);
        });
    };
})(jQuery);

(function ($) {

    $.fn.fullNews = function (options) {
        var defaults = {
            news: '.l-news_item',
            expander: '.l-news_title, .news_hider',
            detail: '.news_cut'
        };

        return this.each(function () {
            var $list = $(this);
            var conf = $.extend(defaults, options);

            $(conf.news, $list).each(function () {
                var $news = $(this);

                $(conf.expander, $news).addClass('ready');
                $(conf.expander, $news).on('click', function (e) {
                    e.preventDefault();

                    $(conf.detail, $news)
                        .finish()
                        .toggleClass('active')
                        .slideToggle(500);
                });
            });
        });
    };
})(jQuery);

(function ($) {

    $.fn.ajaxExpander = function (args) {

        return this.each(function () {
            var that = $(this),
                conf = $.extend({}, $.fn.ajaxExpander.defaults, args, that.data('ajaxExpander')),
                parent = conf.parent,
                lnk = $(conf.link, that),
                hider = $(conf.hider, that),
                ajaxCnt = $(conf.ajaxCnt, that),
                cut = $(conf.cut, that),
                b = $('body');

            init();

            function init() {
                bindLinkClick();
                bindHiderClick();
            };


            function bindLinkClick() {
                lnk
                    .off('click.ajaxExpander')
                    .on('click.ajaxExpander', that, function (e) {
                        e.preventDefault();

                        var el = $(this),
                            url = el.attr('href');

                        if (el.hasClass('active')) {
                            clearAll();
                            return;
                        }

                        loadIntoCut(el, url);

                        el.add(lnk.filter('[href="' + url + '"]')).addClass('active');

                    });
            };

            function bindHiderClick() {
                hider
                    .off('click.hider')
                    .on('click.hider', that, function (e) {
                        e.preventDefault();
                        clearAll();
                    });
            };

            function loadIntoCut(el, url) {
                var curCut = el.closest(parent).find(cut),
                    curAjaxCnt = curCut.find(conf.ajaxCnt);

                clearAll();

                b.addClass('wait');

                $.ajax(url)
                    .always(function () {
                        b.removeClass('wait');
                    })
                    .fail(function (data) {
                        log('failed to load:', data);
                    })
                    .success(function (data) {
                        curAjaxCnt.html(data);

                        curCut.finish().slideDown(500);

                        if (curCut.is(':visible')) {
                            curCut.addClass('active');
                        }
                    });
            };

            function clearAll() {
                lnk
                    .filter('.active')
                    .removeClass('active');

                cut
                    .filter('.active')
                    .finish()
                    .slideUp(500, function () {
                    });

                if (cut.is(':hidden')) {
                    cut.removeClass('active');
                }
                ajaxCnt.html('');
            };

        });

    };

    $.fn.ajaxExpander.defaults = {
        link: '.link',
        cut: '.cut',
        hider: '.hider',
        parent: 'li',
        ajaxCnt: '.ajax-cnt'
    };

})(jQuery);

(function ($) {
    $.fn.ajaxMoreBlocks = function () {
        var btn = $(this); //

        btn.click(function (e) {
            e.preventDefault();
            var a = $(this),
                PREVBLOCK = $('.b-widget');
            HISTORYCOVER = $('.b-history_cover'),
                blockLeft = $('.b-history_left', HISTORYCOVER),
                blockRight = $('.b-history_right', HISTORYCOVER);

            $.ajax({
                url: a.attr('href'),
                method: 'GET',
                success: function (html) {
                    PREVBLOCK.append(html).fadeIn('slow');

                    var left = $(html).filter('.b-history_left').find('.b-history_list');
                    var right = $(html).filter('.b-history_right').find('.b-history_list');

                    blockLeft.append(left).fadeIn('slow');
                    blockRight.append(right).fadeIn('slow');
                }
            });
            return false;
        });
    }
})(jQuery);

(function ($) {
    $.fn.ajaxMoreBlocks2 = function () {
        var btn = $(this); //

        btn.click(function (e) {
            e.preventDefault();
            var a = $(this),
                RATING = $('.js-rating');


            $.ajax({
                url: a.attr('href'),
                method: 'GET',
                cache: false,
                success: function (html) {
                    var $html = $(html);

                    $html.filter('li:first').css({'clear': 'left'});
                    RATING.append($html).fadeIn('slow');
                }
            });
            return false;
        });
    }
})(jQuery);


(function ($) {
    $.fn.toggleSwitcher = function ($toToggle, disableSlider) {
        if (typeof disableSlider == 'undefined') disableSlider = false;
        var $switchBl = $(this);

        $switchBl.toggleSwitch({
            highlight: true, // default
            width: 40, // default
            start: function (e) {
            },
            change: function (e) {
                if (typeof $toToggle == 'object') $toToggle.toggle();
            },
            stop: function (e, val) {
                // default null
            }
        });

        if (disableSlider) $switchBl.next('.ui-toggle-switch').find('> .ui-slider').off();
    };
})(jQuery);


(function ($) {
    $.fn.citiesSubMenu = function () {
        var $cont = $(this), // #js-switcher_city
            $btn = $('.pseudo', $cont);

        $btn.on('click', function () {
            $cont.parent().toggleClass('city_active').next('.b-cities_sub').addClass('active').finish().slideToggle();
        })
    }
})(jQuery);

// Map lens

(function ($) {
    $.fn.mapLens = function () {

        $("#map_lens").mousemove(function (e) {
            var cur_x = e.pageX - $("#map_lens").offset().left;
            var cur_y = e.pageY - $("#map_lens").offset().top;

            var cur_w = 1223 / 581;
            var cur_h = 893 / 424;

            var map_pos_x = $("#map_lens .lens").position().left;
            var map_pos_y = $("#map_lens .lens").position().top;

            $('#map_lens .lens').css({
                top: cur_y - 135,
                left: cur_x - 135,
                display: 'block'
            });

            $('#map_lens .lens b').css({
                top: (map_pos_y + 50) * cur_h * -1,
                left: (map_pos_x + 50) * cur_w * -1
            });

            $("#map_lens").mouseleave(function (event) {
                $('#map_lens .lens').hide();
            });


        });
    }
})(jQuery);

(function ($) {
    $.fn.widgetTitleSlide = function () {
        var cont = $(this);

        if (cont.find('.l-mark')) {
            cont.hover(function () {
                var el = $(this).find('.l-mark');
                el.finish().slideToggle(400);
                el.parent('.b-title_box').css('cursor', 'pointer')
            })
        }
    }
})(jQuery);

(function ($) {
    $.fn.tblSwitcher = function () {
        var $cont = $(this),
            $btn = $('label.ui-button', $cont),
            $tbl = $('.tbl-switcher_wrap[data-deposit]');

        $btn.on('click', function () {
            var thatBtn = $(this);

            $tbl.removeClass('active_tbl');

            $tbl.filter(function (index, el) {
                if ($(el).data('deposit') == thatBtn.data('deposit')) {
                    $(el).addClass('active_tbl');
                }
            });

            $('.tbl-switcher_wrap').finish().hide();
            $('.tbl-switcher_wrap.active_tbl').finish().show();
        });
        $('.tbl-switcher_wrap.active_tbl').finish().show();
    }
})(jQuery);

(function ($) {
    $.fn.accordionList = function (active) {
        if (typeof active == 'undefined') active = 0;

        $(this).accordion({
            header: '.b-list_accordion_h',
            heightStyle: "content",
            collapsible: true,
            active: active
        })
    }
})(jQuery);

/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["../widgets/datepicker"], factory);
    } else {

        // Browser globals
        factory(jQuery.datepicker);
    }
}(function (datepicker) {

    datepicker.regional.ru = {
        closeText: "Закрыть",
        prevText: "&#x3C;Пред",
        nextText: "След&#x3E;",
        currentText: "Сегодня",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн",
            "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        dayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        weekHeader: "Нед",
        dateFormat: "dd.mm.yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    datepicker.setDefaults(datepicker.regional.ru);

    return datepicker.regional.ru;

}));
$.datepicker.setDefaults($.datepicker.regional["ru"]);
(function ($) {
    $.fn.datePickerForm = function () {
        $that = $(this);

        if (!$(this).data('placeholder')) $that.attr('placeholder', 'дд.мм.гггг');

        $that.datepicker({
            showOn: "button",
            buttonImage: "/pic/pic_43.png",
            buttonImageOnly: true,
            buttonText: "Выберите дату",
            dateFormat: 'dd.mm.yy',
            onSelect: function () {
                $(this).trigger('blur');
            },
            beforeShow: function (input, inst) {
                var calendar = inst.dpDiv;
                setTimeout(function () {
                    calendar.position({
                        my: 'left top',
                        at: 'right+20 top+' + dp_top,
                        collision: 'none',
                        of: input
                    }).css({
                        'z-index': 4
                    }).addClass('b-form_datepicker');
                }, 1);
            }
        });

        $that.css('z-index', 2);
    }
})(jQuery);

(function ($) {
    $.fn.callBackDropdown = function () {
        var $cont = $(this),
            $btn = $('.b-callback_info', $cont),
            $close = $('.b-callback_close', $cont),
            $dropdown = $('.b-callback_bottom_dropdown', $cont);

        $btn.on('click', function (el) {
            $cont.finish().toggleClass('active');
            $dropdown.finish().slideToggle();
        });

        $close.on('click', function (el) {
            $cont.finish().toggleClass('active');
            $dropdown.finish().slideToggle();
        })
    }
})(jQuery);

(function ($) {

    $.fn.siteNavDropdown = function () {

        var $cont = $(this),
            $btn = $('.js-site_nav_btn', $cont),
            $dropdown = $('.js-site_nav', $cont),
            $close = $('.js-site_nav_close', $cont),
            $label = $('.ui-button', $dropdown),
            $switcher = $('.nav-switcher-block', $dropdown),
            $mainMenu = $('.b-mainmenu .b-mainmenu_list'),
            $burgerMenu = $('.burger-menu'),
            current = 'short_list';

        $('a', $mainMenu).each(function () {
            $(this).data('href', $(this).attr('href'));
        });

        $switcher.slice(1).hide();

        $btn.on('click.siteNav', function () {
            $btn.toggleClass('current');
            $dropdown.slideToggle();
            $close.toggle(400);

            if ($btn.hasClass('current')) {
                $('a', $mainMenu).each(function () {
                    $(this).attr('href', 'javascript:void(0)');
                    $('.b-mainmenu_list').addClass('wrap-burger-switcher');
                    /**/

                    $(".b-mainmenu_list li a").click(function (e) {
                        if ($('.b-mainmenu_list').hasClass('wrap-burger-switcher')) {
                            e.preventDefault();
                            $(".b-mainmenu_list li a").removeClass('active');
                            $(this).addClass('active');
                        } else {
                            return;
                        }
                    });

                    /**/
                    $(this).addClass('burger-switcher');
                });
            } else {
                $('a', $mainMenu).each(function () {
                    $(this).attr('href', $(this).data('href'));
                    $(this).removeClass('burger-switcher');
                });
                /***/
                $(".b-mainmenu_list").removeClass('wrap-burger-switcher');
                $(".b-mainmenu_list li a").removeClass('active');
                /***/
            }


        });

        $label.on('click', function () {
            if (!$(this).hasClass('ui-state-active') || $(this).hasClass(current)) return;
            current = (current == 'short_list') ? 'full_list' : 'short_list';
            $switcher.toggle();
        })

        $close.on('click.siteNavClose', function () {
            $close.toggle(400);
            $btn.toggleClass('current');
            $dropdown.slideToggle();

        });

        $('body').on('click', '.burger-switcher', function () {
            console.log($(this).data('code'));
            if ($('.menu__wrap.active', $burgerMenu).data('code') != $(this).data('code')) {
                $('.menu__wrap.active', $burgerMenu).removeClass('active');
                $('.menu__wrap[data-code="' + $(this).data('code') + '"]', $burgerMenu).addClass('active');
            }
        });

    }
})(jQuery);

(function ($) {
    $.fn.regExpNumberInput = function () {
        var $inp = $(this);

        $(this).on('keyup', function () {
            var pre = $(this).val();
            var text = pre.replace(/\s+/g, '');
            var re = /(?=\B(?:\d{3})+(?!\d))/g;
            $(this).val(text.replace(re, ' '));
        })

    }
})(jQuery);

$(function ($) {
    /*Введение только чисел*/
    $(document).find('.only-number').each(function () {
        $(this).on('keydown', function (event) {
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
                (event.keyCode == 65 && event.ctrlKey === true) ||
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                return;
            } else {
                if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        });
    });

    /*DATEPICKER HACK*/
    $(".datepicker").click(function () {
        $(this).parent().find('.ui-datepicker-trigger').first().click();
    })
})

if (!Object.keys) {
    Object.keys = function (obj) {
        var keys = [];

        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                keys.push(i);
            }
        }

        return keys;
    };
}

function unRange(dec) {
    dec = dec ? dec : '';
    dec = dec.toString();
    return dec.length ? parseInt(dec.replace(/[^\d]/g, '')) : '';
}

function Range(dec) {
    dec = dec.toString();
    dec = dec.replace(/[^\d]/g, '');
    if (dec.length <= 3) return dec;
    var cel = Math.floor(dec.length / 3);
    var ost = dec.length % 3;
    if (cel > 0) {
        var newdec = dec.substr(0, ost);
        dec = dec.substr(ost);
        for (var k = 0; k < cel; k++) {
            newdec += ' ' + dec.substr(k * 3, 3);
        }
        return newdec.replace(/^[^\d]/, '');
    }
}

function pluralForm(number, titles) {
    number = parseInt(number);
    if (typeof titles == 'object') titles = [titles['pluralOne'], titles['pluralTwo'], titles['pluralN']];
    var cases = [2, 0, 1, 1, 1, 2];
    return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]];
}

function months2Days(months) {
    var d = new Date();
    var days = 0;
    for (i = 1; i <= months; i++) {
        d.setMonth(d.getMonth() + 1);
        d.setDate(0);
        days += d.getDate();
        d.setDate(1);
        d.setMonth(d.getMonth() + 1);
    }

    return days;
}

function days2Months(days) {
    var d1 = new Date();
    var d2 = new Date();
    d2.setDate(d1.getDate() + parseInt(days));
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);

}

function getTextCaseByNumber(number, arCases) {
    var cases = [2, 0, 1, 1, 1, 2];
    return arCases[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]];
}

Math.log = (function () {
    var log = Math.log;
    return function (n, base) {
        return log(n) / (base ? log(base) : 1);
    };
})();

// in_array
function in_array(needle, haystack, strict) {

    var found = false, key, strict = !!strict;

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }

    return found;
}

// дней в месяце
Date.prototype.daysInMonth = function () {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};
if (typeof getDescendantProp != 'function') {
    getDescendantProp = function (obj, desc) {
        var arr = desc.split("."), obj = obj[arr.shift()];
        while (arr.length && (obj = obj[arr.shift()])) ;
        return obj;
    }
}

/**
 * Округление
 * @param int n до скольки округлить (1000 по дефолту)
 * @returns {number}
 */
if (!Number.prototype.round) {
    Number.prototype.round = function (n) {
        var n = parseInt(n) || 1000;
        return Math.round(this / n) * n;
    }
}
/**
 * Округление в меньшую сторону
 * @param int n до скольки округлить (1000 по дефолту)
 * @returns {number}
 */
if (!Number.prototype.floor) {
    Number.prototype.floor = function (n) {
        var n = parseInt(n) || 1000;
        return Math.floor(this / n) * n;
    }
}
/**
 * Округление в б0льшую сторону
 * @param int n до скольки округлить (1000 по дефолту)
 * @returns {number}
 */
if (!Number.prototype.ceil) {
    Number.prototype.ceil = function (n) {
        var n = parseInt(n) || 1000;
        return Math.ceil(this / n) * n;
    }
}


function array_combine(keys, values) {	// Creates an array by using one array for keys and another for its values
    //
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    var new_array = {}, keycount = keys.length, i;

    // input sanitation
    if (!keys || !values || keys.constructor !== Array || values.constructor !== Array) {
        return false;
    }

    // number of elements does not match
    if (keycount != values.length) {
        return false;
    }

    for (i = 0; i < keycount; i++) {
        new_array[keys[i]] = values[i];
    }

    return new_array;
}


/**
 extensions
 */
$.fn.setSliderLimits = function (min, max, val) {
    var currMin = $(this).slider('option', 'min'),
        currMax = $(this).slider('option', 'max'),
        val = val || $(this).slider('option', 'value');

    if (currMin == min && currMax == max && val == $(this).slider('option', 'value')) return;

    $(this).slider('option', 'min', min);
    $(this).slider('option', 'max', max);

    if (val < min) val = min;
    else if (val > max) val = max;

    $(this).slider('option', 'value', val);
};


if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}
