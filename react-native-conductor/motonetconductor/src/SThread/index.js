
const delay = ms => new Promise(res => setTimeout(res, ms));

var HILOS = {};
export default class SThread {

    constructor(time, key, replace) {
        this.key = key;
        if (HILOS[key]) {
            if (replace) {
                HILOS[key].stop();
                this.active = false;
            } else {
                this.active = true;
            }

        } else {
            HILOS[key] = this;
            this.active = false;
        }
        this.time = time;
    }
    stop() {
        this.isRun = false;
        delete HILOS[this.key];
    }

    hilo = async () => {
        await delay(this.time)
        if (!this.isRun) return;
        delete HILOS[this.key];
        this.cb();
    }

    start(cb) {
        this.cb = cb;
        if (this.active) {
            return;
        }
        this.isRun = true;
        this.hilo()
    }

}
