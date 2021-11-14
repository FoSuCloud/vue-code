import vnode from './vnode.js'
import createElement from "./createElement.js";
import updateChildren from './updateChildren.js'
export default function patch(oldVNode,newVNode){
    // 判断老节点是否是虚拟节点
    if(oldVNode.sel === '' || oldVNode.sel === undefined){
        if(!(oldVNode instanceof HTMLElement)){
            throw TypeError("类型错误")
        }
        // DOM节点转为虚拟节点
        if(oldVNode.nodeType === 3){
            // 1.如果是文本节点
            oldVNode = vnode(oldVNode.tagName, {}, [], oldVNode.getTextContent(), oldVNode)
        }else if(oldVNode.nodeType === 8){
            // 2.注释节点
            oldVNode = vnode(oldVNode.tagName, undefined, undefined, oldVNode.getTextContent(), oldVNode)
        }else if(oldVNode.nodeType === 1){
            // 3.元素节点
            oldVNode = vnode(oldVNode.tagName, {}, Array.from(oldVNode.childNodes), undefined, oldVNode)
        }
    }
    // 判断是否是同一个节点
    if(oldVNode.key===newVNode.key && oldVNode.sel === newVNode.sel){
        // 更新
        patchSameNode(oldVNode,newVNode)
    }else{
        // 不是同一个节点 那么先插入新节点，再删除旧节点
        if(oldVNode.elm){
            let domNode = createElement(newVNode)
            if(!oldVNode.elm.parentNode){
                oldVNode.elm.parentNode = document.body;
            }
            oldVNode.elm.parentNode.insertBefore(domNode,oldVNode.elm)
        }
        // 删除老节点
        oldVNode.elm.parentNode.removeChild(oldVNode.elm)
    }
}
// patch 同一个节点（新旧节点）
export function patchSameNode(oldVNode,newVNode){
    // 判断是否是同一个对象
    if(oldVNode === newVNode){
        return;
    }
    // 判断是否新节点是文本节点
    if(newVNode.text!=='' && newVNode.text!==undefined){
        oldVNode.text = newVNode.text;
        oldVNode.elm.innerText = newVNode.text;
        oldVNode.children = [];
    }else if(newVNode.children && newVNode.children.length){
        // 新节点具有子元素数组

        // 旧节点是文本节点
        if(oldVNode.text){
            newVNode.children.map((node) => {
                if(!oldVNode.elm.parentNode){
                    oldVNode.elm.parentNode = document.body;
                }
                oldVNode.elm.parentNode.appendChild(createElement(node))
            })
            // 删除老节点
            oldVNode.elm.parentNode.removeChild(oldVNode.elm)
        }else if(oldVNode.children && oldVNode.children.length){
            // 新旧节点都有children
            updateChildren(oldVNode.elm,oldVNode.children,newVNode.children)
        }
    }
}
