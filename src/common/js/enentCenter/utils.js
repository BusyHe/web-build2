const checks = {
    object(src) {
        const type = typeof src;
        // eslint-disable-next-line no-mixed-operators
        return type === 'function' || type === 'object' && !!src;
    },
    string: s => typeof s === 'string',
    arrowFunction: src => checks.function(src) ? /^(?:function)?\s*\(?[\w\s,]*\)?\s*=>/.test(src.toString()) : false,
    boolean: s => typeof s === 'boolean',
    node: s => (typeof Node === 'object' ? s instanceof Node : s && typeof s === 'object' && typeof s.nodeType === 'number' && typeof s.nodeName === 'string'),
    promise: p => p && checks.function(p.then),
    function: f => {
        const type = ({}).toString.call(f).toLowerCase();
        return (type === '[object function]') || (type === '[object asyncfunction]');
    },
    array: arr => {
        return checks.function(Array.isArray) ? Array.isArray(arr) : (({}).toString.call(arr).toLowerCase() === '[object array]');
    }
}

const checkList = 'arguments,asyncfunction,number,date,regexp,error'.split(',');

checkList.forEach((item) => {
    checks[item] = obj => ({}).toString.call(obj).toLowerCase() === '[object ' + item + ']';
});

const encodeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#x27;',
    '`': '&#x60;'
};

function encodeHTML(s) {
    return String(s).replace(/[&<>"'`]/g, function (m) {
        return encodeMap[m]
    });
}

function escapeRegExp(s) {
    return String(s).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function escapeCSS(s) {
    return String(s).replace(/([!"#$%&'()*+,-./:;<=>?@[\]^`{|},~])/g, '\\$1');
}

function getDocumentHead() {
    return document.head || document.getElementsByTagName('head')[0];
}

function buildParams(prefix, obj, add) {
    if (checks.array(obj)) {
        for (let i = 0, l = obj.length; i < l; i = i + 1) {
            const v = obj[i];
            if (/\[\]$/.test(prefix)) {
                add(prefix, v);
            } else {
                buildParams(prefix + '[' + (typeof v === 'object' && v !== null ? i : '') + ']', v, add);
            }
        }
    } else if (typeof obj === 'object') {
        for (let name in obj) {
            buildParams(prefix + '[' + name + ']', obj[name], add);
        }
    } else {
        add(prefix, obj);
    }
}

function param(obj) {
    const s = [];
    const add = (key, value) => {
        value = checks.function(value) ? value() : value;
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value === null ? '' : value);
    };
    for (let attr in obj) {
        buildParams(attr, obj[attr], add);
    }
    return s.join('&');
}

function sequence(steps) {
    const results = [];
    let promise = Promise.resolve();

    const then = i => {
        promise = promise.then(() => {
            return steps[i](results[results.length - 1], results).then(value => {
                results[i] = value;
            });
        });
    };

    steps.forEach((step, i) => {
        then(i);
    });

    return promise.then(() => results);
}

function extend(dest, ...sources) {
    const obj = sources[0];
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            dest[property] = obj[property];
        }
    }
    if (sources.length > 1) {
        return extend(dest, ...sources.splice(1, sources.length - 1));
    }
    return dest;
}

/**
 * for search a specified element from an array.
 * the difference between this method and the native Array.prototype.indexOf is that
 * this function is not using the strict equal for comparing the element which you wanna search,
 * so in this function 1 and "1" are equal
 */
function indexOf(array, searchElement, fromIndex) {
    for (let i = fromIndex || 0, l = array.length; i < l; i += 1) {
        if (array[i] === searchElement) {
            return i;
        }
    }
    return -1;
}

function has(des, searchElement) {
    if (checks.string(des)) {
        return des.indexOf(searchElement) > -1;
    }

    return indexOf(des, searchElement) > -1;
}

function addEventListener(element, type, handler, useCapture = false) {
    if (checks.node(element)) {
        element.addEventListener(type, handler, useCapture);
    } else if (checks.object(element)) {
        for (let i = 0, l = element.length; i < l; i += 1) {
            addEventListener(element[i], type, handler, useCapture);
        }
    } else {
        const elements = document.querySelectorAll(element);

        for (let i = 0, l = elements.length; i < l; i += 1) {
            addEventListener(elements[i], type, handler, useCapture);
        }
    }
}

function removeEventListener(element, type, handler) {
    if (checks.node(element)) {
        element.removeEventListener(type, handler);
    } else if (checks.object(element)) {
        for (let i = 0, l = element.length; i < l; i += 1) {
            removeEventListener(element[i], type, handler);
        }
    } else {
        const elements = document.querySelectorAll(element);

        for (let i = 0, l = elements.length; i < l; i += 1) {
            removeEventListener(elements[i], type, handler);
        }
    }
}

function unique(arr) {
    const result = [];

    for (let i = 0, l = arr.length; i < l; i += 1) {
        const item = arr[i];
        if (indexOf(result, item) < 0) {
            result.push(item);
        }
    }

    return result;
}

function addClass(element, className) {
    checks.array(className) && (className = className.join(' '));
    if (length in element) {
        for (let i = 0, l = element.length; i < l; i += 1) {
            addClass(element[i], className);
        }
        return element;
    }

    const result = element.className + ' ' + className;
    const arr = result.split(/\s+/);
    element.className = unique(arr).join(' ');
    return element;
}

function removeClass(element, className) {
    if (length in element) {
        for (let i = 0, l = element.length; i < l; i += 1) {
            removeClass(element[i], className);
        }
        return element;
    }

    checks.array(className) || (className = className.split(/\s+/));
    const exists = element.className.split(/\s+/);

    for (let i = 0, l = exists.length; i < l; i += 1) {
        if (indexOf(className, exists[i]) > -1) {
            exists.splice(i--, 1);
        }
    }

    element.className = exists.join(' ');

    return element;
}

function camelCase(str, ds = '_', capitalFirstLetter = false) {
    const reg = new RegExp(escapeRegExp(ds) + '(\\w)', 'g');
    str = str.replace(reg, (m, n) => n.toUpperCase());
    return capitalFirstLetter ? str.replace(/^\w/, m => m.toUpperCase()) : str;
}

function random(min, max, integer = true) {
    const n = Math.random() * (max - min) + min;
    return integer ? Math.floor(n) : n;
}

/**
 * @function repaint - force ie8 to repaint an element after changing it.
 */
function repaint(elem) {
    const parentNode = elem.parentNode;

    const classname = 'temporary-classname-for-repainting-element-for-ie8';

    addClass(parentNode, classname);
    removeClass(parentNode, classname);
}

function checkMobile() {
    var sUserAgent = window.navigator.userAgent.toLowerCase();
    var bIsIpad = new RegExp('ipad').test(sUserAgent);
    var bIsIphoneOs = new RegExp('iphone os').test(sUserAgent);
    var bIsMidp = new RegExp('midp').test(sUserAgent);
    var bIsUc7 = new RegExp('rv:1.2.3.4').test(sUserAgent);
    var bIsUc = new RegExp('ucweb').test(sUserAgent);
    var bIsAndroid = new RegExp('android').test(sUserAgent);
    var bIsCE = new RegExp('windows ce').test(sUserAgent);
    var bIsWM = new RegExp('mobile').test(sUserAgent);
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return true;
    } else {
        return false
    }
}

