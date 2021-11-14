import {def, isObject} from './util.js'
import {defineReactive} from './defineReactive.js'
import {arrMethods} from "./array.js";
import Dep from "./Dep.js";
export class Observer{
    constructor(obj) {
        // todo 注意 obj一定是一个对象 否则 数组 否则不会new Observer() 我们也不会对基本数据类型添加__ob__属性！
        // 实例化一个dep对象 其实是把dep属性添加到了this中，也就是对象的__ob__属性中
        this.dep = new Dep();
        // _ob_属性是实例本身
        def(obj,'__ob__',this,false)
        // 让对象的每一个属性都可以被监测到
        if(Array.isArray(obj)){
            // todo 如果是数组 那么在初始化监听的时候就把数组的原型指向我们改写后的对象
            Object.setPrototypeOf(obj,arrMethods)
            this.observeArray(obj)
        }else{
            this.walk(obj)
        }
    }

    walk(obj){
        for(let key in obj){
            defineReactive(obj,key,obj[key])
        }
    }
    // todo 数组的特殊遍历 也就是数组每一项都要遍历！
    observeArray(arr){
        for(let i=0;i<arr.length;i++){
            observe(arr[i])
        }
    }
}
// 创建observe
export function observe(obj){
    if(!isObject(obj)){
        return;
    }
    // 观察者
    let ob;
    if(obj.__ob__ !== undefined){
        ob=obj.__ob__;
    }else{
        ob=new Observer(obj)
    }
    return ob;
}
