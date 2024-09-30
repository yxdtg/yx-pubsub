
export interface IMessage {
    id: string;
    cb: any;
    target: any;
    order: number;
}

export class YXPubSub<M extends Record<keyof M, any> = any> {

    private _messageId: number = 0;
    private _messageListMap: Map<any, IMessage[]> = new Map();

    constructor() { }

    /**
     * 注册消息并返回消息id
     * @param type 类型
     * @param cb 回调
     * @param target this指向
     * @param order 顺序 0 1 2 3...值越小越先执行
     * @returns 消息id
     */
    public on<T extends keyof M>(type: T, cb: M[T], target: any = null, order: number = 0): string {
        const id = `${++this._messageId}`;
        const message: IMessage = {
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
        } else {
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
    public off<T extends keyof M>(type: T, cb: M[T], target: any = null): void {
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
    public offById<T extends keyof M>(type: T, id: string): void {
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
    public offAll<T extends keyof M>(type: T): void {
        if (this._messageListMap.has(type)) {
            this._messageListMap.delete(type);
        }
    }

    /**
     * 发射消息
     * @param type 类型
     * @param data 数据
     */
    public emit<T extends keyof M>(type: T, ...data: Parameters<M[T]>): void {
        const messageList = this._messageListMap.get(type);
        if (messageList) {
            for (const message of messageList) {
                if (message.target) {
                    message.cb.call(message.target, ...data);
                } else {
                    message.cb(...data);
                }
            }
        }
    }

}
