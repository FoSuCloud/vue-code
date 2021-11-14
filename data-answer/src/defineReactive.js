// 其实defineReactive就形成了一个闭包（也就是执行完一次之后，该函数没有执行垃圾回收，还是对对象的属性进行了监听！）
// todo 那么该闭包造成的内存泄露要怎么解决？
// 如果是定义在vue实例的data属性上的值，那么闭包会在组件销毁的时候被销毁
import {observe} from "./Observer.js";
import Dep from "./Dep.js";

export function defineReactive(obj, key, val=obj[key]){
    // 实例化Dep 在getter进行依赖收集
    const dep = new Dep();
    let childOb = observe(val)
    Object.defineProperty(obj,key,{
        enumerable: true,
        configurable: true,
        get(){
            // 如果现在处于依赖收集阶段
            console.log('收集依赖',obj, key,val)
            // 那么就添加依赖
            if(Dep.target){
                dep.depend();
                // 子元素也要收集依赖
                if(childOb){
                    childOb.dep.depend()
                }
            }
            return val
        },
        set(newVal){
            if(newVal!==val){
                val=newVal;
            }
            console.log('set',newVal)
            // todo 如果设置了新的值 并且新值是对象 那么新值也要被observe
            childOb = observe(newVal)
            // 通知观察者dep
            dep.notify()
        }
    })
}
