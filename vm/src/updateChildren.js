import {patchSameNode} from './patch.js'
import createElement from './createElement.js'
export default function updateChildren(parentElm, oldCh,newCh){
    // 旧前 新前
    let oldStartIndex = 0,newStartIndex = 0;
    // 旧后 新后
    let oldEndIndex = oldCh.length-1,newEndIndex = newCh.length-1;
    let oldMap;
    // 当前后指针顺序反过来了就退出循环
    while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex){
        // 进行命中判断之前需要进行undfined判断
        if(oldCh[oldStartIndex]===undefined){
            oldStartIndex++;
        }else if(oldCh[oldEndIndex]===undefined){
            oldEndIndex--;
        }else if(isSameVNode(oldCh[oldStartIndex],newCh[newStartIndex])){
            // 1. 新前和旧前 比较
            patchSameNode(oldCh[oldStartIndex],newCh[newStartIndex])
            oldStartIndex++;
            newStartIndex++;
        }else if(isSameVNode(oldCh[oldEndIndex],newCh[newEndIndex])){
            // 2. 新后与旧后
            patchSameNode(oldCh[oldEndIndex],newCh[newEndIndex])
            oldEndIndex--;
            newEndIndex--;
        }else if(isSameVNode(oldCh[oldStartIndex],newCh[newEndIndex])){
            // 3. 新后与旧前
            patchSameNode(oldCh[oldStartIndex],newCh[newEndIndex])
            // 出现这种情况，不止是需要更新旧节点，还需要移动旧前节点到旧后节点之后
            // nextSibling返回指定节点之后紧跟的节点，在相同的树层级中。
            parentElm.insertBefore(oldCh[oldStartIndex].elm,oldCh[oldEndIndex].elm.nextSibling)
            newEndIndex--;
            oldStartIndex++;
        }else if(isSameVNode(newCh[newStartIndex],oldCh[oldEndIndex])){
            // 4. 新前与旧后
            // 更新节点之后，移动旧后节点到旧前节点之前
            patchSameNode(oldCh[oldEndIndex],newCh[newStartIndex])
            parentElm.insertBefore(oldCh[oldEndIndex].elm,oldCh[oldStartIndex].elm)
            newStartIndex++;
            oldEndIndex--;
        }else{
            // 四种查找都查找不到 那么就遍历查找相同的key
            if(!oldMap){
                oldMap = generateMap(oldCh,oldStartIndex,oldEndIndex);
            }
            // 存在相同的key,移动
            let index = oldMap[newCh[newStartIndex].key]
            if(index>=0){
                let oldElm = oldCh[index];
                if(oldElm===undefined){
                    return;
                }
                patchSameNode(oldElm,newCh[newStartIndex]);
                // 设置旧节点的这一项为undefined 表示可以之后跳过
                oldCh[index] = undefined;
                // 移动到oldStartIndex之前
                parentElm.insertBefore(oldElm.elm,oldCh[oldStartIndex].elm)
            }else{
                // 不存在则表示要新增
                parentElm.insertBefore(createElement(newCh[newStartIndex]),oldCh[oldStartIndex].elm)
            }
            // 注意，只是改变新节点的位置，旧节点不用改变(因为旧前没有变化)
            newStartIndex++;
        }
    }
    // 如果新旧节点数组长度不一致才会执行下面的判断
    // 如果新节点还有没有插入的 那么就插入到 新节点的newStartIndex之前
    if(newStartIndex<=newEndIndex){
        newCh.slice(newStartIndex,newEndIndex+1).map((node)=>{
            // todo 可以根据索引去寻找
            let preNode = parentElm.children[newStartIndex]
            parentElm.insertBefore(createElement(node),preNode||null)
        })
    }else if(oldStartIndex <= oldEndIndex){
        // 如果旧节点中还有没有更新的 那么就要删除
        oldCh.slice(oldStartIndex,oldEndIndex+1).map((node)=>{
            parentElm.removeChild(node.elm)
        })
    }
}
// 判断是否是同一个虚拟节点
export function isSameVNode(oldVNode,newVNode){
    return oldVNode.sel===newVNode.sel && oldVNode.key === newVNode.key
}

export function generateMap(oldVNode,start,end){
    let map = {};
    for(let i=start;i<=end;i++){
        if(oldVNode[i].key !== undefined){
            map[oldVNode[i].key] = i
        }
    }
    return map;
}
