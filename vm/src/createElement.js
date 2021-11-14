// 创建DOM节点 将vnode创建为dom节点 插入到pivot(支点)节点之前
export default function crateElement(oldVNode){
    let domNode = document.createElement(oldVNode.sel);
    // 1.文本节点
    if(oldVNode.text!=='' && (oldVNode.children === undefined || !oldVNode.children.length)){
        domNode.innerText = oldVNode.text;
        oldVNode.elm = domNode;
    }else if(Array.isArray(oldVNode.children) && oldVNode.children.length){
        // 2.元素数组节点
        oldVNode.children.map((node) => {
            // appendChild只支持传入一个节点，不能传入字符串
            // append支持传入多个节点，支持传入字符串
            domNode.appendChild(crateElement(node))
        })
        oldVNode.elm = domNode;
    }
    return oldVNode.elm
}
