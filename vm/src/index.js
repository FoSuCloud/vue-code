import {h} from './h'
import patch from "./patch.js";

let btn = document.getElementById('btn')
let btn2 = document.getElementById('btn2')

let container = document.getElementById('container')
let vnode1 = h('ul',{},[
    h('li',{key:1},'A'),
    h('li',{key:2},'B'),
    h('li',{key:3},'C'),
    h('li',{key:4},'D'),
]);
let vnode2 = h('ul',{},[
    h('li',{key:33},'Other'),
    h('li',{key:4},'AA'),
    h('li',{key:3},'BB'),
    h('li',{key:2},'CC'),
    h('li',{key:1},'DD')
])
btn.onclick=()=>{
    patch(container,vnode1)
}
btn2.onclick = ()=>{
    patch(vnode1,vnode2)
}

/**
 * {
    children: undefined
    data: {props: {…}}
    elm: undefined
    key: undefined
    sel: "div"
    text: "i am children"
 * }
 * */

// 初始化patch函数
// patch函数用于更新新旧节点， 并且渲染到真实dom上
// const patch = init([
//     classModule, // makes it easy to toggle classes
//     propsModule, // for setting properties on DOM elements
//     styleModule, // handles styling on elements with support for animations
//     eventListenersModule, // attaches event listeners
// ]);

// const container = document.getElementById("container");


// const vnode = h("div#container.two.classes", { on: { click: someFn } }, [
//     h("span", { style: { fontWeight: "bold" } }, "This is bold"),
//     " and this is just normal text",
//     h("a", { props: { href: "/foo" } }, "I'll take you places!"),
// ]);
//
// patch(container, vnode);
