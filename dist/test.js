"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
var MsgType;
(function (MsgType) {
    MsgType[MsgType["\u6DFB\u52A0"] = 0] = "\u6DFB\u52A0";
    MsgType[MsgType["\u79FB\u9664"] = 1] = "\u79FB\u9664";
})(MsgType || (MsgType = {}));
const message = new main_1.YXPubSub();
// 如果不传类型参数, 则为无类型模式
// const message = new YXPubSub(); // 无类型模式
const onAddUser = (name, age) => {
    console.log(`添加用户${name}, 年龄${age}`);
};
// 注册消息
message.on(MsgType.添加, onAddUser);
// const msgId = message.on(MsgType.添加, onAddUser);
// 注册消息后返回消息id, 可用于注销消息
// 发射消息
message.emit(MsgType.添加, "张三", 20);
// 输出: 添加用户张三, 年龄20
// 注销消息
message.off(MsgType.添加, onAddUser);
// 注销指定类型的全部消息
// message.offAll(MsgType.添加);
// 通过消息id注销指定类型的消息
// message.offById(MsgType.添加, "消息id");