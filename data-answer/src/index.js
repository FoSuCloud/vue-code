import {observe} from './Observer.js'
import Watcher from "./Watcher.js";

// let obj={name:'iam',age:1,children:{a:'aaaa',b:'bbb',c:{d:111}}}
// let ob = observe(obj)
// console.log(ob)
// obj.name='hahha'
// console.log(obj.name)
// obj.children.a=333
// console.log(obj.children.a)
// obj.children.c.d=3432432432
// console.log(obj.children.c.d)
// obj.children.c.d=1
// console.log(obj.children.c.d)
// // todo 由于在set函数设置了childOb = observe(newVal) ，所以即使新的值是一个对象，对象里面的值也可以被监听到！
// obj.children.c.d={e:444}
// console.log(obj.children.c.d)
// obj.children.c.d.e=5;
// console.log(obj.children.c.d)
// obj.children.c.d=[1,3,5]
// console.log(obj.children.c.d)
// obj.children.c.d.push(7)
// console.log('数组push可以成功添加值，但是无法触发set函数监听！',obj.children.c.d)
// obj.children.c.d=[9]
// console.log('直接改变数组的引用对象，会触发set监听！',obj.children.c.d)
// obj.children.c.d[0]=111;
// console.log('直接改变数组某一个元素，不会触发set监听！',obj.children.c.d)

let obj = {
    arr: [44,5,9,22,777],
    a:1,
    b:{aaa:"1",ch:{d:'1'}}
}
observe(obj)
// obj.arr.splice(0,1,55)
// // obj.arr.push(100)
// obj.a=1000;
// console.log(obj)
// todo 打印可以看到每一层的对象都有一个属性__ob__,__ob__对象都有一个属性dep!

// todo 其实就是相当于vue实例中的watcher
// todo 此刻其实在new Watcher的阶段就已经执行了依赖收集了！
new Watcher(obj,'b.ch.d',(target,newVal,oldVal)=>{
    console.log(target,newVal,oldVal)
})
// todo 修改值的时候调用setter, 从而调用notify去通知dep
obj.b.ch.d = 99;
// todo 此刻获取该值其实也是在执行依赖收集，调用一次getter函数
console.log(obj.b.ch.d)
