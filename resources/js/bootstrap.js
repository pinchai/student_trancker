window._ = require('lodash');
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');
window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};
window.axios.baseURL = "http://127.0.0.1:8000";

// bootstrap.js
axios.interceptors.request.use(function (config) {
    let loading = true

    if (config.data != undefined) {
        if (config.data.loading != undefined)
            loading = config.data.loading
    }

    if (loading) {
        // Custom
        var customElement = $("<div>", {
            "css": {
                "border": "4px dashed gold",
                "font-size": "40px",
                "text-align": "center",
                "padding": "10px"
            },
            "class": "your-custom-class",
            "text": "Custom!"
        });
        $.LoadingOverlay("show", {
            image: "/cat.gif",
            imageAnimation: "0ms rotate_right",        // String/Boolean
            imageClass: "img_loading",
            background: "rgba(0,0,0,0.2)",
        });

        // $.LoadingOverlay("show", {
        //   background  : "rgba(0,0,0,0.1)",
        //   image       : "",
        //   fontawesome : "fa fa-spinner fa-spin",
        //   fontawesomeColor: 'rgba(0,0,0,0.3)',
        // });
    }
    return config;

}, function (error) {
    $.LoadingOverlay('hide');
    Swal.fire({
        icon: 'error',
        title: 'Oop...',
        text: `${error}`,
        allowOutsideClick: false,
        allowEscapeKey: false
    });
    return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
    // $.LoadingOverlay('hide');
    return response;
}, function (error) {
    // $.LoadingOverlay('hide');
    const {status} = error.response
    if (status === 422) {
        //general custom error from api
        //let msg = error.response.data.message
        let msg = ''
        let title = ''
        for (const [key, value] of Object.entries(error.response.data.errors)) {
            msg += `<p1 style="color: firebrick">${key}: ${value}</p>`
        }
        let result = msg.replaceAll("validation.", "is ");
        Swal.fire({
            icon: 'warning',
            html: result,
            allowOutsideClick: true,
            allowEscapeKey: true,
            showConfirmButton: false,
            showCloseButton: true,
        })
    } else if (status === 500) {
        //internal server error
        let obj = error.response.data
        let message = null
        let error_msg = '';
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const element = obj[key]
                message = element[0].split('.')
                error_msg = `
                                <div style="font-size: 10px"><strong>Error Type:</strong> ${error.response.data.message}</div>
                                <div style="font-size: 10px"><strong>File:</strong> ${error.response.data.file}</div>
                                <div style="font-size: 10px"><strong>Line:</strong> ${error.response.data.line}</div>
                            `
                break
            }
        }
        Swal.fire({
            icon: 'error',
            title: 'Server Error 🌐',
            html: `${error_msg}`,
            toast: true,
            position: 'top-end',
            allowOutsideClick: true,
            allowEscapeKey: true,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 60000,
        })
    } else {
        let obj = error.response.data
        Swal.fire({
            icon: 'warning',
            title: obj.title,
            html: obj.message == 'CSRF token mismatch.' ? 'User Timeout Please Re-Login' : obj.message,
            allowOutsideClick: true,
            allowEscapeKey: true,
            showConfirmButton: false,
            showCloseButton: true,
        })
    }
});

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
