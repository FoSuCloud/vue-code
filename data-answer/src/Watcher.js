import {parsePath} from "./util.js";
import Dep from "./Dep.js";

let uid =0;
export default class Watcher{
    constructor(target,expression,callback) {
        this.id=uid++;
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        // todo 刚创建就执行了依赖收集！
        this.value = this.get();
    }
    update(){
        this.run();
    }
    // todo 进入依赖收集阶段！
    get(){
        Dep.target = this;
        const obj = this.target;
        let value;
        try{
            value = this.getter(obj)
        }finally {
            //todo  依赖收集阶段结束！
            Dep.target = null;
        }
        return value;
    }
    run(){
        this.getAndInvoke(this.callback)
    }
    // 得到并且唤起
    getAndInvoke(cb){
        let value = this.get();
        if(value!==this.value || typeof value==='object'){
            const oldValue = this.value;
            this.value = value;
            // todo 也就是vue实例中的watcher方法
            cb && cb(this.target,value,oldValue)
        }
    }
}
