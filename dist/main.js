export class YXPubSub {
    _messageId = 0;
    _messagesMap = new Map();
    constructor() { }
    /**
     * 注册消息并返回消息id
     * @param type 类型
     * @param callback 回调
     * @param target this指向
     * @param order 顺序 0 1 2 3...值越小越先执行
     * @param once 是否只执行一次 推荐使用once函数 更易读
     * @returns 消息id
     */
    on(type, callback, target = null, order = 0, once = false) {
        const id = `${++this._messageId}`;
        const message = {
            id: id,
            callback: callback,
            target: target,
            order: order,
            once: once,
        };
        const messages = this._messagesMap.get(type);
        if (messages) {
            messages.push(message);
            // 排序
            messages.sort((a, b) => a.order - b.order);
        }
        else {
            this._messagesMap.set(type, [message]);
        }
        return message.id;
    }
    /**
     * 注册只一次性消息并返回消息id 触发之后自动注销
     * @param type 类型
     * @param callback 回调
     * @param target this指向
     * @param order 顺序 0 1 2 3...值越小越先执行
     * @returns 消息id
     */
    once(type, callback, target = null, order = 0) {
        return this.on(type, callback, target, order, true);
    }
    /**
     * 注销消息
     * @param type 类型
     * @param callback 回调
     * @param target this指向
     */
    off(type, callback, target = null) {
        const messages = this._messagesMap.get(type);
        if (messages) {
            for (let i = messages.length - 1; i >= 0; i--) {
                // target不需要严格比较 因为null是对象 两个null比较会返回false
                if (messages[i].callback === callback && messages[i].target == target) {
                    messages.splice(i, 1);
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
        const messages = this._messagesMap.get(type);
        if (messages) {
            for (let i = messages.length - 1; i >= 0; i--) {
                if (messages[i].id === id) {
                    messages.splice(i, 1);
                }
            }
        }
    }
    /**
     * 注销指定类型的所有消息
     * @param type 类型
     */
    offAll(type) {
        if (this._messagesMap.has(type)) {
            this._messagesMap.delete(type);
        }
    }
    /**
     * 发射消息
     * @param type 类型
     * @param data 数据
     */
    emit(type, ...data) {
        const messages = this._messagesMap.get(type);
        if (messages) {
            const removeMessages = [];
            for (const message of messages) {
                if (message.target) {
                    message.callback.call(message.target, ...data);
                }
                else {
                    message.callback(...data);
                }
                if (message.once) {
                    removeMessages.push(message);
                }
            }
            // 移除once的消息
            if (removeMessages.length > 0) {
                for (const removeMessage of removeMessages) {
                    const index = messages.indexOf(removeMessage);
                    if (index !== -1) {
                        messages.splice(index, 1);
                    }
                }
            }
        }
    }
}
