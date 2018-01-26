import {checks} from './utils';
import Event from './event';

class EventCenter {
    constructor() {
        this.__listeners = {};
        this.__handlers = {};
    }

    on(evt, handler) {
        const listeners = this.__listeners;
        // 为事件监听池添加事件类型，没有当前事件则添加，如果有，则重新赋值
        listeners[evt] ? listeners[evt].push(handler) : (listeners[evt] = [handler]);
        return this;
    }

    off(evt, handler) {
        const listeners = this.__listeners;
        const handlers = listeners[evt];

        if (!handlers || !handlers.length) {
            return this;
        }

        for (let i = 0, l = handlers.length; i < l; i += 1) {
            handlers[i] === handler && (handlers[i] = null);
        }

        setTimeout(() => {
            for (let i = 0, l = handlers.length; i < l; i += 1) {
                handlers[i] || handlers.splice(i--, 1);
            }
        }, 0);

        return this;
    }

    trigger(evt, data) {
        if (!(evt instanceof Event)) {
            evt = new Event(evt, {data});
        }
        const handlers = this.__listeners[evt.type];// 获取事件池中的evt类型事件

        if (handlers) { // 如果事件池中存在该类型事件
            for (let i = 0, l = handlers.length; i < l; i += 1) {
                if (handlers[i]) {
                    if (handlers[i].call(this, data, evt) === false) {
                        evt.stop();
                    }
                }
            }
        }

        const func = this['on' + evt.type];
        checks.function(func) && func.call(this, data);
        return evt.returnValue;
    }
}

export default EventCenter;
