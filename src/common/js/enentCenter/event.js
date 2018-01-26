import {extend} from './utils';

class Event {
    constructor(type, init = {}) {
        if (type instanceof Event) {
            return Event;
        }
        this.type = type;
        this.returnValue = true;
        this.target = null;
        this.data = null;
        extend(this, init);
    }

    preventDefault() {
        return (this.returnValue = false);
    }

    stop() {
        return this.preventDefault();
    }
}

export default Event;
