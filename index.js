import Promise from 'promise';
import { base } from 'utilities';


function xhr(opts) {

    return new Promsie(function (resolve, reject, notify, cancel) {
        this._opts = base.extend({
            method: 'GET'
        }, opts);

        this._xhr = new XMLHttpRequest();

        this._xhr.addEventListener('progress', function() {
            notify(arguments);
        }, false);
        this._xhr.addEventListener("load", function() {
            resolve(arguments);
        }, false);
        this._xhr.addEventListener("error", function() {
            reject(arguments);
        }, false);
        this._xhr.addEventListener("abort", function() {
            cancel(arguments);
        }, false);

        this._xhr.open(this._opts.method, this._opts.url);
        _parseHeaders(this._opts, this._xhr);
        this._xhr.send(this._opts.data);
    });
}

export default xhr;

function _parseHeaders(opts, xhr) {
    let headerObj = opts.headers;

    if (!base.isObject(headerObj)) {
        return;
    }

    for (let k in headerObj) {
        xhr.setRequestHeader(k, headerObj[k]);
    }
}