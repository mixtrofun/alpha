jQuery( document ).ready(function() {

    jQuery('.tmm-optin-form').submit(function() {
        var email = jQuery(this).find('input[type=email]').val();
        if ( ! tmmOptinIsEmailValid(email)) return false;
    });

    jQuery('.tmm-optin-select-form').submit(function(event) {
        var form = jQuery(this);
        var email = form.find('input[type=email]').val();
        var selectTag = form.find('select').val();
        var tag = form.find('input[name=tag]').val();

        if ( ! selectTag) {
            alert('Please select a category.');
            return false;
        }

        if ( ! tmmOptinIsEmailValid(email)) return false;

        if (selectTag !== tag) {
            event.preventDefault();
            var aweberFormId = form.find('input[name=meta_web_form_id]');
            var aweberListname = form.find('input[name=listname]');
            var aweberRedirect = form.find('input[name=redirect]');
            var aweberRedirectOnlist = form.find('input[name=meta_redirect_onlist]');
            var inputTag = form.find('input[name=tag]');

            jQuery.ajax({
                url: tmm_optin.ajax_url,
                data: {
                    'action': 'tmm_optin_ajax_request',
                    'tag': selectTag,
                    'security': tmm_optin.ajax_nonce
                },
                success: function (data) {
                    data = JSON.parse(data);
                    aweberFormId.val(data.aweber_form_id);
                    aweberListname.val(data.aweber_list_name);
                    aweberRedirect.val(data.aweber_redirect);
                    aweberRedirectOnlist.val(data.aweber_redirect);
                    inputTag.val(selectTag);
                    form.submit();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert('ERROR: ' + 'Please try again. If this problem persists, please copy this error message and send it to us using the contact link at the bottom of this page. [WP OPTIN: ' + jqXHR.status + ' ' + textStatus + ' ' + errorThrown + ']');
                    return false;
                }
            });
        }
    });

});

function tmmOptinIsEmailValid(email) {
    if ( ! (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        alert('Please enter a valid email address. Example: john@domain.com');
        return false;
    }
    return true;
}