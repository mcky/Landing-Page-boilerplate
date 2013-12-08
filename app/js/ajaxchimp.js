/*!
Mailchimp Ajax Submit
jQuery Plugin
Author: Siddharth Doshi
*/

(function ($) {
    'use strict';

    $.fn.ajaxChimp = function (options) {
        $(this).each(function(i,el) {
            var form = $(el);
            var email = form.find('input[type=email]');
            var label = form.find('label[for=' + email.attr('id') + ']');

            var settings = $.extend({
                'url': form.attr('action')
            }, options);

            var url = settings.url.replace('/post?', '/post-json?').concat('&c=?');

            form.attr('novalidate', 'true');
            email.attr('name', 'EMAIL');

            form.submit(function () {
                function successCallback(resp) {
                    if (resp.result === 'success') {
                        label.html('We have sent you a confirmation email.');
                        label.removeClass('ajc--error').addClass('ajc--valid');
                        email.removeClass('ajc--error').addClass('ajc--valid');
                    } else {
                        var index = -1;
                        var msg;
                        try {
                            var parts = resp.msg.split(' - ', 2);
                            if (parts[1] === undefined) {
                                msg = resp.msg;
                            } else {
                                var i = parseInt(parts[0], 10);
                                if (i.toString() === parts[0]) {
                                    index = parts[0];
                                    msg = parts[1];
                                } else {
                                    index = -1;
                                    msg = resp.msg;
                                }
                            }
                        }
                        catch (e) {
                            index = -1;
                            msg = resp.msg;
                        }
                        label.html(msg);
                    }

                    label.show(2000);
                    if (settings.callback) {
                        settings.callback(resp);
                    }
                }

                var data = {};
                var dataArray = form.serializeArray();
                $.each(dataArray, function (index, item) {
                    data[item.name] = item.value;
                });

                $.ajax({
                    url: url,
                    data: data,
                    success: successCallback,
                    dataType: 'jsonp',
                    error: function (resp, text) {
                        console.log('mailchimp ajax submit error: ' + text);
                    }
                });
                label.html('Submitting...').show(2000);
                return false;
            });
        });
        return this;
    };
})(jQuery);