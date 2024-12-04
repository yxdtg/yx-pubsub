export interface IYXMessage {
    id: string;
    callback: any;
    target: any;
    order: number;
    once: boolean;
}
export declare class YXPubSub<M extends Record<keyof M, any> = any> {
    private _messageId;
    private _messagesMap;
    constructor();
    /**
     * 注册消息并返回消息id
     * @param type 类型
     * @param callback 回调
     * @param target this指向
     * @param order 顺序 0 1 2 3...值越小越先执行
     * @param once 是否只执行一次 推荐使用once函数 更易读
     * @returns 消息id
     */
    on<T extends keyof M>(type: T, callback: M[T], target?: any, order?: number, once?: boolean): string;
    /**
     * 注册只一次性消息并返回消息id 触发之后自动注销
     * @param type 类型
     * @param callback 回调
     * @param target this指向
     * @param order 顺序 0 1 2 3...值越小越先执行
     * @returns 消息id
     */
    once<T extends keyof M>(type: T, callback: M[T], target?: any, order?: number): string;
    /**
     * 注销消息
     * @param type 类型
     * @param callback 回调
     * @param target this指向
     */
    off<T extends keyof M>(type: T, callback: M[T], target?: any): void;
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
