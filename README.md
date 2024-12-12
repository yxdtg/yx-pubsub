# yx-pubsub
一个TypeScript发布订阅模式库
a TypeScript publish-subscribe library

## 特性
- 轻量(不到1kb)无依赖 ⚡
- 类型安全 ⛑️
- 消息回调顺序 💌
- 多参数回调 📚
- this指向绑定 📞
- 无类型模式 🚀

## NodeJs安装
### 选择你喜欢的包管理工具进行安装
npm
```bash
npm i yx-pubsub
```
yarn
```bash
yarn add yx-pubsub
```
pnpm
```bash
pnpm add yx-pubsub
```

## 使用
```typescript
import { YXPubSub } from "yx-pubsub";

// 这里使用枚举的好处是重构时更加安全和方便
// 例如在VsCode中 F2 重命名 MessageType.添加 其所有引用都自动更新
// 当然你也可以直接使用字符串的形式
// interface IMessageStringMap {
//     "添加": (name: string, age: number) => void;
//     "移除": (name: string) => void;
// }
enum MessageType {
    "添加",
    "移除",
}

interface IMessageTypeMap {
    [MessageType.添加]: (name: string, age: number) => void;
    [MessageType.移除]: (name: string) => void;
}

const message = new YXPubSub<IMessageTypeMap>();
// 如果不传类型参数 则为无类型模式
// const message = new YXPubSub(); // 无类型模式

const onAddUser = (name: string, age: number): void => {
    console.log(`添加用户${name}, 年龄${age}`);
};
// 注册消息
message.on(MessageType.添加, onAddUser);
// const msgId = message.on(MsgType.添加, onAddUser);
// 注册消息后返回消息id, 可用于注销消息

// 注册一次性消息 (只会触发一次 触发之后自动注销)
message.once(MessageType.添加, onAddUser);

// 发射消息
message.emit(MessageType.添加, "张三", 20);
// 输出: 添加用户张三, 年龄20

// 注销消息
message.off(MessageType.添加, onAddUser);
// 注销指定类型的全部消息
// message.offAll(MsgType.添加);
// 通过消息id注销指定类型的消息
// message.offById(MsgType.添加, "消息id");

```