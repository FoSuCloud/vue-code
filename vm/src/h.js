import vnode from './vnode'
// todo 注意b,c可以存在多种情况
// 但是这是一个简单的版本 所以可以降低函数重载的能力
// 也就是我们让三个参数都是必须填写的！
// 也就是我们只支持 h("div",{},"")
// h("div",{},h())
// h("div",{},[h()，h()])三种
function h(sel,b,c){
    if(sel === undefined || b === undefined || c === undefined){
        throw new Error('params error')
    }
    if(typeof sel ==='string' && Object.prototype.toString.call(b) === '[object Object]'){
        let vn;
        if(typeof c === 'string'){
            vn = vnode(sel,b,undefined,c)
        }else if(Array.isArray(c)){
            // 数组   逐个判断
            for(let i=0;i<c.length;i++){
                if(!(typeof c[i] === 'object' && Object.prototype.hasOwnProperty.call(c[i],'sel'))){
                    throw new Error('params error')
                }
            }
            vn = vnode(sel,b,c)
        }else if(typeof c === 'object' && Object.prototype.hasOwnProperty.call(c,'sel')){
            // h()函数
            vn = vnode(sel,b,c)
        }
        return vn
    }else{
        throw new Error('params error')
    }
}

export {h}
