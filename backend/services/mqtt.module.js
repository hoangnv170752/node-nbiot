const mqtt = require('mqtt');

class Node {
    constructor(){
        this.next = null;
        this.messageId = null;
        this.callback = null;
    }
}

class MessageQueue {
    constructor(){
        this.start = null;
        this.end = null;
    }
    append(idMessage, cb) {
        const newNode = new Node();
        newNode.messageId = idMessage;
        newNode.callback = cb;
        newNode.next = null;
        if (this.start === null && this.end === null) {
            this.start = newNode;
            this.end = newNode;
        } else {
            this.end.next = newNode;
            this.end = newNode;
        }
    }
    remove(id) {
        let cur = this.start;
        let pre = null;
        while (cur !== null && cur.messageId !== id) {
            pre = cur;
            cur = cur.next;
        }
        if (cur !== null) {
            cur.callback();
            if (pre === null) {
                this.start = this.start.next;
                if (this.start === null) this.end = null;
            } else {
                pre.next = cur.next;
                if (cur.next === null) {
                    this.end = pre;
                }
            }
        }
    }
}
class Connect {
    constructor() {
        this.client = null;
        this.options = null;
        this.messageQueue = new MessageQueue();
        this.eventEmitter = new events.EventEmitter();
        this.TIME_OUT = 10 * 1000;
    }

    async connect(options) {
        if (this.client == null) {
            this.client = mqtt.connect(options.url);
            this.options = options;
        }
        return this.client;
    }

    sendMessage(topic, data) {
        this.client.publish(`${topic.toLowerCase()}host`, JSON.stringify(data));
    }

    sendMessageSync(topic, data, id, _timeout) {
        let timeout = _timeout;
        if (!timeout) timeout = this.TIME_OUT;
        return new Promise((res, rej) => {
            this.sendMessage(topic, data);
            this.eventEmitter.once(id, () => {
                return res();
            });
            setTimeout(() => {
                return rej();
            }, timeout);
        });
    }

    sendMessageAndAddMessageQueue(topic, data, id, cb) {
        this.sendMessage(topic, data);
        this.messageQueue.append(id, cb);
    }

    receiveMessage(id) {
        this.messageQueue.remove(id);
        this.eventEmitter.emit(id);
    }

    registerTopic(_topic) {
        return new Promise((res, rej) => {
            this.client.subscribe(_topic, function (err) {
                if (!err) {
                    return res(_topic);
                }
                return rej(err);
            });
        });
    }

    unregisterTopic(_topic) {
        return new Promise((res, rej) => {
            this.client.unsubscribe(_topic, function (err) {
                if (!err) {
                    return res(_topic);
                }
                return rej(err);
            });
        });
    }
}
const instance = new Connect();

module.exports = {
    connect: (options) => {
        instance.connect(options);
        return instance.client;
    },
    instance,
};