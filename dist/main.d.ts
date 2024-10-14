export interface IMessage {
    id: string;
    cb: any;
    target: any;
    order: number;
}
export declare class YXPubSub<M extends Record<keyof M, any> = any> {
    private _messageId;
    private _messageListMap;
    constructor();
    /**
     * 注册消息并返回消息id
     * @param type 类型
     * @param cb 回调
     * @param target this指向
     * @param order 顺序 0 1 2 3...值越小越先执行
     * @returns 消息id
     */
    on<T extends keyof M>(type: T, cb: M[T], target?: any, order?: number): string;
    /**
     * 注销消息
     * @param type 类型
     * @param cb 回调
     * @param target this指向
     */
    off<T extends keyof M>(type: T, cb: M[T], target?: any): void;
    /**
     * 通过消息id注销消息
     * @param type 类型
     * @param id 消息id
     */
    offById<T extends keyof M>(type: T, id: string): void;
    /**
     * 注销指定类型的所有消息
     * @param type 类型
     */
    offAll<T extends keyof M>(type: T): void;
    /**
     * 发射消息
     * @param type 类型
     * @param data 数据
     */
    emit<T extends keyof M>(type: T, ...data: Parameters<M[T]>): void;
}
