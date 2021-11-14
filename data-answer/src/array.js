// 数组方法监听的方式：
// 1.保存Array.prototype到一个变量
import {def} from "./util.js";

const arrPrototype = Array.prototype;
// 2. 以该变量作为原型创建一个实例
// todo 要导出的是实例，因为我们下面监听的方法都是绑定在实例arrMethods上的
export const arrMethods = Object.create(arrPrototype)

const methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methodsToPatch.forEach((method) => {
    // 备份原来的方法
    const origin = arrMethods[method]
    // 改写方法 (监听对应的方法)
    def(arrMethods,method,function (...args){
        // 先调用原来的方法
        let result =origin.call(this,...args)
        // todo 由于push,unshift,splice这三个方法会给数组添加元素，
        // 而数组添加的元素也需要是响应式的，所以我们需要在调用这几个方法后给数组新增的值遍历添加响应式
        let inserted;
        const ob = this.__ob__;
        switch (method){
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                // splice第三个值及之后的值表示插入的元素
                inserted=args.slice(2);
                break;
        }
        // 给新增元素设置响应式监听
        if(inserted!==undefined){
            ob.observeArray(inserted)
        }
        // 通知dep观察者
        ob.dep.notify();
        return result;
    },false)
})
