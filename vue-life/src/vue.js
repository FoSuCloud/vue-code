import {Compile} from './compile.js'
import observe from "./observe";
import Watcher from "./Watcher";
export default class Vue{
    constructor(options) {
        this.$options = options || {};
        this._data = options.data || undefined;
        // todo 和initData的作用重复了？？？
        observe(this._data)
        // 默认数据变为响应式的 - 初始化数据
        this.initData();
        // 调用默认的watcher
        this.initWatch();
        // 模板编译
        new Compile(options.el,this)
    }

    initData(){
        Object.keys(this._data).forEach(key => {
            Object.defineProperty(this,key,{
                get(){
                    return this._data[key]
                },
                set(value){
                    this._data[key] = value
                }
            })
        })
    }
    initWatch(){
        let watch = this.$options.watch
        Object.keys(watch).forEach(key => {
            new Watcher(this,key,watch[key])
        })
    }
}
