"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YXPubSub = void 0;
class YXPubSub {
    _messageId = 0;
    _messageListMap = new Map();
    constructor() { }
    /**
     * 注册消息并返回消息id
     * @param type 类型
     * @param cb 回调
     * @param target this指向
     * @param order 顺序 0 1 2 3...值越小越先执行
     * @returns 消息id
     */
    on(type, cb, target = null, order = 0) {
        const id = `${++this._messageId}`;
        const message = {
            id: id,
            cb: cb,
            target: target,
            order: order
        };
        const messageList = this._messageListMap.get(type);
        if (messageList) {
            messageList.push(message);
            // 排序
            messageList.sort((a, b) => a.order - b.order);
        }
        else {
            this._messageListMap.set(type, [message]);
        }
        return message.id;
    }
    /**
     * 注销消息
     * @param type 类型
     * @param cb 回调
     * @param target this指向
     */
    off(type, cb, target = null) {
        const messageList = this._messageListMap.get(type);
        if (messageList) {
            for (let i = messageList.length - 1; i >= 0; i--) {
                // target不需要严格比较 因为null是对象 两个null比较会返回false
                if (messageList[i].cb === cb && messageList[i].target == target) {
                    messageList.splice(i, 1);
                }
            }
        }
    }
    /**
     * 通过消息id注销消息
     * @param type 类型
     * @param id 消息id
     */
    offById(type, id) {
        const messageList = this._messageListMap.get(type);
        if (messageList) {
            for (let i = messageList.length - 1; i >= 0; i--) {
                if (messageList[i].id === id) {
                    messageList.splice(i, 1);
                }
            }
        }
    }
    /**
     * 注销指定类型的所有消息
     * @param type 类型
     */
    offAll(type) {
        if (this._messageListMap.has(type)) {
            this._messageListMap.delete(type);
        }
    }
    /**
     * 发射消息
     * @param type 类型
     * @param data 数据
     */
    emit(type, ...data) {
        const messageList = this._messageListMap.get(type);
        if (messageList) {
            for (const message of messageList) {
                if (message.target) {
                    message.cb.call(message.target, ...data);
                }
                else {
                    message.cb(...data);
                }
            }
        }
    }
}
exports.YXPubSub = YXPubSub;
