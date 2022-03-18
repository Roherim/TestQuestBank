var oip = oip || {};

oip.formMini = function () {
    return {

        form: {},
        container: '',
        removeFormOnSuccess: true,

        bind: function () {

            var self = this,
                form = this.form,
                container = this.container;

            form.validate({
                errorPlacement: function (error, item) {
                    self.showError(error, item)
                },
                highlight: function (item) {
                    $(item).closest('.fieldcell').addClass('error');
                },
                unhighlight: function (item) {
                    $(item).closest('.fieldcell').removeClass('error').find('.error-txt').remove();
                }
            });

            container.find('[type="submit"]').on('click', function (e) {
                self.toDm = $(this).data('action') == 'dm';

                if ($('.captcha', container).length && $('.captcha-wrap', container).is(':visible')) {
                    $('.captcha', container).removeClass('no-error');
                }
            });

            form.on('submit', function (e) {
                e.preventDefault();
                self.sendForm($(this));
            });

            $('.success-popup .close', container).on('click', function () {
                container.removeClass('success');
            });

            $('.show-agree', container).on('click', function () {
                if ($('.agree_text_popup', container).is(':visible'))
                    $('.agree_text_popup', container).slideUp();
                else $('.agree_text_popup', container).slideDown();
            });


            $('.agree-chb', container).on('change', function () {
                if ($(this).prop('checked')) {
                    $('.agree', self.container).removeClass('error');
                }
                if ($(this).prop('checked') == true) {
                    self.showHumanCheck('captcha');
                }
            });

            $('.check-agree', container).on('click', function () {
                if (!$('.agree-chb', container).prop('checked')) {
                    $('.agree-chb', container).prop('checked', true).button('refresh');
                    self.showHumanCheck('captcha');
                }
                $('.agree_text_popup', container).slideUp();
            });


            container.find('[name="FIRSTNAME"]').on('change', function () {
                self.container.find('.success-popup .first_name').text($(this).val());
            });
            container.find('.success-popup .btn').on('click', function () {
                self.container.removeClass('success');
            });
        },
        showError: function (error, item) {
            var $cell = item.closest('.fieldcell'),
                $error = $('.error-txt', $cell);
            if (!$error.length) $error = $('<div class="error-txt"></div>').appendTo($cell);
            let errText = typeof error == 'string' ? error : error.text();
            $error.text(errText);
        },
        showHumanCheck: function (type) {
            var type = type || '', self = this;
            if (type != 'sms' && $('.captcha', this.container).length) {
                if (!$('.captcha-wrap').is(':visible')) {
                    $('.captcha', self.container).addClass('show').addClass('from-btm');
                    setTimeout(function () {
                        $('.captcha-wrap', self.container).slideToggle(250);
                        $('.captcha-wrap input', self.container).focus();
                    }, 200);
                }
            }
            else if (type != 'captcha' && $('.sms-popup', this.container).length) {
                $('.sms-popup', this.container).removeClass('hidden');
            }
        },
        sendForm: function () {
            var self = this,
                container = self.container;

            if (self.formProcess) return false;
            if (!$('.agree-chb', self.container).prop('checked')) {
                $('.agree', self.container).addClass('error');
            }
            if (this.form.valid()) {
                $('.fieldcell.error', this.form).removeClass('error');
                self.formLoading(true);

                var formArray = this.form.serializeArray();
                var data = {};
                for (var i = 0; i < formArray.length; i++) {
                    data[formArray[i]['name']] = formArray[i]['value'];
                }
                data['sendMiniForm'] = 'Y';
                data['formNum'] = container.data('form-num');
                if (typeof self.beforeFormSendEvent == 'function') {
                    var err = {};
                    self.beforeFormSendEvent(data, err);
                    if (!$.isEmptyObject(err)) {
                        if ('errors' in err) {
                            for (let i in err['errors']) {
                                if (!err['errors'][i]['message'] || !err['errors'][i]['field'] || typeof err['errors'][i]['field'] != "object") continue;
                                err['errors'][i]['field'].closest('.fieldcell').addClass('error')
                                self.showError(err['errors'][i]['message'], err['errors'][i]['field']);
                            }
                        }
                        self.formLoading(false);
                        return false;
                    }
                }
                $.ajax({
                    method: 'post',
                    url: window.location.href,
                    data: data,
                    dataType: 'json',
                    success: function (data) {
                        if ('success' in data && data['success'] === true && 'id' in data) {
                            self.container.addClass('success');
                            if (typeof clickId !== 'undefined') {
                                self.container.find('.pixels').html('' +
                                    '<img src="https://tracker.myfin.group/api/orders/tkb_361_cpl?aff=' + clickId + '&type=img&conversion=' + data['id'] + '&status=1" width="1" height="1"/>'
                                    + '<img src="https://tracking.banki.ru/SP2DS?adv_sub=' + data['id'] + '" width="1"  height="1"/>'
                                );
                            }
                            self.container.find('.success-popup .id').text(data['id']);
                            if (self.removeFormOnSuccess) {
                                self.container.find('.form-wrapper').remove();
                                $(".wrappsitytarif").remove();

                            }
                            self.sendFormEvents();
                        }
                        else if ('errors' in data) {
                            for (var k in data['errors']) {
                                var $cell = $('[name="' + k + '"]', self.container).closest('.fieldcell'),
                                    $error = $('.error-txt', $cell);
                                if (!$error.length) $error = $('<div class="error-txt"></div>').appendTo($cell);
                                $error.text(data['errors'][k]);
                                $cell.addClass('error');
                            }
                        }
                        if ('showSms' in data && data['showSms']) {
                            if ($('[name="sendSms"]', self.container).length) {
                                $('[name="sendSms"]', self.container).remove();
                            }
                            self.showHumanCheck('sms');

                            //$('html, body').animate({
                            //    scrollTop: $('.sms-popup', self.container).offset().top - 100
                            //}, 1000);
                        }
                        self.afterFormSendEvent(data);
                        self.formLoading(false);
                    },
                    error: function (data) {
                        self.formLoading(false);
                    }
                });
            }
        },
        formLoading: function (isLoading) {
            var self = this,
                container = self.container,
                $btn = $('[type="submit"]', container);
            self.formProcess = isLoading;
            if (isLoading) {
                container.addClass('loading');
                $btn.prop('disabled', true);
            }
            else {
                container.removeClass('loading');
                $btn.prop('disabled', false);
            }
        },
        // перед отправкой формы
        beforeFormSendEvent: function (data, err) {},
        // после отправки формы
        afterFormSendEvent: function (data) {},
        // после успешной отправки формы
        sendFormEvents: function () {},
        init: function (container) {
            this.container = container;
            this.form = this.container.closest('form');
            this.bind();
            if (container.data('before-form-send-event') && typeof getDescendantProp(window, container.data('before-form-send-event')) == 'function') {
                this.beforeFormSendEvent = getDescendantProp(window, container.data('before-form-send-event'));
            }
            if (container.data('send-form-events') && typeof getDescendantProp(window, container.data('send-form-events')) == 'function') {
                this.sendFormEvents = getDescendantProp(window, container.data('send-form-events'));
            }
            if (container.data('after-form-send-event') && typeof getDescendantProp(window, container.data('after-form-send-event')) == 'function') {
                this.afterFormSendEvent = getDescendantProp(window, container.data('after-form-send-event'));
            }
            if (container.data('remove-form-on-success') === false) {
                this.removeFormOnSuccess = container.data('remove-form-on-success');
            }

        }
    }
};
$(document).ready(function () {
    $('[data-js-obj="formMini"]').each(function () {
        oip.formMini().init($(this));
    });

});