function $(selector, container) {
    if (container) {
        return container.querySelector(selector);
    }

    return document.querySelector(selector);
}

function $$(selector, container) {
    if (container) {
        return container.querySelectorAll(selector);
    }

    return document.querySelectorAll(selector);
}

function delegate(elem, selector, eventType, handler) {
    const useCapture = {
        focus: true,
        blur: true,
        load: true
    };

    elem = checks.string(elem) ? $(elem)[0] : elem;

    addEventListener(elem, eventType, function (e) {
        let node = e.target;
        while (node) {
            if (matchesSelector(node, selector, elem)) {
                e.boundTarget = node;
                handler.call(this, e);
                break;
            }
            node = node.parentNode;
            if (!node || node === elem) break;
        }
    }, useCapture[eventType]);
}

function matchesSelector(elem, selector, container) {
    let matches = false;

    if (checks.function(elem.matches)) {
        matches = elem.matches(selector);
    } else if (checks.function(elem.msMatchesSelector)) {
        matches = elem.msMatchesSelector(selector);
    }
    if (checks.function(elem.webkitMatchesSelector)) {
        matches = elem.webkitMatchesSelector(selector);
    }

    if (container) {
        return matches && !!(container.compareDocumentPosition(elem) & 16);
    }
    return matches;
}

function simpleClone(src) {
    return JSON.parse(JSON.stringify(src));
}

export {
    checks,
    encodeHTML, escapeRegExp, escapeCSS,
    getDocumentHead,
    extend, param, indexOf,
    sequence, has, simpleClone,
    addEventListener, removeEventListener,
    addClass, removeClass, camelCase,
    random, repaint, checkMobile,
    $, $$, delegate
};
