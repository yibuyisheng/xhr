import Promise from 'promise';
import { base } from 'utilities';


function xhr(opts) {
    return new Promsie(function (resolve, reject, notify, cancel) {
        opts = base.extend({
            method: 'GET'
        }, opts);

        let xhr = new XMLHttpRequest();


        xhr.open(opts.method, opts.url);
        _parseHeaders(opts, xhr);
        xhr.send(opts.data);

        function _xhr1Listeners() {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    return resolve(xhr);
                }

                if (xhr.readyState === 4 && xhr.status !== 200) {
                    return reject(xhr);
                }
            };
        }
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