var utils = require('utilities');

var base = utils.base;
var eventDealer = utils.eventDealer;


function xhr(options) {
    options = base.extend({
        method: 'GET'
    }, options);

    var xhr = new XMLHttpRequest();
    var event = base.extend({}, eventDealer);
    xhr.onerror = function() {
        event.trigger('error', {
            status: xhr.status,
            response: xhr.response
        });
    };
    xhr.onload = function() {
        event.trigger('load', {
            status: xhr.status,
            response: xhr.response
        });
    };
    xhr.open(options.method, options.url, true);
    _setHeaders(options.headers, xhr);
    xhr.send(options.body);

    return event;
}

function _setHeaders(headers, xhr) {
    if (!headers) return;
    for (var k in headers) {
        xhr.setRequestHeader(k, headers[k]);
    }
}

module.exports = xhr;