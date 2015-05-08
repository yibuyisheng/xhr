import { base, eventDealer } from 'utilities';


function xhr(options) {
    options = base.extend({
        method: 'GET'
    }, options);

    var xhr = new XMLHttpRequest();
    var event = base.extend({}, eventDealer);
    xhr.onerror = () => {
        event.trigger('error', {
            status: xhr.status,
            response: xhr.response
        });
    };
    xhr.onload = () => {
        event.trigger('load', {
            status: xhr.status,
            response: xhr.response
        });
    };
    xhr.open(options.method, options.url, false);
    xhr.send(options.body);

    return event;
}

export default xhr;