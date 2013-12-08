function ajc(resp){
    if (resp.result === 'success') {
        $('.mailchimp__form, .page__subscribe--text').hide();
        $('.mailchimp__success').show();
        $('.mailchimp__form--error').removeClass('mailchimp__form--error--active');
    } else {
        $('.mailchimp__form--error').addClass('mailchimp__form--error--active');
    }
};

$('#mailchimp__form').ajaxChimp({
    callback: ajc
});