var oip = oip || {};

oip.cMortgageCalc = {

    container: '',

    hash: '',
    products: {},
    current: {},

    calcData: {
        calcType: '',
        firstPayment: 0,
        estatePrice: 0,
        monthlyIncome: 0,
        creditSum: 0,
        period: 0,
        salaryProfit: 0,
        tariffProfit: 0,
        gosProfit: 0,
        companyProfit: 0,
        groupInsuranceProfit: 0,
        children: 0,
    },
    calcResult: {},

    creditSum: 0,

    /**
     * DOM elements events
     */
    dom: {
        /**
         *  calc type (income/estate)
         */
        typeSwitcher: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            // text links
            $('[data-type]', container)
                .on('mouseover', function () {

                    if ($(this).hasClass('active')) return false;

                    $('.switcher-wrap', $(this).closest('.type-selector')).addClass('hover')
                })
                .on('mouseout', function () {
                    $('.switcher-wrap', $(this).closest('.type-selector')).removeClass('hover');
                })
                .on('click', function () {
                    $('.switcher-wrap', $(this).closest('.type-selector')).removeClass('hover')

                    if ($(this).hasClass('active')) return false;

                    var val = $('.switcher', $(this).closest('.type-selector')).slider('option', 'value') == 1 ? 0 : 1;
                    $('.switcher', $(this).closest('.type-selector')).slider('option', 'value', val);
                });
            $('[data-product]', container)
                .on('mouseover', function () {

                    if ($(this).hasClass('active')) return false;

                    $('.switcher-wrap', $(this).closest('.type-selector')).addClass('hover')
                })
                .on('mouseout', function () {
                    $('.switcher-wrap', $(this).closest('.type-selector')).removeClass('hover');
                });

            // slider toggle
            $('.estate-income .switcher', container).slider({
                value: self.calcData.calcType == 'income' || self.calcData.calcType == 'zalog' ? 1 : 0,
                min: 0,
                max: 1,
                step: 1,
                change: function (event, ui) {
                    var parent = $(this).closest('.type-selector'),
                        firstType = parent.find('[data-type]:first').data('type'),
                        lastType = parent.find('[data-type]:last').data('type');
                    if (ui.value == 1)
                        self.setCalcType(lastType);
                    else self.setCalcType(firstType);
                },
            });

            // toggle click
            $('.switcher-wrap, .switcher .ui-slider-handle', container).on('click', function () {
                var val = $('.switcher', $(this).closest('.type-selector')).slider('option', 'value') == 1 ? 0 : 1;
                $('.switcher', $(this).closest('.type-selector')).slider('option', 'value', val);
            });
        },
        /**
         * product switch
         */
        productSwitcher: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('[data-product]', container).on('click', function () {
                var product = $(this).data('product');
                if ($(this).hasClass('current') || (!product in self.products)) return false;

                $('[data-product].current', container).removeClass('current');

                self.setCurrProduct(product);

            });
            $('.calc-menu-mobile-select', self.container).on('change', function () {
                $('[data-product].current', container).removeClass('current');
                $('[data-product="' + $(this).val() + '"]', container).addClass('current')
                self.setCurrProduct($(this).val());
            })
        },
        /**
         * switch fp percent/currency
         */
        fpSwitcher: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('.fp-switch', container)
                .on('click', '[data-fp-switch]:not(.active)', function () {
                    self.switchFpSlider();
                });

        },
        /**
         * calc sliders
         */
        sliders: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('.slider[data-calc]', container)
                .each(function () {
                    self.setSliderCalcData($(this));
                })
                .on('slidechange', function (event, ui) {
                    var code = $(this).data('calc'),
                        newVal = ui.value,
                        oldVal = self.calcData[code];

                    if (newVal == oldVal) {
                        event.stopImmediatePropagation();
                        return;
                    }
                    self.setSliderCalcData($(this));
                })
                .on('slide', function (event, ui) {
                });
        },
        firstPaymentSlider: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('.slider[data-calc="firstPayment"]', container)
                .on('slidechange', function (event, ui) {
                    self.calc();
                    /*if(self.calcData.calcType !== 'income') {
                     var inPerc = Math.round((ui.value / self.calcData.estatePrice) * 100);

                     $('[data-fp-val="currency"]').text(Range(ui.value));

                     $('[data-fp-val="percent"]').text(inPerc);

                     if(!self.current.fpType || self.current.fpType == 'currency') {
                     $('.fp-perc .slider', container).slider('option', 'value', inPerc);
                     }
                     } else {
                     self.calc();
                     }*/
                });
            ;

            $('.fp-perc .slider', container)
                .on('slidechange', function (event, ui) {
                    if ('fpType' in self.current && self.current.fpType == 'percent') {
                        var inCurrency = self.calcData.estatePrice * ui.value / 100;
                        $('[data-calc="firstPayment"]').slider('option', 'value', inCurrency);
                    }
                });

        },
        periodSlider: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('.slider[data-calc="period"]', container)
                .on('slidechange', function (event, ui) {
                    var parent = $(this).closest('.slider-wrap'),
                        text = getTextCaseByNumber(ui.value, ['год', 'года', 'лет']);
                    parent.find('.currency').text(text);
                    if (text.length > 3) parent.addClass('long');
                    else parent.removeClass('long');
                    self.calc();
                });
        },
        estatePriceSlider: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('.slider[data-calc="estatePrice"]', container)
                .on('slidechange', function (event, ui) {
                    if (self.calcData.calcType == 'estate') {
                        self.calcProcess = true;
                        self.setFirstPayment();
                        self.calcProcess = false;
                    } else if (self.calcData.calcType == 'summa') {
                        self.limitEstatePriceCreditSum();
                    }
                    if (self.calcData.calcType != 'income') {
                        self.calc();
                    }
                });
        },
        monthlyIncomeSlider: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('.slider[data-calc="monthlyIncome"]', container)
                .on('slidechange', function (event, ui) {
                    if (self.calcData.calcType == 'zalog' || self.calcData.calcType == 'income') {
                        self.calc();
                    }
                });
        },
        creditSumSlider: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('.slider[data-calc="creditSum"]', container)
                .on('slidechange', function (event, ui) {
                    if (self.calcData.calcType == 'summa') {
                        self.calc();
                    }
                });
        },
        /**
         * calc checkboxes
         */
        checkboxes: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('input[type="checkbox"][data-calc]', container)
                .each(function () {
                    self.setCheckboxCalcData($(this));
                })
                .on('change', function () {
                    self.setCheckboxCalcData($(this));
                    self.calc();
                });
        },
        estateTypeSelect: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            $('[name="estateType"]', container).on('selectmenuchange', function (event, ui) {
                self.current.estateType = $(this).val();
                self.setCurrent();
                self.setPeriodLimits(self.current.rates.minPeriod, self.current.rates.maxPeriod);

                switch (self.calcData.calcType) {
                    case 'income':
                        self.setFirstPaymentLimits(self.current.rates.minFirstPayment, self.current.rates.maxFirstPayment);
                        break;
                    case 'summa':
                        self.setEstatePriceLimits(self.current.rates.minEstatePrice, self.current.rates.maxEstatePrice);
                        self.limitEstatePriceCreditSum();
                        break;
                    case 'estate':
                        self.setEstatePriceLimits(self.current.rates.minEstatePrice, self.current.rates.maxEstatePrice);
                        self.setFirstPayment();
                        break;
                    case 'zalog':
                        self.setEstatePriceLimits(self.current.rates.minEstatePrice, self.current.rates.maxEstatePrice);
                        self.limitEstatePriceCreditSum();
                        break;
                    default:

                        break;
                }
                self.calc()
            })

        },
        childrenSelect: function () {
            var self = oip.cMortgageCalc,
                container = self.container;

            self.calcData.children = $('[name="children"]', container).val();
            $('[name="children"]', container).on('selectmenuchange', function (event, ui) {

                self.calcData.children = $(this).val();

                self.calc()
            })

        },
    },

    bind: function () {

        var self = this,
            container = this.container;

        self.setCurrent();
        // self.setInsurance(self.current.product['listGroupInsuranceProfit'], $(this).find(":selected").text());

        $('.slider', container).customSlider();

        /**
         * bind dom events
         */
        self.dom.typeSwitcher();
        self.dom.productSwitcher();
        self.dom.fpSwitcher();

        self.dom.sliders();
        self.dom.firstPaymentSlider();
        self.dom.periodSlider();
        self.dom.estatePriceSlider();
        self.dom.monthlyIncomeSlider();
        self.dom.creditSumSlider();

        self.dom.estateTypeSelect();
        self.dom.childrenSelect();

        self.dom.checkboxes();

        // menu
        $('.calc-menu .other', container).on('click', function () {
            if ($('.calc-menu .bottom .current', container).length && $(this).find('label').hasClass('active')) return false;
            $('.calc-menu .bottom', container).toggleClass('show');
            $(this).find('label').toggleClass('active');
        })

        setTimeout(function () {
            self.setCurrProduct(self.current.productCode);
        }, 0);

        //self.setCalcType(self.current.calcType);

        /**
         * tariff profit
         */

        $('[data-calc="tariffProfit"]', container).on('change', function () {
            if ($(this).prop('checked')) {
                $('.tip.tariff-profit', container).each(function () {
                    $(this).show();
                });

            } else {
                $('.tip.tariff-profit', container).each(function () {
                    $(this).hide();
                });
            }
        });

        /**
         * Form
         */
        container.find('form').validate({
            errorPlacement: function (error, item) {
                var $cell = item.closest('.fieldcell'),
                    $error = $('.error-txt', $cell);
                if (!$error.length) $error = $('<div class="error-txt"></div>').appendTo($cell);
                $error.text(error.text());
            },
            highlight: function (item) {
                $(item).closest('.fieldcell').addClass('error');
            },
            unhighlight: function (item) {
                $(item).closest('.fieldcell').removeClass('error').find('.error-txt').remove();
            }
        });

        container.find('[type="submit"]').on('click', function (e) {
            if ($(this).data('action') == 'dm') {
                self.toDm = true;
            } else self.toDm = false;

            if ($('.captcha-wrap', self.container).is(':visible')) {
                $('.captcha', container).removeClass('no-error');
            }
        });

        $('.calculate').on('click', function () {
            self.calc();
        })
    },
    setCurrent: function () {
        // self.setInsurance(self.current.product['listGroupInsuranceProfit'], $(this).find(":selected").text());
        // this.setInsurance(this.current.product['listGroupInsuranceProfit'], $('#estateType').find(":selected").text());
        if (typeof this.current == 'object' && 'productCode' in this.current) {
            if ('products' in this) {
                this.current.product = this.products[this.current['productCode']];
                this.current.rates = this.current.product['rates'][this.current['estateType']];
            }
            if (this.calcData.calcType == 'summa') {
                this.setCreditSumLimits(this.current.rates.minCreditSum, this.current.rates.maxCreditSum);
            }
        }
        if ($('#estateType').find(":selected").text())
            this.setInsurance(this.current.product['listGroupInsuranceProfit'], $('#estateType').find(":selected").text());
    },
    getFpFromEp: function (ep) {
        var ep = ep || this.calcData.estatePrice,
            matrix = this.current.rates['MATRIX'],
            res = [];

        for (var i in matrix) {
            if (matrix[i].minEstatePrice <= ep && matrix[i].maxEstatePrice >= ep) {

                min = ((ep * matrix[i].minFpPerc) / 100).ceil();
                max = ((ep * matrix[i].maxFpPerc) / 100).floor();

                if (ep - min > matrix[i].to) min = ep - matrix[i].to;
                if (ep - max < matrix[i].from) max = ep - matrix[i].from;


                if (!res['min'] || res['min'] > min) res['min'] = min;
                if (!res['max'] || res['max'] < max) res['max'] = max;
            }
        }
        return res;

    },
    limitEstatePriceCreditSum: function () {
        var self = this,
            minSum = (self.calcData.estatePrice * (parseInt(self.current.rates.minKZ) / 100)).ceil(),
            maxSum = (self.calcData.estatePrice * (parseInt(self.current.rates.maxKZ) / 100)).floor();

        if (minSum < self.current.rates.minCreditSum) {
            minSum = self.current.rates.minCreditSum;
        }
        if (maxSum > self.current.rates.maxCreditSum) {
            maxSum = self.current.rates.maxCreditSum;
        }
        self.setCreditSumLimits(minSum, maxSum);
    },
    setEstatePrice: function () {
        var self = this;
        for (var i in self.current.rates.MATRIX) {
            var minSum = self.current.rates.MATRIX[i]['from'],
                maxSum = self.current.rates.MATRIX[i]['to'];

            if (self.calcData.creditSum >= minSum && self.calcData.creditSum <= maxSum) {
                var minEp = (self.calcData.creditSum * (100 / parseFloat(self.current.rates.MATRIX[i]['maxKZ']))).ceil(),
                    maxEp = (self.calcData.creditSum * (100 / parseFloat(self.current.rates.MATRIX[i]['minKZ']))).floor();

                if (minEp < self.current.rates.minEstatePrice) minEp = self.current.rates.minEstatePrice;
                if (maxEp > self.current.rates.maxEstatePrice) maxEp = self.current.rates.maxEstatePrice;

                self.setEstatePriceLimits(minEp, maxEp);
                return;
            }
        }
    },
    setFirstPayment: function () {
        var fpLimits = this.getFpFromEp(this.calcData.estatePrice),
            minFp = fpLimits['min'],
            maxFp = fpLimits['max'],
            val = $('[data-calc="firstPayment"]').slider('option', 'value');

        if (minFp < this.current.rates['minFirstPayment']) minFp = this.current.rates['minFirstPayment'];
        if (maxFp > this.current.rates['maxFirstPayment']) maxFp = this.current.rates['maxFirstPayment'];


        if (val < minFp) val = minFp;
        else if (val > maxFp) val = maxFp;

        var minFpPerc = (minFp / this.calcData.estatePrice * 100).round(1),
            maxFpPerc = (maxFp / this.calcData.estatePrice * 100).round(1),
            valFpPerc = Math.round(val / this.calcData.estatePrice * 100);

        $('[data-calc="firstPayment"]').slider('option', 'min', minFp);
        $('[data-calc="firstPayment"]').slider('option', 'max', maxFp);

        $('.fp-perc .slider').slider('option', 'min', minFpPerc);
        $('.fp-perc .slider').slider('option', 'max', maxFpPerc);

        $('[data-calc="firstPayment"]').slider('option', 'value', val);
        $('.fp-perc .slider').slider('option', 'value', valFpPerc);
    },
    setInsurance: function (types, curType) {
        elem = $('.checkboxes .mg-group-insurance');
        if (types.length && $.inArray(curType, types) == -1) {
            this.calcData.groupInsuranceProfit = 0;
            $('label', elem).attr('aria-pressed', false);
            $('label ', elem).removeClass('ui-state-active');
            $('input', elem).attr('disabled', true);
            $('.icomoon', elem).css('background', "#b6b6b6");
            $('.txt', elem).css('color', '#dbdbdb');
        } else {
            this.calcData.groupInsuranceProfit = parseFloat(this.current.product['groupInsuranceProfit']);
            $('label', elem).attr('aria-pressed', true);
            $('label', elem).addClass('ui-state-active');
            $('input', elem).attr('disabled', false);
            $('.icomoon', elem).css('background', "");
            $('.txt', elem).css('color', '');
        }
    },
    setEstatePriceLimits: function (min, max, val) {
        this.setSliderLimits($('[data-calc="estatePrice"]', this.container), min, max, val);
    },
    setPeriodLimits: function (min, max, val) {
        this.setSliderLimits($('[data-calc="period"]', this.container), min, max, val);
    },
    setFirstPaymentLimits: function (min, max, val) {
        this.setSliderLimits($('[data-calc="firstPayment"]', this.container), min, max, val);
    },
    setMonthlyIncomeLimits: function (min, max, val) {
        this.setSliderLimits($('[data-calc="monthlyIncome"]', this.container), min, max, val);
    },
    setCreditSumLimits: function (min, max, val) {
        this.setSliderLimits($('[data-calc="creditSum"]', this.container), min, max, val);
    },

    setSliderLimits: function ($slider, min, max, val) {
        var currMin = $slider.slider('option', 'min'),
            currMax = $slider.slider('option', 'max'),
            val = val || $slider.slider('option', 'value');

        if (currMin == min && currMax == max && val == $slider.slider('option', 'value')) return;

        $slider.slider('option', 'min', min);
        $slider.slider('option', 'max', max);

        if (val < min) val = min;
        else if (val > max) val = max;

        $slider.slider('option', 'value', val);
    },

    setEstateTypes: function (list, selected) {
        var self = this;

        $('[name="estateType"]').html('');
        if (!(selected in list)) {
            if ('flat' in list) selected = 'flat';
            else selected = Object.keys(list)[0]
        }

        self.current.estateType = selected;

        for (var i in list) {
            var opt = $('<option/>').val(i).text(list[i]);
            if (i == selected) opt.attr('selected', true);
            $('[name="estateType"]').append(opt);
        }
        if (typeof $('[name="estateType"]').selectmenu("instance") != 'undefined') {
            $('[name="estateType"]').selectmenu("refresh");
        }
    },

    setCheckboxCalcData: function ($chb) {
        if (!$chb.data('calc') in this.calcData) return false;

        if ($chb.prop('checked')) {
            this.calcData[$chb.data('calc')] = $chb.data('value');
            if ($chb.data('calc') == 'gosProfit' || $chb.data('calc') == 'companyProfit') {
                var offChb = $chb.data('calc') == 'gosProfit' ? 'companyProfit' : 'gosProfit',
                    chb = $('input[type="checkbox"][data-calc="' + offChb + '"]', this.container);
                chb.prop('checked', false);
                if (chb.button("instance")) {
                    chb.button('refresh');
                }
                this.setCheckboxCalcData(chb)
            }
        } else this.calcData[$chb.data('calc')] = 0;
    },

    setSliderCalcData: function ($slider) {

        var code = $slider.data('calc');

        if (!$slider.data('calc') in this.calcData) return false;

        this.calcData[code] = unRange($slider.slider('option', 'value'));
    },

    setCurrProduct: function (productCode) {
        var self = this;
        self.calcProcess = true;

        if (!productCode in self.products) return false;

        self.container.removeClass(self.current.productCode);
        self.container.addClass(productCode);

        // product code
        self.current.productCode = productCode;

        // estate Type
        self.setEstateTypes(self.products[productCode]['estateType'], self.current.estateType);


        // current rates and product
        self.setCurrent();

        switch (productCode) {
            case 'support':
                $('[data-type].estate').data('type', 'estate').attr('data-type', 'estate');
                $('[data-type].income').data('type', 'summa').attr('data-type', 'summa');
                break;
            case 'refinancing':
            case 'comfort':
                $('[data-type].estate').data('type', 'summa').attr('data-type', 'summa');
                $('[data-type].income').data('type', 'zalog').attr('data-type', 'zalog');
                break;
            default: // новостройка
                $('[data-type].estate').data('type', 'estate').attr('data-type', 'estate');
                $('[data-type].income').data('type', 'income').attr('data-type', 'income');
                break;
        }

        if (productCode == 'support') {
            $('[data-type].estate').data('text', $('[data-type].estate').text()).text('Приобретение');
            $('[data-type].income').data('text', $('[data-type].income').text()).text('рефинансирование');
        } else {
            $('[data-type].estate').text($('[data-type].estate').data('text'));
            $('[data-type].income').text($('[data-type].income').data('text'));
        }

        $('[data-product-show][data-product-show!="' + productCode + '"]', self.container).addClass('hide');
        $('[data-product-show*="' + productCode + '"]', self.container).removeClass('hide');
        $('[data-product-hide][data-product-hide!="' + productCode + '"]', self.container).removeClass('hide');
        $('[data-product-hide*="' + productCode + '"]', self.container).addClass('hide');
        // calc Type
        var calcType = $('.active[data-type]', self.container).data('type');
        self.calcData.calcType = '';

        // убрали расчет по доходу
        if (productCode == 'refinancing') {
            calcType = 'summa';
            $('.estate-income .switcher', self.container).slider('option', 'value', 0);
            $('.estate-income .switcher-wrap', self.container).hide();
        } else $('.estate-income .switcher-wrap', self.container).show();

        self.setCalcType(calcType);

        // period
        self.setPeriodLimits(self.current.rates.minPeriod, self.current.rates.maxPeriod);

        // tariff profit
        if (!self.products[productCode]['tariffProfit'] || !self.products[productCode]['tariffProfitPerc']) {
            $('[data-calc="tariffProfit"]', self.container).addClass('hide');
            $('.tip.tariff-profit', self.container).addClass('hide');
            $('[data-calc="tariffProfit"]', self.container).data('value', 0);
        } else {
            $('[data-calc="tariffProfit"]', self.container).closest('.fieldcell').removeClass('hide');
            $('[data-calc="tariffProfit"]', self.container).data('value', self.products[productCode]['tariffProfit']);
            self.calcData['tariffProfitPerc'] = self.products[productCode]['tariffProfitPerc'];
        }
        self.setCheckboxCalcData($('[data-calc="tariffProfit"]'));

        var modifiers = ['salaryProfit', 'gosProfit', 'companyProfit', 'groupInsuranceProfit'];
        for (var i in modifiers) {
            // console.log(i);
            if (!self.products[productCode][modifiers[i]]) {
                $('[data-calc="' + modifiers[i] + '"]', self.container).closest('.fieldcell').addClass('hide');
                $('[data-calc="' + modifiers[i] + '"]', self.container).data('value', 0);
            } else {
                $('[data-calc="' + modifiers[i] + '"]', self.container).closest('.fieldcell').removeClass('hide');
                $('[data-calc="' + modifiers[i] + '"]', self.container).data('value', self.products[productCode][modifiers[i]]);
            }
            self.setCheckboxCalcData($('[data-calc="' + modifiers[i] + '"]', self.container));
        }

        // link
        $('.to-product', self.container).attr('href', self.products[productCode]['link']);
        // highlight
        $('.b-mainmenu_item .current', self.container).removeClass('current');
        $('.b-mainmenu_item .current :checked', self.container).prop('checked', false);
        $('.b-mainmenu_item.p-' + productCode + ' .switch-product', self.container).addClass('current');
        $('.b-mainmenu_item.p-' + productCode + ' .switch-product [type="checkbox"]', self.container).prop('checked', true);

        if (productCode != $('.calc-menu-mobile-select', self.container).val()) {
            $('.calc-menu-mobile-select', self.container).val(productCode);
        }
        self.calcProcess = false;
        self.calc();
    },

    calc: function (success) {
        if (this.calcProcess) return;
        $('.wrapper.res', this.container).addClass('loading');
        this.calcProcess = true;

        var self = this,
            percentModifier = -self.calcData.salaryProfit - self.calcData.tariffProfit - self.calcData.gosProfit - self.calcData.companyProfit - self.calcData.groupInsuranceProfit;
        // console.log(percentModifier);
        if (['easy-five', 'easy', 'refinancing'].indexOf(self.current.productCode) != -1) {
            /*if (self.current.estateType == 'apartments') {
                percentModifier += 0.5;
            }
            else */
            if (self.current.estateType == 'country_house' || self.current.estateType == 'room') {
                percentModifier += 1;
            }
        }

        if(Object.keys(this.current.product['bonusCreditRate']).length && this.current.product['bonusCreditRate'][$('#estateType').find(":selected").val()]){
            percentModifier += parseFloat(this.current.product['bonusCreditRate'][$('#estateType').find(":selected").val()]);
        }

        // if (self.current.productCode == 'support') {
        //     percentModifier = 0;
        // }
        $('.vip', self.container).addClass('hide');

        $.ajax({
            url: '/ajax/mg_calc.php',
            method: 'post',
            dataType: 'json',
            data: {
                hash: self.hash,
                product: self.current.productCode,
                type: self.calcData.calcType,
                monthlyIncome: self.calcData.monthlyIncome,
                estatePrice: self.calcData.estatePrice,
                firstPayment: self.calcData.firstPayment,
                period: self.calcData.period * 12,
                matrix: self.current.rates['MATRIX'],
                creditSum: self.calcData.creditSum,
                percentModifier: percentModifier,
                children: self.calcData.children
            },

            success: function (res) {
                if ('data' in res && 'success' in res && res['success'] === true) {
                    data = res.data;
                    var perc = data['percent'] ? data['percent'].toLocaleString() : '-',
                        sum = data['maxCredSum'] || '-',
                        mp = data['monthlyPayment'] || '-',
                        ep = data['estatePrice'] || '-',
                        mi = data['monthlyIncome'] || '-';

                    self.calcResult.creditSum = sum;
                    self.calcResult.monthlyPayment = mp;

                    if (sum >= 20000000 ||
                        (self.current.productCode == 'refinancing' && sum >= 9500000) ||
                        (self.current.productCode == 'comfort' && sum >= 12000000)
                    ) {
                        $('.vip .vipsum').text((self.current.productCode == 'refinancing') ? '9,5' :
                            ((self.current.productCode == 'comfort') ? '12' : '20'));
                        $('.vip', self.container).removeClass('hide');
                    }

                    if (sum >= 20000000) {
                        sumFormat = '20 000 000';
                    } else {
                        sumFormat = Range(sum);
                    }

                    if (ep >= 50000000) {
                        epFormat = '50 000 000';
                    } else {
                        epFormat = Range(ep);
                    }


                    $('.result .perc .num', self.container).text(perc);
                    $('.result .sum .num', self.container).text(sumFormat);
                    $('.result .mp .num', self.container).text(Range(mp));
                    $('.result .ep .num', self.container).text(epFormat);
                    $('.result .mi .num', self.container).text(Range(mi));


                    if (self.calcData.calcType == 'estate') {
                        $('[data-calc="monthlyIncome"]').slider('option', 'value', mi);
                    } else if (self.calcData.calcType == 'income') {
                        self.calcData.estatePrice = ep;
                    } else if (self.calcData.calcType == 'zalog') {
                        $('[data-calc="creditSum"]').slider('option', 'value', sum);
                    } else if (self.calcData.calcType == 'summa') {
                        $('[data-calc="monthlyIncome"]').slider('option', 'value', mi);
                    }

                    if (self.calcData.tariffProfit) {
                        $('.result .tariff-profit .num', self.container).text(Range((sum / 100 * parseFloat(self.products[self.current.productCode].tariffProfitPerc)).ceil()));
                    }

                    if (self.current.productCode == 'support') {
                        if ('cbr' in data) {
                            $('.cbr-payment', self.container).show();
                            $('.calcs .perc .cbr', self.container).show();
                            $('.calcs .perc .cbr .gracePeriod', self.container).text(data.cbr.gracePeriod);
                            $('.calcs .perc .cbr .years', self.container).text(getTextCaseByNumber(data.cbr.gracePeriod, ['год',
                                'года',
                                'лет']));
                            $('.calcs .perc .cbr .perc', self.container).text(data.cbr.percent);
                            $('.cbr-payment .sum', self.container).text(Range(data.cbr.monthlyPayment));
                        } else {
                            $('.cbr-payment', self.container).hide();
                            $('.calcs .perc .cbr', self.container).hide();
                        }
                    }

                } else {
                    $('.result .perc .num', self.container).text('-');
                    $('.result .sum .num', self.container).text('-');
                    $('.result .mp .num', self.container).text('-');
                    $('.result .ep .num', self.container).text('-');
                    $('.result .mi .num', self.container).text('-');
                    $('.result .tariff-profit .num', self.container).text('-');

                    if ('error' in res) {
                        alert(res['error']);
                    }
                }
                if (typeof success == 'function') {
                    success(res);
                }
                self.calcProcess = false;
                $('.wrapper.res', self.container).removeClass('loading');

            }, error: function () {
                self.calcProcess = false;
                $('.wrapper.res', self.container).removeClass('loading');
            }

        })
    },

    setCalcType: function (type) {
        if (this.calcData.calcType == type) return false;

        var self = this,
            container = self.container;

        container.removeClass(function () {
            var toReturn = '',
                classes = this.className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                if (classes[i].indexOf('type-') !== -1) {
                    toReturn += classes[i] + ' ';
                }
            }
            return toReturn;
        });
        container.addClass('type-' + type);

        self.calcData.calcType = type;

        $('[data-type].active', container).removeClass('active');
        $('[data-type="' + type + '"]', container).addClass('active');

        $('[data-type-show][data-type-show!="' + type + '"]', container).addClass('hide');
        $('[data-type-show*="' + type + '"]', container).removeClass('hide');

        switch (type) {
            case 'estate':
                // estate price
                self.setEstatePriceLimits(self.current.rates.minEstatePrice, self.current.rates.maxEstatePrice, self.calcData.estatePrice);
                // first payment
                self.setFirstPayment();
                break;
            case 'income':
                // first payment
                self.setFirstPaymentLimits(self.current.rates.minFirstPayment, self.current.rates.maxFirstPayment);
                // monthly income
                self.setMonthlyIncomeLimits(self.current.rates.minMonthlyIncome, self.current.rates.maxMonthlyIncome);
                //self.switchFpSlider('currency');
                break;
            case 'zalog':
                // estate price
                self.setEstatePriceLimits(self.current.rates.minEstatePrice, self.current.rates.maxEstatePrice, self.calcData.estatePrice);
                // monthly income
                self.setMonthlyIncomeLimits(self.current.rates.minMonthlyIncome, self.current.rates.maxMonthlyIncome);
                break;
            case 'summa':
                // estate price
                self.setEstatePriceLimits(self.current.rates.minEstatePrice, self.current.rates.maxEstatePrice, self.calcData.estatePrice);
                // credit sum
                self.setCreditSumLimits(self.current.rates.minCreditSum, self.current.rates.maxCreditSum);
                self.limitEstatePriceCreditSum();
                break;
        }
    },
    switchCalcType: function (toType) {
        var toType = toType || '';

        if (toType && this.calcData.calcType == toType) return false;

        var self = this,
            from = self.calcData.calcType,
            to = $('[data-type][data-type!="' + from + '"]', self.container).data('type');

        $('[data-type="' + from + '"]').removeClass('active');
        $('[data-type="' + to + '"]').addClass('active');

        self.calcData.calcType = to;

        $('[data-type-show*="' + from + '"]').addClass('hide');

        $('[data-type-show*="' + to + '"]').removeClass('hide');

        if (to == 'income') {
            $('[data-calc="firstPayment"]').slider('option', 'min', self.current.rates['minFirstPayment']);
            $('[data-calc="firstPayment"]').slider('option', 'max', self.current.rates['maxFirstPayment']);

            $('[data-calc="firstPayment"]').slider('option', 'value', $('[data-calc="firstPayment"]').slider('option', 'value'));
            self.switchFpSlider('currency');
        } else if (to == 'estate') {
            $('[data-calc="estatePrice"]').slider('option', 'value', self.calcData.estatePrice);
        }
    },

    switchFpSlider: function (toFpSlider) {
        var self = this,
            container = this.container,
            toFpSlider = toFpSlider || '',
            from = $('[data-fp-switch].active', self.container).data('fp-switch'),
            to = $('[data-fp-switch]:not(.active)', self.container).data('fp-switch');

        if (toFpSlider && from == toFpSlider) return false;

        $('[data-fp-switch="' + from + '"]').removeClass('active');
        $('[data-fp-switch="' + to + '"]').addClass('active');

        $('[data-fp="' + from + '"]').addClass('hide');
        $('[data-fp="' + to + '"]').removeClass('hide');

        self.current.fpType = to;

    },
    sendFormEvents: function () {

        /*ga('send', 'event', 'credits_mortgage_order', 'order');
         yaCounter31783466.reachGoal('credits_mortgage_order');*/

    },
    init: function (container) {
        this.container = container;
        this.bind();
    }

};
$(document).ready(function () {
    oip.cMortgageCalc.init($('[data-js-obj="cMortgageCalc"]'));
});